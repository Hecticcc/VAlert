type ResourceType = 'style' | 'script' | 'font';

interface Resource {
  url: string;
  type: ResourceType;
  priority: 'high' | 'low';
}

const loadedResources = new Set<string>();

export async function loadResource(resource: Resource): Promise<void> {
  if (loadedResources.has(resource.url)) return;

  return new Promise((resolve, reject) => {
    let element: HTMLElement;

    switch (resource.type) {
      case 'style':
        element = document.createElement('link');
        (element as HTMLLinkElement).rel = 'stylesheet';
        (element as HTMLLinkElement).href = resource.url;
        break;

      case 'script':
        element = document.createElement('script');
        (element as HTMLScriptElement).src = resource.url;
        (element as HTMLScriptElement).async = resource.priority === 'low';
        break;

      case 'font':
        element = document.createElement('link');
        (element as HTMLLinkElement).rel = 'preload';
        (element as HTMLLinkElement).as = 'font';
        (element as HTMLLinkElement).href = resource.url;
        (element as HTMLLinkElement).crossOrigin = 'anonymous';
        break;

      default:
        reject(new Error(`Unsupported resource type: ${resource.type}`));
        return;
    }

    element.onload = () => {
      loadedResources.add(resource.url);
      resolve();
    };
    element.onerror = reject;

    if (resource.priority === 'high') {
      element.setAttribute('fetchpriority', 'high');
    }

    document.head.appendChild(element);
  });
}

export async function loadResourceGroup(resources: Resource[]): Promise<void> {
  const highPriority = resources.filter(r => r.priority === 'high');
  const lowPriority = resources.filter(r => r.priority === 'low');

  // Load high priority resources first
  await Promise.all(highPriority.map(resource => loadResource(resource)));

  // Then load low priority resources
  await Promise.all(lowPriority.map(resource => loadResource(resource)));
}