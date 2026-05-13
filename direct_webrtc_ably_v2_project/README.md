# Direct WebRTC Camera Feed for Vercel

This version uses:

- Vercel for hosting the page and creating short-lived Ably auth tokens.
- Ably for tiny realtime signaling messages only.
- WebRTC for the actual live video.
- A canvas-captured outgoing stream by default, so car/capture cameras that preview correctly but render black through raw WebRTC tracks usually work.

It does not use PeerJS, Redis, or Vercel Blob for video.

## Setup

1. Create a free Ably account and app.
2. Copy the Ably API key.
3. In Vercel Project Settings > Environment Variables, add:

```txt
ABLY_API_KEY=your_ably_api_key_here
```

4. Deploy this folder to Vercel.
5. Open the deployed URL on the camera device and press **Start camera**.
6. Open the same URL on the viewer device and press **Watch**.

## Room names

Default room:

```txt
td-clockcam-direct-room
```

Use a custom room like this:

```txt
https://your-site.vercel.app/?room=kitchen
```

Both devices must use the same room URL.

## Notes

Vercel Functions do not act as WebSocket servers, so a realtime signaling provider is used. The live video does not pass through Ably or Vercel; only small SDP/ICE signaling messages do.
