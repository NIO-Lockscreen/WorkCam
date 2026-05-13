# V11 Direct WebRTC TURN + Camera Selection

This version keeps the working V10 direct WebRTC + TURN `addTrack` flow, and restores:

- Camera source selection before starting the camera
- Camera switching while streaming via `RTCRtpSender.replaceTrack()`
- Toggle to show/hide the local camera preview on the camera device

Keep Vercel env vars:
- ABLY_API_KEY
- TURN_URLS
- TURN_USERNAME
- TURN_CREDENTIAL

Deploy, open the car/camera device, choose the camera source, press Start camera. On the viewer, press Watch. If the stream fails across networks, use Connection mode = Force TURN relay.
