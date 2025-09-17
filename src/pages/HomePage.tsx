import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { WeatherWidget } from '../components/WeatherWidget';
import { QuickAccessCards } from '../components/QuickAccessCards';
import { Language } from '../types';

interface HomePageProps {
  language: Language;
}

export function HomePage({ language }: HomePageProps) {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    // Navigate to chat with the query
    navigate('/chat', { state: { initialQuery: query } });
  };

  const handleCardClick = (feature: string) => {
    switch (feature) {
      case 'soil':
        navigate('/soil-fertilizer');
        break;
      case 'pest':
        navigate('/pest-detection');
        break;
      case 'weather':
        navigate('/weather');
        break;
      case 'market':
        navigate('/market');
        break;
      case 'chat':
        navigate('/chat');
        break;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <SearchBar language={language} onSearch={handleSearch} />
      <WeatherWidget language={language} />
      <QuickAccessCards language={language} onCardClick={handleCardClick} />
    </div>
  );
}