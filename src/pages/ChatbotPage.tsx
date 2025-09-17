import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2 } from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { useTranslations } from '../data/translations';
import { askGemini, isGeminiConfigured } from '../lib/ai';

interface ChatbotPageProps {
  language: Language;
}

export function ChatbotPage({ language }: ChatbotPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: language === 'hi' 
        ? 'नमस्ते! मैं आपका कृषि सलाहकार हूं। आप अपनी खेती से जुड़ा कोई भी सवाल पूछ सकते हैं।'
        : 'Hello! I am your agricultural advisor. You can ask me any farming-related questions.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('fasalmitra_prev_questions');
      return raw ? JSON.parse(raw) as string[] : [];
    } catch {
      return [];
    }
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = useTranslations(language);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('fasalmitra_prev_questions', JSON.stringify(previousQuestions.slice(0, 50)));
    } catch {}
  }, [previousQuestions]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setPreviousQuestions(prev => [userMessage.content, ...prev.filter(q => q !== userMessage.content)]);

    try {
      if (!isGeminiConfigured()) {
        throw new Error('Gemini API not configured');
      }
      const promptMap: Record<string, string> = {
        en: 'Reply briefly in English with practical farming advice.',
        hi: 'हिंदी में संक्षिप्त, व्यावहारिक कृषि सलाह दें।',
        pa: 'ਸੰਖੇਪ ਵਿੱਚ ਪੰਜਾਬੀ ਵਿੱਚ ਕਾਰਗਰ ਖੇਤੀ ਸਲਾਹ ਦਿਓ।',
        mr: 'संक्षिप्त मराठीत व्यावहारिक शेती सल्ला द्या.',
      };
      const instruction = promptMap[language] || promptMap.en;
      const prompt = `${instruction}\nQuestion: ${userMessage.content}`;
      let reply = await askGemini(prompt);
      if (!reply || reply.trim().length === 0) {
        // simple retry once
        reply = await askGemini(prompt);
      }
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: reply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (e) {
      console.error('Chatbot error:', e);
      const msg = !isGeminiConfigured()
        ? (language === 'hi' ? 'API कुंजी कॉन्फ़िगर नहीं है।' : 'API key not configured.')
        : (language === 'hi' ? 'क्षमा करें, अभी उत्तर नहीं दे पा रहा हूं।' : 'Sorry, I cannot answer right now.');
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: msg,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition implementation would go here
    setTimeout(() => {
      setIsListening(false);
    }, 3000);
  };

  const speakMessage = (content: string) => {
    // Text-to-speech implementation would go here
    console.log('Speaking:', content);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl h-screen flex flex-col">
      <div className="bg-white rounded-xl shadow-lg flex-1 grid grid-cols-1 md:grid-cols-3 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-green-500 text-white p-4 md:col-span-3">
          <h1 className="text-xl font-bold">{t.aiAdvisor}</h1>
          <p className="text-sm opacity-90">AI-powered farming assistant</p>
        </div>

        {/* Previous Questions Panel */}
        <aside className="hidden md:block border-r border-gray-200 p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">{t.previousQuestions}</h2>
          {previousQuestions.length === 0 ? (
            <div className="text-sm text-gray-500">{t.noPreviousQuestions}</div>
          ) : (
            <ul className="space-y-2">
              {previousQuestions.map((q, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setInputText(q)}
                    className="w-full text-left text-sm p-2 rounded hover:bg-gray-100"
                    title={q}
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 md:col-span-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="text-base">{message.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {message.type === 'bot' && (
                    <button
                      onClick={() => speakMessage(message.content)}
                      className="ml-2 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 md:col-span-3">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.askQuestion}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
            
            <button
              onClick={handleVoiceInput}
              className={`p-3 rounded-lg transition-colors ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white p-3 rounded-lg transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          
          {isListening && (
            <div className="mt-2 text-center text-blue-600 font-medium">
              {t.listening}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}