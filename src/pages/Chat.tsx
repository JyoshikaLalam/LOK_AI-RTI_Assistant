import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Mic, 
  Send, 
  Download, 
  AlertTriangle, 
  Bot,
  User,
  Volume2,
  Loader,
  X
} from 'lucide-react';
import { useRTI } from '../context/RTIContext';
import { VoiceInput } from '../components/VoiceInput';
import { MisuseDetector } from '../services/MisuseDetector';
import { RTIGenerator } from '../services/RTIGenerator';
import { PDFGenerator } from '../services/PDFGenerator';

interface Message {
  id: string;
  type: 'user' | 'bot' | 'rti';
  content: string;
  timestamp: Date;
  department?: string;
  isProcessing?: boolean;
}

export const Chat: React.FC = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useRTI();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showMisuseWarning, setShowMisuseWarning] = useState(false);
  const [currentRTI, setCurrentRTI] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const misuseDetector = new MisuseDetector();
  const rtiGenerator = new RTIGenerator();
  const pdfGenerator = new PDFGenerator();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        type: 'bot',
        content: t('chat.title'),
        timestamp: new Date()
      }]);
    }
  }, [t]);

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    if (state.usedLimit >= state.dailyLimit) {
      alert('Daily limit reached. Please try again tomorrow.');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Add processing message
    const processingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: t('chat.processing'),
      timestamp: new Date(),
      isProcessing: true
    };
    setMessages(prev => [...prev, processingMessage]);

    try {
      // Check for misuse
      const isMisuse = await misuseDetector.detectMisuse(input, state.currentLanguage);
      
      if (isMisuse) {
        setShowMisuseWarning(true);
        setMessages(prev => prev.filter(m => !m.isProcessing));
        setIsProcessing(false);
        return;
      }

      // Generate RTI
      const rtiResult = await rtiGenerator.generateRTI(input, state.currentLanguage);
      
      // Remove processing message and add RTI response
      setMessages(prev => [
        ...prev.filter(m => !m.isProcessing),
        {
          id: (Date.now() + 2).toString(),
          type: 'rti',
          content: rtiResult.content,
          department: rtiResult.department,
          timestamp: new Date()
        }
      ]);

      setCurrentRTI(rtiResult.content);
      dispatch({ type: 'INCREMENT_USAGE' });

    } catch (error) {
      setMessages(prev => [
        ...prev.filter(m => !m.isProcessing),
        {
          id: (Date.now() + 3).toString(),
          type: 'bot',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadPDF = async (rtiContent: string, department?: string) => {
    try {
      await pdfGenerator.generateRTIPDF({
        content: rtiContent,
        department: department || 'General',
        language: state.currentLanguage,
        applicantName: 'Citizen',
        applicantAddress: '',
        applicantEmail: '',
        applicantPhone: ''
      });
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF generation failed. Please try again.');
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = state.currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg mb-6 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('chat.title')}</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {t('chat.limitWarning', { used: state.usedLimit, total: state.dailyLimit })}
          </p>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${state.usedLimit < state.dailyLimit ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              {state.usedLimit < state.dailyLimit ? 'Available' : 'Limit Reached'}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-white rounded-2xl shadow-lg mb-6">
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-orange-500' 
                    : message.type === 'rti'
                    ? 'bg-green-500'
                    : 'bg-blue-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                
                <div className={`rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-orange-500 text-white'
                    : message.type === 'rti'
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-100'
                }`}>
                  {message.isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>{message.content}</span>
                    </div>
                  ) : (
                    <>
                      <p className={`${message.type === 'rti' ? 'whitespace-pre-wrap font-mono text-sm' : ''}`}>
                        {message.content}
                      </p>
                      
                      {message.type === 'rti' && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            onClick={() => handleDownloadPDF(message.content, message.department)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors"
                          >
                            <Download className="h-4 w-4" />
                            <span>{t('common.download')}</span>
                          </button>
                          
                          <button
                            onClick={() => speakText(message.content)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors"
                          >
                            <Volume2 className="h-4 w-4" />
                            <span>Read Aloud</span>
                          </button>
                          
                          {message.department && (
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {message.department}
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chat.placeholder')}
              className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows={3}
              disabled={isProcessing || state.usedLimit >= state.dailyLimit}
            />
          </div>
          
          <div className="flex flex-col space-y-2">
            <VoiceInput
              onTranscript={handleVoiceInput}
              isListening={isListening}
              setIsListening={setIsListening}
              language={state.currentLanguage}
            />
            
            <button
              type="submit"
              disabled={!input.trim() || isProcessing || state.usedLimit >= state.dailyLimit}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white p-3 rounded-xl transition-colors flex items-center justify-center"
            >
              {isProcessing ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Misuse Warning Modal */}
      {showMisuseWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900">{t('chat.misuse.title')}</h3>
            </div>
            
            <p className="text-gray-600 mb-4">{t('chat.misuse.description')}</p>
            
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
              {t('chat.misuse.items', { returnObjects: true }).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <p className="text-sm text-gray-500 mb-6">{t('chat.misuse.suggestion')}</p>
            
            <button
              onClick={() => setShowMisuseWarning(false)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition-colors"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};