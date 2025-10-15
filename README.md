# Livestream Overlay App (by Nitish)

This project is a **Full Stack Livestream Overlay Application** built as part of my assignment to demonstrate my ability to integrate frontend, backend, and real-time video streaming.

The app allows users to:
- Stream video from an **RTSP source** (converted to HLS)
- Add, move, resize, and delete **image overlays** on the video
- Manage overlay data in **MongoDB** through a **Flask API**
- Interact with overlays via a **React** frontend built with **Vite**

---

## What it includes
- **Flask backend** — handles CRUD operations for overlays and connects to MongoDB.
- **React frontend** — provides video playback and an interactive overlay editor.
- **ffmpeg** — converts RTSP → HLS format for smooth browser playback.
- **CORS enabled** — allows frontend-backend communication during development.

---

## Setup instructions

### 1. Prerequisites
Install:
- Python 3.10+
- Node.js 18+
- MongoDB (running locally on mongodb://localhost:27017)
- ffmpeg
- (optional) `http-server` (`npm install -g http-server`)

---

### 2. Backend setup
```bash
cd backend
python -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

💡 *Note: The Flask backend runs on port 5000 and exposes REST APIs for overlay management.*

---

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

💡 *The frontend runs via Vite (React) on port 5173 and communicates with the Flask backend.*

---

### 4. Stream setup (RTSP → HLS)
```bash
mkdir hls
ffmpeg -i "<RTSP_URL>" -c:v copy -c:a aac -f hls -hls_time 2 -hls_list_size 5 -hls_flags delete_segments hls/stream.m3u8
cd hls && npx http-server -p 8000
```

💡 *ffmpeg continuously converts the RTSP video feed into .m3u8 and .ts segments for the web player.*

---

### 5. Open frontend
Visit the Vite URL (usually `http://localhost:5173`).

---

### 🧠 Developer Notes (Nitish)
- Added clear structure separating backend, frontend, and streaming logic.  
- Each overlay is stored in MongoDB with coordinates, dimensions, and visibility.  
- The UI supports **drag-and-drop overlays** using the `react-rnd` library.  
- Designed and implemented clean CORS-enabled API routes for integration.

---

### ✅ Summary
This project demonstrates:
- Full-stack development (React + Flask + MongoDB)
- Real-time video streaming integration using ffmpeg
- Frontend-backend synchronization through REST APIs

> **Developed by:** Sai Nithish  
> **Purpose:** Full Stack Developer Assignment — Livestream Overlay App  

