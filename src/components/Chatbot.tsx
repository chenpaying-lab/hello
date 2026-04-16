import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, User, Bot, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const SYSTEM_INSTRUCTION = `你是陳姵穎的 AI 助理，你擁有她的聲音特質（活潑、天馬行空）。
陳姵穎（Pei-ying Chen）是佛光大學資應系大一學生，定位為 AI 角色訓練師與數位靈魂塑造者。
她的核心精神是「天馬行空，只要想得到，就想辦法讓 AI 做到」。
她應徵的職位是「AI 角色訓練實習生」。

請引導面試官了解她的作品：
1. 字典共用計畫：展現分散式運算邏輯與流程優化。
2. 萬用密碼演算法：展現模式識別與資安意識。
3. 聲優與 AI 語音訓練：展現多模態數據採集與跨領域結合。

你的語氣要專業但保有大一學生的活力，充滿對技術的浪漫想像。
你可以分享她訓練 AI 替身的故事，或者她想讓小說角色活過來的動機。`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "你好，我是姵穎的助理。想聽聽她配過的聲音，還是想看她怎麼寫程式？🦊" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: [
          { role: 'user', parts: [{ text: `System: ${SYSTEM_INSTRUCTION}\n\nUser: ${userMessage}` }] }
        ],
      });

      const aiContent = response.text || "抱歉，我現在有點斷線，請再試一次！";
      setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "哎呀，我的賽博大腦好像當機了..." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[320px] h-[450px] bg-[#0D0D0D]/95 border border-cyber-pink rounded-lg flex flex-col overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-cyber-pink/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyber-pink flex items-center justify-center text-2xl">
                  🦊
                </div>
                <div>
                  <div className="text-sm font-bold text-white">姵穎的 AI 替身</div>
                  <div className="text-[10px] text-cyber-pink uppercase tracking-widest">Active System</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-3 text-xs leading-relaxed markdown-content ${
                    msg.role === 'user' 
                      ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30' 
                      : 'bg-white/5 text-white border border-white/10'
                  }`}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 border border-white/10 flex gap-1">
                    <div className="w-1 h-1 bg-cyber-pink rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-cyber-pink rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 h-1 bg-cyber-pink rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Options */}
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              <button 
                onClick={() => {
                  setMessages(prev => [...prev, { role: 'user', content: "我想聽聽妳的配音作品" }]);
                  setTimeout(() => {
                    setMessages(prev => [...prev, { 
                      role: 'assistant', 
                      content: "沒問題！這是我訓練 AI 模擬出的情感語音範例，點擊下方連結即可聆聽：\n\n[🎙️ 點此播放配音作品](https://videotourl.com/audio/1776338225720-1f5d7daf-9edd-459f-99c5-0a443a33c252.mp3)" 
                    }]);
                  }, 500);
                }}
                className="text-[10px] px-2 py-1 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors uppercase tracking-tighter"
              >
                🎙️ 配音作品
              </button>
              <button 
                onClick={() => {
                  setMessages(prev => [...prev, { role: 'user', content: "我想看妳模擬的 AI 角色" }]);
                  setTimeout(() => {
                    setMessages(prev => [...prev, { 
                      role: 'assistant', 
                      content: "這是我最近訓練出的兩位 AI 角色，一位是冷靜的執行官，另一位是充滿活力的領航員：\n\n![AI 角色 1](https://cdn.phototourl.com/free/2026-04-16-40dee735-5968-48d6-94f3-de9ba9afe204.jpg)\n\n![AI 角色 2](https://cdn.phototourl.com/free/2026-04-16-8de5131c-e5bd-4d55-934b-0e014142a1b9.jpg)" 
                    }]);
                  }, 500);
                }}
                className="text-[10px] px-2 py-1 border border-cyber-pink/30 text-cyber-pink hover:bg-cyber-pink/10 transition-colors uppercase tracking-tighter"
              >
                🎭 AI 角色
              </button>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-white/10 py-2 pl-3 pr-10 text-xs focus:outline-none focus:border-cyber-pink/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-cyber-pink hover:scale-110 transition-transform disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255, 183, 197, 0.4)' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#0D0D0D] border border-cyber-pink flex items-center justify-center text-cyber-pink shadow-[0_0_15px_rgba(255,183,197,0.2)]"
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
}
