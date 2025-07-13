import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  MessageCircle, 
  Bot, 
  Globe, 
  Shield, 
  Calendar,
  ArrowRight,
  Users,
  FileText,
  Mic
} from 'lucide-react';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Bot,
      title: t('home.features.ai.title'),
      description: t('home.features.ai.description'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Globe,
      title: t('home.features.multilingual.title'),
      description: t('home.features.multilingual.description'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: t('home.features.legal.title'),
      description: t('home.features.legal.description'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Calendar,
      title: t('home.features.tracking.title'),
      description: t('home.features.tracking.description'),
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'RTI Applications Generated', icon: FileText },
    { number: '15', label: 'Languages Supported', icon: Globe },
    { number: '95%', label: 'Success Rate', icon: Shield },
    { number: '24/7', label: 'AI Assistance', icon: Bot }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-green-50 pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 to-green-100/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/chat"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="h-6 w-6" />
                <span>{t('home.hero.cta')}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                to="/info"
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 transition-all duration-200"
              >
                <FileText className="h-6 w-6" />
                <span>Learn About RTI</span>
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                  <p className="text-gray-600">Ready to help with your RTI</p>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <Mic className="h-5 w-5 text-orange-500" />
                  <Globe className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 italic">
                  "My Ayushman Bharat card application hasn't been processed for 3 months in Vizag. What information can I request?"
                </p>
              </div>
              <div className="mt-4 text-sm text-gray-500 flex items-center space-x-4">
                <span>🎤 Voice input supported</span>
                <span>🌐 Available in Hindi, Telugu</span>
                <span>📄 PDF generation ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-green-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Every Citizen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              LokAI combines cutting-edge AI technology with deep understanding of Indian RTI law to make information access effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Ready to Exercise Your Right to Information?
          </h2>
          <p className="text-xl text-orange-100 mb-12 max-w-3xl mx-auto">
            Join thousands of citizens who have successfully filed RTI applications with AI assistance. Start your journey towards transparency today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/chat"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105"
            >
              <MessageCircle className="h-6 w-6" />
              <span>Start Your RTI Request</span>
            </Link>
            
            <Link
              to="/info"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-200"
            >
              <FileText className="h-6 w-6" />
              <span>Learn RTI Basics</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};