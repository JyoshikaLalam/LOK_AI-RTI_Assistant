import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface RTIState {
  currentLanguage: string;
  isListening: boolean;
  rtiDrafts: RTIDraft[];
  rtiApplications: RTIApplication[];
  dailyLimit: number;
  usedLimit: number;
}

interface RTIDraft {
  id: string;
  content: string;
  department: string;
  createdAt: Date;
  language: string;
}

interface RTIApplication {
  id: string;
  subject: string;
  department: string;
  submittedAt: Date;
  status: 'pending' | 'replied' | 'appeal' | 'closed';
  dueDate: Date;
  response?: string;
}

type RTIAction = 
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_LISTENING'; payload: boolean }
  | { type: 'ADD_DRAFT'; payload: RTIDraft }
  | { type: 'ADD_APPLICATION'; payload: RTIApplication }
  | { type: 'INCREMENT_USAGE' }
  | { type: 'RESET_DAILY_LIMIT' };

const initialState: RTIState = {
  currentLanguage: 'en',
  isListening: false,
  rtiDrafts: [],
  rtiApplications: [],
  dailyLimit: 3,
  usedLimit: 0,
};

const rtiReducer = (state: RTIState, action: RTIAction): RTIState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, currentLanguage: action.payload };
    case 'SET_LISTENING':
      return { ...state, isListening: action.payload };
    case 'ADD_DRAFT':
      return { ...state, rtiDrafts: [...state.rtiDrafts, action.payload] };
    case 'ADD_APPLICATION':
      return { ...state, rtiApplications: [...state.rtiApplications, action.payload] };
    case 'INCREMENT_USAGE':
      return { ...state, usedLimit: state.usedLimit + 1 };
    case 'RESET_DAILY_LIMIT':
      return { ...state, usedLimit: 0 };
    default:
      return state;
  }
};

const RTIContext = createContext<{
  state: RTIState;
  dispatch: React.Dispatch<RTIAction>;
} | null>(null);

export const RTIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(rtiReducer, initialState);

  return (
    <RTIContext.Provider value={{ state, dispatch }}>
      {children}
    </RTIContext.Provider>
  );
};

export const useRTI = () => {
  const context = useContext(RTIContext);
  if (!context) {
    throw new Error('useRTI must be used within RTIProvider');
  }
  return context;
};