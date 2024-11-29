import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3001;

const TARGET_URL = 'https://mazzanet.net.au/cfa/pager-cfa-all.php';
const ALLOWED_ORIGINS = [
  'https://vicalert.netlify.app',
  'http://localhost:3000'
];

// Configure CORS
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET'],
  maxAge: 300
}));

// Add basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Proxy endpoint
app.get('/proxy', async (req, res) => {
  try {
    const response = await fetch(TARGET_URL, {
      headers: {
        'Accept': 'text/plain',
        'User-Agent': 'VicAlert/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();

    res.setHeader('Cache-Control', 'public, max-age=15');
    res.setHeader('Content-Type', 'text/plain');
    res.send(data);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});