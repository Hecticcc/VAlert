import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import https from 'https';

const TARGET_URL = 'https://mazzanet.net.au/cfa/pager-cfa-all.php';
const ALLOWED_ORIGINS = [
  'https://vicalert.netlify.app',
  'http://localhost:3000'
];

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const origin = event.headers.origin || '';
  
  // Validate origin
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Origin not allowed' })
    };
  }

  try {
    const data = await fetchData();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=15',
        'Content-Type': 'text/plain'
      },
      body: data
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};

function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(TARGET_URL, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
      
    }).on('error', reject);
  });
}