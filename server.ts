import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { WebSocketServer } from 'ws';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory mock data for UI
  const centers = [
    { id: "c1", name: "Manduadih Mandi", district: "Varanasi", distance: "2.5 km", capacity: 50, currentLoad: 12, status: "green", lat: 25.3176, lng: 82.9739 },
    { id: "c2", name: "Raja Talab Center", district: "Varanasi", distance: "8.1 km", capacity: 40, currentLoad: 38, status: "red", lat: 25.2677, lng: 82.8833 },
    { id: "c3", name: "Cholapur Procurement", district: "Varanasi", distance: "12.4 km", capacity: 60, currentLoad: 45, status: "yellow", lat: 25.4333, lng: 83.0500 },
    { id: "c4", name: "Pindra Mandi", district: "Varanasi", distance: "15.0 km", capacity: 30, currentLoad: 5, status: "green", lat: 25.4500, lng: 82.8167 },
  ];

  app.get("/api/centers", (req, res) => res.json(centers));

  // Chatbot endpoint (multi-turn)
  app.post("/api/chat", async (req, res) => {
    try {
      const { history, message, model, useGrounding } = req.body;
      const targetModel = model || "gemini-3.5-flash";
      
      const config: any = {
        systemInstruction: "You are an assistant for Kishan Mitra, an app for farmers to book slots and track queues for crop procurement. Be helpful, concise, and professional.",
      };

      if (useGrounding) {
        config.tools = [{ googleMaps: {} }];
        config.toolConfig = { includeServerSideToolInvocations: true };
      }

      // Convert history to Gemini format
      const formattedHistory = (history || []).map((msg: any) => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      // Append current message
      formattedHistory.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: targetModel,
        contents: formattedHistory,
        config
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // WebSocket for Live API
  const wss = new WebSocketServer({ server, path: '/live' });

  wss.on("connection", async (clientWs) => {
    try {
      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: "You are a helpful voice assistant for Kishan Mitra. You assist farmers in booking slots and checking queues. Answer briefly and kindly.",
        },
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audio) clientWs.send(JSON.stringify({ audio }));
            if (message.serverContent?.interrupted)
              clientWs.send(JSON.stringify({ interrupted: true }));
          },
        },
      });

      clientWs.on("message", (data) => {
        const parsed = JSON.parse(data.toString());
        if (parsed.audio) {
          session.sendRealtimeInput({
            audio: { data: parsed.audio, mimeType: "audio/pcm;rate=16000" },
          });
        }
      });
      
      clientWs.on("close", () => {
        // cleanup?
      });
    } catch (err) {
      console.error("WebSocket error:", err);
    }
  });
}

startServer();
