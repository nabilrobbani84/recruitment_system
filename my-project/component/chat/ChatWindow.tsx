"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Paperclip, SendHorizonal, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils'; // Asumsi Anda punya fungsi helper classnames

// Tipe untuk setiap pesan dalam chat
type Message = {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  timestamp: string;
};

// Komponen Jendela Chat
export function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Halo! Selamat datang di Recruiteasy. Ada yang bisa kami bantu?',
      sender: 'agent',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);

  // Efek untuk auto-scroll ke pesan terbaru
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTo({ top: messageListRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isAgentTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsAgentTyping(true);

    // Simulasi balasan dari agen setelah 1.5 detik
    setTimeout(() => {
      const agentReply: Message = {
        id: Date.now() + 1,
        text: 'Terima kasih atas pertanyaan Anda. Tim kami akan segera merespons dalam beberapa menit.',
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setIsAgentTyping(false);
      setMessages(prev => [...prev, agentReply]);
    }, 1500);
  };

  return (
    <div className="flex h-[70vh] max-h-[600px] w-80 flex-col rounded-xl bg-white shadow-2xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700 sm:w-96">
      {/* Header Chat */}
      <div className="flex items-center justify-between rounded-t-xl bg-gray-100 p-4 dark:bg-gray-700/50 border-b dark:border-gray-200/50">
        <div className="flex items-center gap-3">
            <div className="relative">
                <Image src="https://placehold.co/40x40/e0e7ff/4338ca?text=R" alt="Agent" width={40} height={40} className="rounded-full" />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-700/50"></span>
            </div>
            <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Bantuan & Dukungan</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">Online</p>
            </div>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
          <X size={20} />
        </button>
      </div>

      {/* Daftar Pesan */}
      <div ref={messageListRef} className="flex-1 space-y-4 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900/50">
        {messages.map((msg) => (
          <div key={msg.id} className={cn('flex items-end gap-2', msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
            {msg.sender === 'agent' && (
              <Image src="https://placehold.co/40x40/e0e7ff/4338ca?text=R" alt="Agent" width={32} height={32} className="h-8 w-8 rounded-full" />
            )}
            <div className={cn(
                'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm',
                msg.sender === 'user' ? 'rounded-br-lg bg-blue-600 text-white' : 'rounded-bl-lg bg-white text-gray-800 dark:bg-gray-600 dark:text-gray-200'
              )}>
              <p className="leading-relaxed">{msg.text}</p>
              <span className={cn('mt-1 block text-xs opacity-70', msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400')}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        {isAgentTyping && (
            <div className="flex items-end gap-2 justify-start">
                 <Image src="https://placehold.co/40x40/e0e7ff/4338ca?text=R" alt="Agent" width={32} height={32} className="h-8 w-8 rounded-full" />
                 <div className="max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm rounded-bl-lg bg-white text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></span>
                    </div>
                 </div>
            </div>
        )}
      </div>

      {/* Form Input Pesan */}
      <div className="border-t p-3 bg-white dark:bg-gray-800 dark:border-gray-600">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button type="button" className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
             <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ketik pesan Anda..."
            className="flex-1 rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            autoComplete="off"
          />
          <button
            type="submit"
            className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!inputValue.trim()}
          >
            <SendHorizonal size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
