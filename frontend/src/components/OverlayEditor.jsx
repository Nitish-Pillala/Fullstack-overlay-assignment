import React, { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import VideoPlayer from "./VideoPlayer";
import { fetchOverlays, createOverlay, updateOverlay, deleteOverlay } from "../services/api";

export default function OverlayEditor({ streamId, hlsUrl }) {
  const [overlays, setOverlays] = useState([]);

  useEffect(() => {
    load();
  }, [streamId]);

  async function load() {
    const data = await fetchOverlays(streamId);
    setOverlays(data);
  }

  async function addImage() {
    const url = prompt("Image URL:");
    if (!url) return;
    const payload = { stream_id: streamId, type: "image", content: url, x: 10, y: 10, width: 150, height: 80, unit: "px", zIndex: 1, visibility: true };
    const created = await createOverlay(payload);
    setOverlays([...overlays, created]);
  }

  async function onDragStop(id, d) {
    const o = overlays.find(x => x._id === id);
    const updated = { ...o, x: d.x, y: d.y };
    await updateOverlay(id, updated);
    setOverlays(overlays.map(p => p._id === id ? updated : p));
  }

  async function onResize(id, ref, position) {
    const o = overlays.find(x => x._id === id);
    const updated = { ...o, width: parseInt(ref.style.width), height: parseInt(ref.style.height), x: position.x, y: position.y };
    await updateOverlay(id, updated);
    setOverlays(overlays.map(p => p._id === id ? updated : p));
  }

  async function remove(id) {
    await deleteOverlay(id);
    setOverlays(overlays.filter(p => p._id !== id));
  }

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ width: "70%" }}>
        <div style={{ position: "relative", width: "100%", background: "#000" }}>
          <VideoPlayer hlsUrl={hlsUrl} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
            {overlays.map(o => (
              o.visibility && (
                <Rnd key={o._id} size={{ width: o.width, height: o.height }} position={{ x: o.x, y: o.y }}
                     onDragStop={(e, d) => onDragStop(o._id, d)}
                     onResizeStop={(e, dir, ref, delta, pos) => onResize(o._id, ref, pos)}
                     bounds="parent" style={{ zIndex: o.zIndex, pointerEvents: "auto" }}>
                  {o.type === "image" ? (
                    <img src={o.content} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  ) : (
                    <div>{o.content}</div>
                  )}
                  <button onClick={() => remove(o._id)} style={{ position: "absolute", right: 0, top: 0 }}>x</button>
                </Rnd>
              )
            ))}
          </div>
        </div>
      </div>
      <div style={{ width: "30%" }}>
        <h3>Overlays</h3>
        <button onClick={addImage}>Add Image</button>
        <ul>{overlays.map(o => (<li key={o._id}>{o.type} - {o.content}</li>))}</ul>
      </div>
    </div>
  );
}
