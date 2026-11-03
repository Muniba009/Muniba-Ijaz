import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Sparkles, RotateCcw } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const ChatbotDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello! I am Muniba's AI Assistant prototype. Ask me anything about Muniba Ijaz's technical background, Python projects, Intermediate education, or her roadmap to becoming a professional AI Engineer.`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'What are Muniba\'s core skills?',
    'Tell me about her education',
    'What projects has she built?',
    'What is her ultimate AI career goal?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('python') || q.includes('programming')) {
      return `Muniba specializes in Python Programming, Artificial Intelligence foundations, Machine Learning concepts, Problem Solving, Computer Fundamentals, and Technology Research. Her Python work emphasizes clean OOP principles, state machines, and algorithmic efficiency.`;
    }
    if (q.includes('education') || q.includes('intermediate') || q.includes('school') || q.includes('college')) {
      return `Muniba has completed her Intermediate education with an analytical focus on Advanced Mathematics, Computer Science, and Physics. This strong foundation in calculus, logic, and scientific reasoning directly fuels her AI development work.`;
    }
    if (q.includes('project') || q.includes('atm') || q.includes('inventory') || q.includes('portfolio')) {
      return `Muniba has built several key software systems:
1. Python ATM Simulation (multi-account authentication, PIN hashing, session ledger)
2. Inventory Management System (dynamic SKU cataloging, automated reorder thresholds)
3. Basic AI Chatbot (intent parsing, keyword taxonomy, context state)
4. Future AI Initiatives (Medical scan CNNs and Autonomous Agent Swarms).`;
    }
    if (q.includes('goal') || q.includes('career') || q.includes('ambition') || q.includes('future')) {
      return `Muniba's career goal is to become a professional AI Engineer. She is focused on mastering deep neural networks, transformer architectures, and scalable intelligent systems to solve meaningful computational problems.`;
    }
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) {
      return `You can reach Muniba directly at ${PERSONAL_INFO.email}. She is open for AI internships, junior development roles, and research collaborations!`;
    }
    if (q.includes('neural') || q.includes('deep learning') || q.includes('model') || q.includes('ai')) {
      return `Artificial Intelligence represents the frontier of computer science. Muniba's current focus is studying loss optimization, gradient descent, convolutional feature extraction, and transformer self-attention mechanisms.`;
    }

    return `Thank you for your question! Muniba is an aspiring AI Engineer with an Intermediate education background, strong Python programming foundations, and hands-on projects including ATM simulations and AI chatbots. Feel free to explore the interactive tabs or contact her at ${PERSONAL_INFO.email}!`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateResponse(query);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: `Conversation reset. How can I assist you with Muniba's AI portfolio today?`,
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="bg-[#050816] rounded-xl border border-[#38BDF8]/20 flex flex-col h-[480px] overflow-hidden text-xs shadow-2xl">
      {/* Chat header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0B1220] border-b border-[#38BDF8]/15">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#2563EB]/30 border border-[#00A6FF]/40 flex items-center justify-center text-[#00A6FF]">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-white text-xs">Muniba AI Bot Prototype</span>
            <span className="block text-[10px] text-[#94A3B8]">NLP Intent Taxonomy v1.2</span>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          title="Reset conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-white ${
                msg.sender === 'user' ? 'bg-[#2563EB]' : 'bg-[#0B1220] border border-[#00A6FF]/40 text-[#00A6FF]'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[82%] p-3 rounded-xl leading-relaxed whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-[#2563EB] text-white rounded-tr-none'
                  : 'bg-[#0B1220] border border-[#38BDF8]/15 text-slate-200 rounded-tl-none'
              }`}
            >
              <p>{msg.text}</p>
              <span className="block text-[9px] text-[#94A3B8] mt-1 text-right">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 italic text-[11px] pl-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF] animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF] animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF] animate-bounce [animation-delay:0.4s]" />
            <span className="ml-1 text-[#00A6FF]">Classifying intent & synthesizing response...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      <div className="px-3 py-2 bg-[#050816]/90 border-t border-[#38BDF8]/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <Sparkles className="w-3.5 h-3.5 text-[#00A6FF] shrink-0" />
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="px-2.5 py-1 rounded bg-[#0B1220] border border-[#38BDF8]/20 hover:border-[#00A6FF] text-[11px] text-[#94A3B8] hover:text-white whitespace-nowrap transition-colors cursor-pointer"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-[#0B1220] border-t border-[#38BDF8]/15 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question about Muniba's AI expertise or Python projects..."
          className="flex-1 bg-[#050816] border border-[#38BDF8]/20 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00A6FF]"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="p-2 bg-[#2563EB] hover:bg-[#00A6FF] text-white hover:text-[#050816] disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
