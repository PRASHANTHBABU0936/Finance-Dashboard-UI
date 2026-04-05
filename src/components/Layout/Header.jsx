import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Moon, Sun, Bell, User } from 'lucide-react';

export function Header() {
  const { state, dispatch } = useFinance();

  const toggleRole = () => {
    dispatch({ type: 'SET_ROLE', payload: state.role === 'admin' ? 'viewer' : 'admin' });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="h-20 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8 w-full shadow-sm">
      <div>
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">
          {getGreeting()}, Prashanth 👋
        </h2>
        <p className="text-sm text-foreground/60 mt-0.5">
          {state.role === 'admin' 
            ? "Mode: Admin (Full Access)" 
            : "Mode: Viewer (Read-only)"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher */}
        <div className="flex items-center bg-secondary rounded-full p-1 border border-border">
          <button
            onClick={toggleRole}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${state.role === 'admin' ? 'bg-primary text-white shadow-sm' : 'text-foreground/60 hover:text-foreground'}`}
          >
            Admin
          </button>
          <button
            onClick={toggleRole}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${state.role === 'viewer' ? 'bg-primary text-white shadow-sm' : 'text-foreground/60 hover:text-foreground'}`}
          >
            Viewer
          </button>
        </div>

        <div className="w-px h-6 bg-border mx-2"></div>

        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-full hover:bg-secondary text-foreground/70 hover:text-foreground transition-colors border border-transparent hover:border-border"
        >
          {state.darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2.5 rounded-full hover:bg-secondary text-foreground/70 hover:text-foreground transition-colors border border-transparent hover:border-border relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger border-2 border-card"></span>
        </button>
        
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white ml-2 shadow-md">
          <User size={20} />
        </div>
      </div>
    </header>
  );
}
