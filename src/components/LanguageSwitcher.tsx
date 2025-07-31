import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-orange-400 transition-colors">
        <Globe className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">{currentLanguage.native}</span>
      </button>

      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => i18n.changeLanguage(language.code)}
            className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              i18n.language === language.code ? 'bg-orange-100 text-orange-700' : 'text-gray-700'
            }`}
          >
            <div className="font-medium">{language.native}</div>
            <div className="text-sm text-gray-500">{language.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
