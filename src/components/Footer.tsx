import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">LokAI</h3>
            <p className="text-gray-300 text-sm">
              Empowering citizens with AI-assisted RTI applications. Making transparency accessible to all.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Important Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="https://rti.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">RTI Portal India</a></li>
              <li><a href="https://indiankanoon.org/doc/42355/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">RTI Act 2005</a></li>
              <li><a href="/privacy" className="hover:text-orange-400">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-orange-400">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Disclaimer</h4>
            <p className="text-gray-300 text-sm">
              This is an unofficial AI assistant. Always verify generated RTI applications before submission. 
              Consult legal experts for complex cases.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Scale className="h-4 w-4" />
            <span>Built for transparency and accountability</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-300 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for Indian citizens</span>
          </div>
        </div>
      </div>
    </footer>
  );
};