import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchOverlays = (stream_id) =>
  API.get("/overlays", { params: { stream_id } }).then(r => r.data);
export const createOverlay = (payload) =>
  API.post("/overlays", payload).then(r => r.data);
export const updateOverlay = (id, payload) =>
  API.put(`/overlays/${id}`, payload).then(r => r.data);
export const deleteOverlay = (id) =>
  API.delete(`/overlays/${id}`).then(r => r.data);
