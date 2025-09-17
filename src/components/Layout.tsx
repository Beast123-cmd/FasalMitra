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
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500937384667-5f1b2f79f6d6?auto=format&fit=crop&w=1600&q=60')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-green-100/80" />
      <div className="relative">
        <Header language={language} onLanguageChange={onLanguageChange} />
        <main className="pb-20 pt-4">
          {children}
        </main>
        <BottomNavigation language={language} />
      </div>
    </div>
  );
}