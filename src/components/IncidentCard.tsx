import { memo } from 'react';
import { Clock, Share2, MapPin, Building2, AlertCircle, Heart, MapPinned, AlertTriangle } from 'lucide-react';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { Incident } from '../types/incident';
import { Modal } from './Modal';
import { StationBadge } from './StationBadge';
import { StationMovement } from './StationMovement';
import { PinnedBadge } from './PinnedBadge';
import { useModalState } from '../hooks/useModalState';

interface IncidentCardProps {
  incident: Incident;
  pinnedInfo?: { pinnedAt: number; duration: number };
  onClick?: (() => void) | undefined;
}

// Utility function to mask sensitive information
const maskSensitiveInfo = (text: string) => {
  // Mask PEG numbers and any following characters
  let maskedText = text.replace(/PEG[:.]?\s*[A-Z0-9]+/gi, 'PEG ********');
  
  // Mask Australian mobile numbers (04XXXXXXXX format)
  maskedText = maskedText.replace(/\b04\d{8}\b/g, '04********');
  
  return maskedText;
};

export const IncidentCard = memo(function IncidentCard({ 
  incident, 
  pinnedInfo,
  onClick
}: IncidentCardProps) {
  const { isOpen, open, close, modalRef } = useModalState(incident.reference);

  const severityColors = {
    light: {
      low: 'bg-emerald-50 text-emerald-700',
      medium: 'bg-yellow-50 text-yellow-700',
      high: 'bg-orange-50 text-orange-700',
      extreme: 'bg-red-50 text-red-700',
      critical: 'bg-purple-50 text-purple-700',
      pending: 'bg-gray-50 text-gray-700'
    },
    dark: {
      low: 'dark:bg-emerald-900/30 dark:text-emerald-400',
      medium: 'dark:bg-yellow-900/30 dark:text-yellow-400',
      high: 'dark:bg-orange-900/30 dark:text-orange-400',
      extreme: 'dark:bg-red-900/30 dark:text-red-400',
      critical: 'dark:bg-purple-900/30 dark:text-purple-400',
      pending: 'dark:bg-gray-900/30 dark:text-gray-400'
    }
  };

  const isCode1 = incident.alertCode.endsWith('1');
  const isFAFSCC = incident.stations.includes('FAFSCC');
  const isPending = incident.severity === 'pending' || (isFAFSCC && incident.severity === 'low' && !isCode1);
  const isStationMovement = incident.description.toLowerCase().includes('move to station');
  const isMedical = incident.tags?.includes('medical');
  const hasAdditionalStations = incident.additionalStations.length > 0;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Fire Incident: ${maskSensitiveInfo(incident.title)}`,
        text: `${incident.alertType} - ${maskSensitiveInfo(incident.location.address)}\n${maskSensitiveInfo(incident.description)}`,
        url: window.location.href
      }).catch(console.error);
    }
  };

  const formattedTime = format(new Date(incident.timestamp), 'HH:mm:ss');
  const timeAgo = formatDistanceToNowStrict(new Date(incident.timestamp), { 
    addSuffix: true,
    roundingMethod: 'floor'
  });

  // Clean up description by removing location information and masking sensitive info
  const cleanDescription = maskSensitiveInfo(
    incident.description
      .replace(new RegExp(`^${incident.location.address}\\s*`, 'i'), '')
      .replace(/^\d+\s+/, '') // Remove leading numbers
      .trim()
  );

  // Mask sensitive info in location
  const maskedAddress = maskSensitiveInfo(incident.location.address);
  const maskedCrossStreet = incident.location.crossStreet ? maskSensitiveInfo(incident.location.crossStreet) : undefined;

  if (isStationMovement) {
    const movement = parseStationMovement(incident.rawText || '');
    if (movement) {
      return (
        <StationMovement 
          fromStation={movement.fromStation}
          toStation={movement.toStation}
          timestamp={incident.timestamp}
        />
      );
    }
  }

  return (
    <>
      <div className={`flex flex-col sm:flex-row items-start gap-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 ${
        pinnedInfo ? 'ring-2 ring-purple-200 dark:ring-purple-800' : ''
      }`}
      onClick={onClick}>
        {/* Left side - Priority indicator */}
        <div className="flex flex-row sm:flex-col items-center gap-2 w-full sm:w-auto">
          <div className="relative">
            <div className={`w-1.5 h-10 sm:h-14 rounded-full ${
              isPending ? 'bg-gray-200 dark:bg-gray-600' :
              isCode1 ? 'bg-gradient-to-b from-red-400 to-red-600 dark:from-red-500 dark:to-red-700' : 
              'bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700'
            }`}>
              <div className={`absolute -left-[2px] -right-[2px] top-0 h-full rounded-full opacity-20 animate-pulse ${
                isPending ? 'bg-gray-400 dark:bg-gray-500' :
                isCode1 ? 'bg-red-400 dark:bg-red-500' : 
                'bg-blue-400 dark:bg-blue-500'
              }`} />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
              isPending ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' :
              isCode1 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
              'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
              {isPending ? 'PENDING' : isCode1 ? 'CODE 1' : 'CODE 3'}
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 hidden sm:block">
              {isCode1 ? 'Urgent' : 'Non-urgent'}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 w-full">
          {/* Top row - Status, time, and district */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${severityColors.light[incident.severity]} ${severityColors.dark[incident.severity]}`}>
              {incident.severity.toUpperCase()}
            </span>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock size={12} className="mr-1 flex-shrink-0" />
              <span className="whitespace-nowrap">{formattedTime}</span>
              <span className="mx-1">·</span>
              <span className="whitespace-nowrap">{timeAgo}</span>
            </div>
            {incident.district && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                <MapPinned size={12} className="text-indigo-500 dark:text-indigo-400" />
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                  District {incident.district}
                </span>
              </div>
            )}
            {incident.hasUpdate && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 rounded-full">
                <AlertTriangle size={12} className="text-amber-500 dark:text-amber-400" />
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400 whitespace-nowrap">
                  Alert Updated
                </span>
              </div>
            )}
            {hasAdditionalStations && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 rounded-full">
                <AlertCircle size={12} className="text-amber-500 dark:text-amber-400" />
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400 whitespace-nowrap">
                  Additional Appliances
                </span>
              </div>
            )}
            {isMedical && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-50 dark:bg-rose-900/30 rounded-full">
                <Heart size={12} className="text-rose-500 dark:text-rose-400" />
                <span className="text-xs font-medium text-rose-600 dark:text-rose-400 whitespace-nowrap">
                  Medical
                </span>
              </div>
            )}
            {pinnedInfo && (
              <PinnedBadge 
                pinnedAt={pinnedInfo.pinnedAt} 
                duration={pinnedInfo.duration}
              />
            )}
          </div>

          {/* Description */}
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 break-words">
            {cleanDescription || incident.alertType}
          </h3>

          {/* Location */}
          <div className="flex items-start gap-1.5 mb-1">
            <MapPin size={14} className="text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-300 break-words">
                {maskedAddress}
              </p>
              {maskedCrossStreet && (
                <p className="text-xs text-gray-500 dark:text-gray-400 break-words">
                  Cross streets: {maskedCrossStreet}
                </p>
              )}
            </div>
          </div>

          {/* Stations */}
          <div className="flex items-start gap-1.5">
            <Building2 size={14} className="text-gray-400 dark:text-gray-500 flex-shrink-0 mt-1" />
            <div className="flex flex-wrap gap-1 flex-1">
              {incident.stations.map((station) => (
                <StationBadge 
                  key={station} 
                  station={station} 
                  isAdditional={incident.additionalStations.includes(station)}
                />
              ))}
            </div>
            {incident.reference && (
              <button
                onClick={open}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 ml-2 underline whitespace-nowrap"
              >
                {incident.reference}
              </button>
            )}
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex flex-row sm:flex-col items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto justify-end">
          <button
            onClick={handleShare}
            className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
            aria-label="Share incident"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={close}
        title={`Incident ${incident.reference}`}
        modalRef={modalRef}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${severityColors.light[incident.severity]} ${severityColors.dark[incident.severity]}`}>
              {incident.severity.toUpperCase()}
            </span>
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${
              isCode1 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
              'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
              {isCode1 ? 'CODE 1' : 'CODE 3'}
            </span>
            {isMedical && (
              <span className="px-2 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                Medical
              </span>
            )}
            {incident.district && (
              <span className="px-2 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                District {incident.district}
              </span>
            )}
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {incident.alertType}
            </p>
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              {incident.rawText ? maskSensitiveInfo(incident.rawText) : ''}
            </pre>
          </div>

          {incident.updates && incident.updates.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Alert Updates
              </h4>
              <div className="space-y-3">
                {incident.updates.map((update, index) => (
                  <div 
                    key={index}
                    className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 text-sm"
                  >
                    <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 mb-2">
                      <Clock size={12} />
                      <span>
                        {format(new Date(update.timestamp), 'HH:mm:ss')}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {update.description}
                    </p>
                    <div className="flex items-start gap-1.5">
                      <MapPin size={14} className="text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-600 dark:text-gray-300 break-words">
                          {update.location.address}
                        </p>
                        {update.location.crossStreet && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 break-words">
                            Cross streets: {update.location.crossStreet}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Responding Stations
            </h4>
            <div className="flex flex-wrap gap-2">
              {incident.stations.map((station) => (
                <StationBadge 
                  key={station} 
                  station={station} 
                  isAdditional={incident.additionalStations.includes(station)}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
});

function parseStationMovement(text: string): { fromStation: string; toStation: string } | null {
  const match = text.match(/@@ALERT\s+([P\d]+[A-Z]?)\s+MOVE\s+TO\s+STATION\s+(?:FS)?(\d+)/i);
  if (!match) return null;

  const [, fromStation, toStation] = match;
  return {
    fromStation: fromStation.replace(/^P/, 'Station '),
    toStation: `Station ${toStation}`
  };
}