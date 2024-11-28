import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import useSWR from 'swr';
import { Incident } from '../types/incident';
import { parseIncidentData } from '../utils/parser';
import { geocodeAddress } from '../utils/geocoding';
import { shouldPinIncident, getPinDuration } from '../utils/pinned';

const REFRESH_INTERVAL = 30000; // 30 seconds
const MAX_RETRIES = 3;
const PINNED_INCIDENTS_KEY = 'pinnedIncidents';
const UPDATE_THROTTLE = 1000; // 1 second minimum between pin updates

const TARGET_URL = 'https://mazzanet.net.au/cfa/pager-cfa-all.php';
const CORS_PROXIES = [
  'https://corsproxy.io/?',
  'https://cors-proxy.htmldriven.com/?url=',
  'https://cors.eu.org/',
];

interface PinnedIncident {
  id: string;
  pinnedAt: number;
  duration: number;
}

function loadPinnedIncidents(): { pins: PinnedIncident[]; data: Record<string, Incident> } {
  try {
    const savedPins = localStorage.getItem(PINNED_INCIDENTS_KEY);
    const savedData = localStorage.getItem('pinnedIncidentsData');
    return {
      pins: savedPins ? JSON.parse(savedPins) : [],
      data: savedData ? JSON.parse(savedData) : {}
    };
  } catch {
    return { pins: [], data: {} };
  }
}

function savePinnedIncidents(pins: PinnedIncident[], data: Record<string, Incident>) {
  try {
    localStorage.setItem(PINNED_INCIDENTS_KEY, JSON.stringify(pins));
    localStorage.setItem('pinnedIncidentsData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving pinned incidents:', error);
  }
}

async function fetchWithRetry(url: string, retries = 0): Promise<string> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    if (!text || text.length < 10) {
      throw new Error('Invalid response received');
    }
    
    return text;
  } catch (error) {
    if (retries < MAX_RETRIES - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (retries + 1)));
      return fetchWithRetry(url, retries + 1);
    }
    throw error;
  }
}

async function fetchWithProxy(proxyIndex = 0): Promise<string> {
  if (proxyIndex >= CORS_PROXIES.length) {
    throw new Error('All CORS proxies failed');
  }

  try {
    const proxyUrl = `${CORS_PROXIES[proxyIndex]}${encodeURIComponent(TARGET_URL)}`;
    return await fetchWithRetry(proxyUrl);
  } catch (error) {
    return fetchWithProxy(proxyIndex + 1);
  }
}

const processIncidents = async (rawText: string): Promise<Incident[]> => {
  const incidents = parseIncidentData(rawText);
  
  return incidents.map(incident => {
    const coordinates = geocodeAddress(incident.location);
    return {
      ...incident,
      coordinates: coordinates || [0, 0]
    };
  });
};

const fetcher = async (): Promise<Incident[]> => {
  try {
    const text = await fetchWithProxy();
    
    const content = text.includes('<pre>') 
      ? text.match(/<pre>([\s\S]*?)<\/pre>/)?.[1]?.trim() 
      : text.includes('<body>') 
        ? text.match(/<body>([\s\S]*?)<\/body>/)?.[1]?.trim()
        : text.trim();
      
    if (!content) {
      throw new Error('No valid content found in response');
    }

    return processIncidents(content);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    throw error;
  }
};

