import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, X, Volume2 } from 'lucide-react';

interface Props {
  language: 'en' | 'hi';
}

function pcmToBase64(pcmData: Float32Array) {
  const buffer = new ArrayBuffer(pcmData.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < pcmData.length; i++) {
    const s = Math.max(-1, Math.min(1, pcmData[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default function VoiceAssistant({ language }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  
  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);

  const t = {
    title: language === 'hi' ? 'आवाज़ सहायक' : 'Live Voice Assistant',
    prompt: language === 'hi' ? 'मुझसे बात करें' : 'Talk to me...',
    listening: language === 'hi' ? 'सुन रहा हूँ...' : 'Listening...',
  };

  const startLiveSession = async () => {
    try {
      setIsListening(true);
      setError('');
      const wsUrl = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/live`;
      wsRef.current = new WebSocket(wsUrl);

      const inputAudioCtx = new AudioContext({ sampleRate: 16000 });
      inputAudioCtxRef.current = inputAudioCtx;
      const outputAudioCtx = new AudioContext({ sampleRate: 24000 });
      outputAudioCtxRef.current = outputAudioCtx;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = inputAudioCtx.createMediaStreamSource(stream);
      const processor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
      source.connect(processor);
      processor.connect(inputAudioCtx.destination);

      processor.onaudioprocess = (e) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          const base64 = pcmToBase64(e.inputBuffer.getChannelData(0));
          wsRef.current.send(JSON.stringify({ audio: base64 }));
        }
      };

      wsRef.current.onmessage = async (event) => {
        const msg = JSON.parse(event.data);
        if (msg.interrupted) {
          nextStartTimeRef.current = 0; // Reset queue
        }
        if (msg.audio) {
          const binaryStr = atob(msg.audio);
          const bytes = new Uint8Array(binaryStr.length);
          for (let i = 0; i < binaryStr.length; i++) {
            bytes[i] = binaryStr.charCodeAt(i);
          }
          const view = new DataView(bytes.buffer);
          const pcm = new Float32Array(view.byteLength / 2);
          for (let i = 0; i < pcm.length; i++) {
            pcm[i] = view.getInt16(i * 2, true) / 32768;
          }
          const audioBuffer = outputAudioCtx.createBuffer(1, pcm.length, 24000);
          audioBuffer.copyToChannel(pcm, 0);
          
          const sourceNode = outputAudioCtx.createBufferSource();
          sourceNode.buffer = audioBuffer;
          sourceNode.connect(outputAudioCtx.destination);
          
          if (nextStartTimeRef.current < outputAudioCtx.currentTime) {
             nextStartTimeRef.current = outputAudioCtx.currentTime;
          }
          sourceNode.start(nextStartTimeRef.current);
          nextStartTimeRef.current += audioBuffer.duration;
        }
      };
    } catch (err) {
      console.error(err);
      setError('Failed to start microphone');
      setIsListening(false);
    }
  };

  const stopLiveSession = () => {
    setIsListening(false);
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close();
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close();
      outputAudioCtxRef.current = null;
    }
    nextStartTimeRef.current = 0;
  };

  const handleToggle = () => {
    if (isListening) {
      stopLiveSession();
    } else {
      startLiveSession();
    }
  };

  useEffect(() => {
    return () => {
      stopLiveSession();
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[9.5rem] md:bottom-24 right-6 w-14 h-14 bg-emerald-600 rounded-full shadow-lg text-white flex items-center justify-center hover:bg-emerald-700 transition-transform active:scale-95 z-40"
      >
        <Mic className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-[9.5rem] md:bottom-24 right-6 w-[90vw] max-w-[320px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
          >
            <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                <h3 className="font-bold">{t.title}</h3>
              </div>
              <button onClick={() => { setIsOpen(false); stopLiveSession(); }} className="text-emerald-100 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex flex-col items-center">
              <div 
                className={`w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                  isListening ? 'bg-red-100 text-red-500 scale-110 shadow-lg' : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                }`}
                onClick={handleToggle}
              >
                <Mic className={`w-8 h-8 ${isListening ? 'animate-pulse' : ''}`} />
              </div>
              
              <div className="mt-6 text-center min-h-[40px]">
                {error ? (
                  <p className="text-red-500 text-sm">{error}</p>
                ) : isListening ? (
                  <p className="text-slate-500 font-medium animate-pulse">{t.listening}</p>
                ) : (
                  <p className="text-slate-500">{t.prompt}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
