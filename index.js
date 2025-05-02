const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');

const app = express();
const PORT = 3000;

// Replace with your Nylas credentials
const apiKey = 'nyl_0_v6WWb3D85bvxik4P9Swe4duUoNenRuo6fPPMxLEmfvpzyzg6t7AUgyvs5RQOm5n4Y';
const grantId = 'f091d633-2457-4a73-bd18-1e9eb7efd2c8';

// Enable CORS for all origins (you can restrict this if needed)
app.use(cors());
app.use(express.json());

app.post('/availability', async (req, res) => {
  try {
    const nylasRes = await fetch('https://api.us.nylas.com/v3/calendars/availability', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Nylas-Grant-Id': grantId
      },
      body: JSON.stringify(req.body)
    });

    const data = await nylasRes.json();
    res.status(nylasRes.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy running at http://localhost:${PORT}`);
});
