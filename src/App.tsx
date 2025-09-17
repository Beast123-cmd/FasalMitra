import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLanguage } from './hooks/useLanguage';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SoilFertilizerPage } from './pages/SoilFertilizerPage';
import { PestDetectionPage } from './pages/PestDetectionPage';
import { WeatherPage } from './pages/WeatherPage';
import { MarketPricesPage } from './pages/MarketPricesPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  const { language, changeLanguage } = useLanguage();

  return (
    <Router>
      <Layout language={language} onLanguageChange={changeLanguage}>
        <Routes>
          <Route path="/" element={<HomePage language={language} />} />
          <Route path="/soil-fertilizer" element={<SoilFertilizerPage language={language} />} />
          <Route path="/pest-detection" element={<PestDetectionPage language={language} />} />
          <Route path="/weather" element={<WeatherPage language={language} />} />
          <Route path="/market" element={<MarketPricesPage language={language} />} />
          <Route path="/chat" element={<ChatbotPage language={language} />} />
          <Route path="/profile" element={<ProfilePage language={language} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;