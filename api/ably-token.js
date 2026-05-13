const Ably = require('ably');

module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.ABLY_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing ABLY_API_KEY environment variable.' });
    }

    const rawClientId = String(req.query.clientId || 'clockcam-web');
    const clientId = rawClientId.replace(/[^a-zA-Z0-9:_@.-]/g, '').slice(0, 96) || 'clockcam-web';
    const rest = new Ably.Rest(apiKey);

    const tokenRequest = await rest.auth.createTokenRequest({
      clientId,
      ttl: 60 * 60 * 1000,
      capability: JSON.stringify({
        'clockcam:*': ['publish', 'subscribe', 'presence']
      })
    });

    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json(tokenRequest);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Could not create Ably token request.' });
  }
};
