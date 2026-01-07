import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { getBeautyAdvice } from '../services/geminiService';
import { Button } from './Button';

export const AiAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo cantik! Saya Esa, personal stylist Anda. Ada yang bisa saya bantu untuk penampilanmu hari ini?', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full animate-ping" />
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-[90vw] max-w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-rose-100 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <Sparkles size={20} className="text-yellow-200" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">Esa Stylist</h3>
              <p className="text-xs text-rose-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Online
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-rose-500 text-white rounded-br-none shadow-md shadow-rose-200' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-rose-500" />
                <span className="text-xs text-gray-400">Sedang mengetik...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-rose-200 focus-within:border-rose-400 transition-all">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tanya rekomendasi..."
              className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="p-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-2">
            Esa Stylist didukung oleh Google Gemini AI
          </p>
        </div>
      </div>
    </>
  );
};