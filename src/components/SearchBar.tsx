import { useState } from 'react';
import { Search, Mic, MicOff } from 'lucide-react';
import { Language } from '../types';
import { useTranslations } from '../data/translations';

interface SearchBarProps {
  language: Language;
  onSearch: (query: string) => void;
}

export function SearchBar({ language, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const t = useTranslations(language);

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
    setTimeout(() => {
      setIsListening(false);
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-green-600" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search}
            className="w-full pl-12 pr-16 py-4 text-lg border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white shadow-sm"
          />
          <button
            type="button"
            onClick={handleVoiceSearch}
            className={`absolute right-3 p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 text-white' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
        </div>
        {isListening && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-green-100 border border-green-300 rounded-lg p-3 text-center text-green-800">
            {t.listening}
          </div>
        )}
      </form>
    </div>
  );
}