import React from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Overview } from './components/Dashboard/Overview';
import { useFinance } from './context/FinanceContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Info, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

function App() {
  const { state, dispatch } = useFinance();

  useEffect(() => {
    if (state.feedback) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_FEEDBACK' });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [state.feedback, dispatch]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background font-sans text-foreground">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />
        <div className="flex-1 overflow-y-auto p-8 lg:p-10 hide-scrollbar pb-24 relative">
          
          <AnimatePresence>
            {state.feedback && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className={`fixed top-24 right-8 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md
                  ${state.feedback.type === 'success' ? 'bg-success/10 text-success border-success/20' : 
                    state.feedback.type === 'warning' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 
                    'bg-primary/10 text-primary border-primary/20'}`}
              >
                {state.feedback.type === 'success' && <Check size={18} />}
                {state.feedback.type === 'warning' && <AlertCircle size={18} />}
                {state.feedback.type === 'info' && <Info size={18} />}
                <span className="font-medium text-sm">{state.feedback.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <Overview />
        </div>
      </main>
    </div>
  );
}

export default App;