export function useIncidents() {
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(REFRESH_INTERVAL);
  const [pinnedIncidents, setPinnedIncidents] = useState<PinnedIncident[]>(() => {
    const { pins } = loadPinnedIncidents();
    return pins;
  });
  const [pinnedData, setPinnedData] = useState<Record<string, Incident>>(() => {
    const { data } = loadPinnedIncidents();
    return data;
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const timerRef = useRef<NodeJS.Timeout>();
  const retryCountRef = useRef(0);
  const previousIncidentsRef = useRef<Incident[]>([]);
  const lastPinUpdateRef = useRef<number>(Date.now());

  const { data: rawIncidents, error, isLoading: isSWRLoading, mutate } = useSWR('incidents', fetcher, {
    refreshInterval: REFRESH_INTERVAL,
    revalidateOnFocus: true,
    dedupingInterval: 5000,
    fallbackData: [],
    onSuccess: (newData) => {
      retryCountRef.current = 0;
      setIsInitialLoad(false);
      
      if (previousIncidentsRef.current.length > 0) {
        const latestPreviousTimestamp = Math.max(
          ...previousIncidentsRef.current.map(inc => new Date(inc.timestamp).getTime())
        );
        
        const newIncidents = newData.filter(incident => 
          new Date(incident.timestamp).getTime() > latestPreviousTimestamp
        );
        
        if (newIncidents.length > 0) {
          window.dispatchEvent(new CustomEvent('newIncident'));
        }
      }
      
      previousIncidentsRef.current = newData;
    },
    shouldRetryOnError: true,
    errorRetryCount: MAX_RETRIES,
    errorRetryInterval: 1000,
    loadingTimeout: 10000,
    refreshWhenHidden: true,
    refreshWhenOffline: false
  });

  useEffect(() => {
    const cleanupPins = () => {
      const now = Date.now();
      if (now - lastPinUpdateRef.current < UPDATE_THROTTLE) return;

      const updatedPins = pinnedIncidents.filter(pin => {
        const isExpired = now >= pin.pinnedAt + pin.duration;
        if (isExpired) {
          const { [pin.id]: _, ...remainingData } = pinnedData;
          setPinnedData(remainingData);
        }
        return !isExpired;
      });

      if (updatedPins.length !== pinnedIncidents.length) {
        lastPinUpdateRef.current = now;
        setPinnedIncidents(updatedPins);
        savePinnedIncidents(updatedPins, pinnedData);
      }
    };

    const interval = setInterval(cleanupPins, 1000);
    return () => clearInterval(interval);
  }, [pinnedIncidents, pinnedData]);

  const processedIncidents = useMemo(() => {
    if (!rawIncidents) return [];

    const now = Date.now();
    const validPins = pinnedIncidents.filter(pin => now < pin.pinnedAt + pin.duration);
    const pinnedIds = new Set(validPins.map(pin => pin.id));
    const pinnedRefs = new Set(validPins.map(pin => pinnedData[pin.id]?.reference).filter(Boolean));

    rawIncidents.forEach(incident => {
      if (!pinnedIds.has(incident.id) && 
          !pinnedRefs.has(incident.reference) && 
          shouldPinIncident(incident)) {
        const duration = getPinDuration(incident);
        
        if (duration && now - lastPinUpdateRef.current >= UPDATE_THROTTLE) {
          lastPinUpdateRef.current = now;
          setPinnedIncidents(prev => {
            const updated = [...prev, {
              id: incident.id,
              pinnedAt: now,
              duration
            }];
            savePinnedIncidents(updated, { ...pinnedData, [incident.id]: incident });
            return updated;
          });
          setPinnedData(prev => ({ ...prev, [incident.id]: incident }));
          pinnedIds.add(incident.id);
          if (incident.reference) {
            pinnedRefs.add(incident.reference);
          }
        }
      }
    });

    const pinnedList = validPins
      .map(pin => {
        const liveIncident = rawIncidents.find(inc => inc.id === pin.id);
        return liveIncident || pinnedData[pin.id];
      })
      .filter((incident): incident is Incident => Boolean(incident));

    const uniquePinnedList = pinnedList.reduce((acc: Incident[], incident) => {
      if (!incident.reference || !acc.some(inc => inc.reference === incident.reference)) {
        acc.push(incident);
      }
      return acc;
    }, []);

    const unpinnedList = rawIncidents.filter(incident => 
      !pinnedIds.has(incident.id) && 
      (!incident.reference || !pinnedRefs.has(incident.reference))
    );

    const sortByTimestamp = (a: Incident, b: Incident) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();

    const sortedPinnedList = uniquePinnedList.sort(sortByTimestamp);
    const sortedUnpinnedList = unpinnedList.sort(sortByTimestamp);

    return [...sortedPinnedList, ...sortedUnpinnedList];
  }, [rawIncidents, pinnedIncidents, pinnedData]);

  const refresh = useCallback(() => {
    retryCountRef.current = 0;
    setTimeUntilRefresh(REFRESH_INTERVAL);
    return mutate();
  }, [mutate]);

  useEffect(() => {
    const updateTimer = () => {
      setTimeUntilRefresh(prev => {
        if (prev <= 1000) {
          refresh();
          return REFRESH_INTERVAL;
        }
        return prev - 1000;
      });
    };

    timerRef.current = setInterval(updateTimer, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [refresh]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const currentValidPins = useMemo(() => {
    const now = Date.now();
    const validPins = pinnedIncidents.filter(pin => now < pin.pinnedAt + pin.duration);
    const seenRefs = new Set<string>();

    return validPins.filter(pin => {
      const incident = pinnedData[pin.id];
      if (!incident?.reference) return true;
      if (seenRefs.has(incident.reference)) return false;
      seenRefs.add(incident.reference);
      return true;
    });
  }, [pinnedIncidents, pinnedData]);

  return {
    incidents: processedIncidents,
    isLoading: (isSWRLoading && isInitialLoad) || !processedIncidents?.length,
    isError: Boolean(error) || retryCountRef.current >= MAX_RETRIES,
    timeUntilRefresh,
    refresh,
    pinnedIncidents: currentValidPins
  };
}