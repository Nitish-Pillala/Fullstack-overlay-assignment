import React from "react";
import OverlayEditor from "./components/OverlayEditor";

export default function App() {
  const streamId = "camera-1";
  const hlsUrl = "http://localhost:8000/stream.m3u8";
  return (
    <div style={{ padding: 20 }}>
      <h1>Live Stream + Overlay Editor</h1>
      <OverlayEditor streamId={streamId} hlsUrl={hlsUrl} />
    </div>
  );
}
