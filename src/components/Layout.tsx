import { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Language } from '../types';

interface LayoutProps {
  children: ReactNode;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Layout({ children, language, onLanguageChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} onLanguageChange={onLanguageChange} />
      <main className="pb-20">
        {children}
      </main>
      <BottomNavigation language={language} />
    </div>
  );
}