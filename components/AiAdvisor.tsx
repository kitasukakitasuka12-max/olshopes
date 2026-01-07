import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types.ts';
import { getBeautyAdvice } from '../services/geminiService.ts';
import { Button } from './Button.tsx';

export const AiAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo cantik! Saya Esa, personal stylist Anda. Ada yang bisa saya bantu hari ini?', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText, timestamp: new Date() }]);
    setIsLoading(true);
    const reply = await getBeautyAdvice(userText);
    setMessages(prev => [...prev, { role: 'model', text: reply, timestamp: new Date() }]);
    setIsLoading(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={`fixed bottom-6 right-6 z-40 bg-gray-900 text-white p-4 rounded-full shadow-2xl transition-all ${isOpen ? 'scale-0' : 'scale-100'}`}>
        <Sparkles size={24} />
      </button>

      <div className={`fixed bottom-6 right-6 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-rose-100 transition-all origin-bottom-right ${isOpen ? 'scale-100' : 'scale-0 pointer-events-none'}`}>
        <div className="bg-rose-600 p-4 flex justify-between text-white">
          <span className="font-serif font-bold">Esa Stylist</span>
          <button onClick={() => setIsOpen(false)}><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-2 rounded-lg text-sm ${msg.role === 'user' ? 'bg-rose-500 text-white' : 'bg-white border'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t flex gap-2">
          <input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} className="flex-1 bg-gray-100 rounded-full px-4 text-sm outline-none" placeholder="Tanya sesuatu..." />
          <button onClick={handleSend} className="bg-rose-600 p-2 text-white rounded-full"><Send size={16} /></button>
        </div>
      </div>
    </>
  );
};