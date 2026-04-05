import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Lightbulb, TrendingDown, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export function InsightsPanel() {
  const { state } = useFinance();
  
  const topCategory = useMemo(() => {
    const expenses = state.transactions.filter(t => t.type === 'expense');
    const totals = {};
    expenses.forEach(t => totals[t.category] = (totals[t.category] || 0) + t.amount);
    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0] : null;
  }, [state.transactions]);

  return (
    <div className="bg-gradient-to-br from-primary/10 to-purple-500/5 rounded-2xl p-6 border border-primary/20 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6 text-primary">
        <Lightbulb size={24} />
        <h3 className="text-xl font-semibold text-foreground">A.I. Insights</h3>
      </div>
      
      <div className="flex flex-col gap-4">
        {topCategory && (
          <motion.div className="bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-border/50"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-danger/10 text-danger rounded-lg"><TrendingDown size={18} /></div>
              <h4 className="font-medium text-sm">Highest Spending</h4>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              You've spent the most on <strong>{topCategory[0]}</strong> this month (₹{topCategory[1]}). Consider reviewing these expenses.
            </p>
          </motion.div>
        )}
        
        <motion.div className="bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-border/50"
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-success/10 text-success rounded-lg"><Target size={18} /></div>
            <h4 className="font-medium text-sm">Savings Goal</h4>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            You're on track to save 15% more than last month. Keep it up!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
