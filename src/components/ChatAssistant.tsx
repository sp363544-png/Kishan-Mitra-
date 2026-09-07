import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Sparkles, Mic } from 'lucide-react';

interface Props {
  language: 'en' | 'hi';
}

export default function ChatAssistant({ language }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = {
    title: language === 'hi' ? 'किसान सहायक' : 'Kishan Sahayak',
    subtitle: language === 'hi' ? 'आपका एआई सहायक' : 'Your AI Assistant',
    greeting: language === 'hi' ? 'नमस्ते! 👋\nआज मैं आपकी कैसे मदद कर सकता हूँ?' : 'Namaste! 👋\nHow can I help you today?',
    placeholder: language === 'hi' ? 'कुछ पूछें...' : 'Type your question...',
    suggestions: language === 'hi' ? [
      'निकटतम केंद्र कौन सा है?',
      'मेरा वर्तमान टोकन क्या है?',
      'मेरा अगला स्लॉट कब है?',
      'मेरी खरीद में देरी क्यों हो रही है?'
    ] : [
      'Where is the nearest center?',
      'What is my current token?',
      'When is my next slot?',
      'Why is my procurement delayed?'
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chat', handleOpen);
    return () => window.removeEventListener('open-chat', handleOpen);
  }, []);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    // Determine model based on keywords
    let selectedModel = 'gemini-3.5-flash';
    const textLower = text.toLowerCase();
    if (textLower.includes('complex') || textLower.includes('analyze') || textLower.includes('compare')) {
      selectedModel = 'gemini-3.1-pro-preview';
    } else if (textLower.includes('fast') || textLower.includes('quick')) {
      selectedModel = 'gemini-3.1-flash-lite';
    }

    const userMessage = { role: 'user' as const, text };
    const currentMessages = [...messages];
    
    setMessages([...currentMessages, userMessage]);
    if(text === input) setInput('');
    setLoading(true);

    try {
      const isLocationQuery = textLower.includes('where') || textLower.includes('mandi') || textLower.includes('center') || textLower.includes('map') || textLower.includes('nearest');
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: currentMessages,
          message: text,
          model: selectedModel,
          useGrounding: isLocationQuery
        })
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'model', text: data.text || 'Sorry, I could not understand that.' }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: 'Error connecting to the assistant.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 md:bottom-12 right-4 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-[#0F7A3B] rounded-full shadow-[0_8px_30px_rgb(15,122,59,0.3)] text-white flex items-center justify-center hover:bg-[#0F7A3B]/90 transition-transform hover:scale-105 active:scale-95 z-40 border-2 border-white"
      >
        <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-0 md:bottom-12 right-0 md:right-8 w-full md:w-[400px] h-[85vh] md:h-[650px] bg-[#F4F6F4] md:rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-white p-4 flex justify-between items-center shrink-0 border-b border-slate-100 shadow-sm relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0F7A3B]/10 border border-[#0F7A3B]/20 flex items-center justify-center relative">
                  <span className="text-2xl">👨‍🌾</span>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0F7A3B] rounded-full flex items-center justify-center border-2 border-white">
                     <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                   <h3 className="font-bold tracking-tight text-[#1E3A8A] text-lg leading-tight">{t.title}</h3>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t.subtitle}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-[#1E3A8A] transition-colors hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white/50 backdrop-blur-sm">
              
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#0F7A3B]/10 flex items-center justify-center shrink-0 border border-[#0F7A3B]/20">
                    <span className="text-sm">👨‍🌾</span>
                 </div>
                 <div className="p-4 rounded-2xl rounded-tl-none bg-white border border-slate-100 shadow-sm text-sm text-[#1E3A8A] font-medium whitespace-pre-line max-w-[85%]">
                    {t.greeting}
                 </div>
              </div>

              {messages.length === 0 && (
                <div className="space-y-3 px-12 pb-4">
                   {t.suggestions.map((suggestion, idx) => (
                      <button 
                         key={idx}
                         onClick={() => handleSend(suggestion)}
                         className="w-full text-left bg-white border border-[#0F7A3B]/20 hover:border-[#0F7A3B] hover:bg-[#0F7A3B]/5 text-[#1E3A8A] text-xs font-bold p-3.5 rounded-2xl transition-colors shadow-sm"
                      >
                         {suggestion}
                      </button>
                   ))}
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${msg.role === 'user' ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]' : 'bg-[#0F7A3B]/10 border-[#0F7A3B]/20'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <span className="text-sm">👨‍🌾</span>}
                  </div>
                  <div className={`p-4 rounded-2xl max-w-[85%] text-sm font-medium shadow-sm border ${msg.role === 'user' ? 'bg-[#1E3A8A] text-white rounded-tr-none border-[#1E3A8A]' : 'bg-white text-[#1E3A8A] border-slate-100 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0F7A3B]/10 border border-[#0F7A3B]/20 flex items-center justify-center shrink-0">
                    <span className="text-sm">👨‍🌾</span>
                  </div>
                  <div className="bg-white border border-slate-100 shadow-sm p-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
              <div className="flex gap-2 items-center bg-[#F4F6F4] rounded-2xl p-1 border border-slate-200 focus-within:border-[#0F7A3B] transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.placeholder}
                  className="flex-1 bg-transparent border-transparent px-4 py-3 text-sm font-medium text-[#1E3A8A] placeholder:text-slate-400 focus:outline-none"
                />
                <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-[#0F7A3B] transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 bg-[#0F7A3B] rounded-xl flex items-center justify-center text-white disabled:opacity-50 hover:bg-[#0F7A3B]/90 transition-colors shrink-0 shadow-sm"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
