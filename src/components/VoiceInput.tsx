import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  language: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ 
  onTranscript, 
  isListening, 
  setIsListening, 
  language 
}) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = getLanguageCode(language);
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
      setIsSupported(true);
    }
  }, [language, onTranscript, setIsListening]);

  const getLanguageCode = (lang: string) => {
    switch (lang) {
      case 'hi': return 'hi-IN';
      case 'te': return 'te-IN';
      case 'en': 
      default: return 'en-IN';
    }
  };

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.lang = getLanguageCode(language);
      recognition.start();
      setIsListening(true);
    }
  };

  if (!isSupported) {
    return (
      <button
        disabled
        className="p-3 bg-gray-200 text-gray-400 rounded-xl cursor-not-allowed"
        title="Voice input not supported in this browser"
      >
        <MicOff className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleListening}
      className={`p-3 rounded-xl transition-colors ${
        isListening
          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
      title={isListening ? 'Stop listening' : 'Start voice input'}
    >
      {isListening ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </button>
  );
};