module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const stun = [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ];

    const turnUrlsRaw = process.env.TURN_URLS || '';
    const username = process.env.TURN_USERNAME || '';
    const credential = process.env.TURN_CREDENTIAL || process.env.TURN_PASSWORD || '';
    const turnUrls = turnUrlsRaw.split(',').map(s => s.trim()).filter(Boolean);

    const iceServers = [...stun];
    let turnAvailable = false;

    if (turnUrls.length && username && credential) {
      iceServers.push({ urls: turnUrls, username, credential });
      turnAvailable = true;
    }

    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json({
      iceServers,
      turnAvailable,
      publicSummary: {
        stunCount: stun.length,
        turnAvailable,
        turnUrlCount: turnUrls.length,
        modeHint: turnAvailable ? 'Auto should work; use Force TURN relay if direct ICE fails.' : 'STUN only. Add TURN_URLS, TURN_USERNAME and TURN_CREDENTIAL in Vercel if ICE fails.'
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Could not build ICE config.' });
  }
};
