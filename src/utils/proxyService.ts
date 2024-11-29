addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const PROXY_URL = 'https://vicalert-proxy.herokuapp.com/proxy';
  const FALLBACK_URL = 'https://cors.sh/https://mazzanet.net.au/cfa/pager-cfa-all.php';

  // Add CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Handle OPTIONS request for CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    })
  }

  try {
    const response = await fetch(PROXY_URL, {
      cf: {
        // Cache for 15 seconds on CDN
        cacheTtl: 15,
        cacheEverything: true,
      },
    })

    // Create new response with CORS headers
    const modifiedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=15'
      }
    })

    return modifiedResponse
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  }
}