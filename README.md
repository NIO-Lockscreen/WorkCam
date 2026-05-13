# V9 Direct WebRTC + Ably signaling + TURN config

This version keeps the actual camera feed as direct WebRTC video. Ably is only used for signaling.

Your previous log showed:

```txt
pc connectionState: connecting
iceConnectionState: disconnected
pc connectionState: failed
```

That means the two browsers could signal, but they could not find a usable WebRTC network route. Discord works because Discord has its own ICE/TURN infrastructure. This project lets you add your own TURN relay.

## Files

```txt
index.html
package.json
vercel.json
api/ably-token.js
api/ice.js
```

## Required Vercel env var

```txt
ABLY_API_KEY=your_ably_api_key
```

## Strongly recommended TURN env vars

Use any TURN provider. Add these in Vercel Project Settings → Environment Variables:

```txt
TURN_URLS=turn:your-turn-host:3478,turns:your-turn-host:5349
TURN_USERNAME=your-turn-username
TURN_CREDENTIAL=your-turn-password
```

Then redeploy.

## Test

1. Open the app on the car screen.
2. Press Start camera.
3. Open the app on client 2.
4. Press Watch.
5. If Auto fails, set Connection mode to Force TURN relay and press Watch again.

If Force TURN relay works, keep that mode for the car setup.
