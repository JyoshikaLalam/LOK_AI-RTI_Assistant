import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Home, MessageCircle, BookOpen, Calendar } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/chat', icon: MessageCircle, label: t('nav.chat') },
    { path: '/info', icon: BookOpen, label: t('nav.info') },
    { path: '/tracker', icon: Calendar, label: t('nav.tracker') },
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t('app.title')}</h1>
              <p className="text-xs text-gray-600">{t('app.subtitle')}</p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === path
                    ? 'bg-orange-100 text-orange-700 font-medium'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <LanguageSwitcher />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <nav className="flex justify-around py-2 border-t">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg ${
                  location.pathname === path
                    ? 'text-orange-700'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};