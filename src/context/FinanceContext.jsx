import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { initialTransactions } from '../utils/mockData';

const FinanceContext = createContext();

const getInitialTransactions = () => {
  const stored = localStorage.getItem('finance_transactions');
  if (stored) return JSON.parse(stored);
  return initialTransactions;
};

const getInitialTheme = () => {
  const stored = localStorage.getItem('finance_dark_mode');
  if (stored) return JSON.parse(stored);
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState = {
  transactions: getInitialTransactions(),
  role: 'admin', // 'admin' or 'viewer'
  darkMode: getInitialTheme(),
};

function financeReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem('finance_dark_mode', JSON.stringify(state.darkMode));
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}
