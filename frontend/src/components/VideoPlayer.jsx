import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ hlsUrl }) {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
    }
  }, [hlsUrl]);
  return <video ref={videoRef} controls style={{ width: "100%" }} />;
}
