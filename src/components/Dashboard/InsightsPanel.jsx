import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Lightbulb, TrendingDown, TrendingUp, Target, Calendar } from 'lucide-react';
import { isSameMonth, subMonths, parseISO } from 'date-fns';
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

  const { income, expense } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    state.transactions.forEach(t => {
      if (t.type === 'income') inc += t.amount;
      else exp += t.amount;
    });
    return { income: inc, expense: exp };
  }, [state.transactions]);

  const monthlyComparison = useMemo(() => {
    const today = new Date();
    const lastMonthDate = subMonths(today, 1);
    
    let thisMonthExpense = 0;
    let lastMonthExpense = 0;

    state.transactions.forEach(t => {
      if (t.type === 'expense') {
        try {
          const d = parseISO(t.date);
          if (isSameMonth(d, today)) thisMonthExpense += t.amount;
          if (isSameMonth(d, lastMonthDate)) lastMonthExpense += t.amount;
        } catch(e) {}
      }
    });

    if (lastMonthExpense === 0) return null;
    
    const percentage = ((thisMonthExpense - lastMonthExpense) / lastMonthExpense) * 100;
    return { percentage, lastMonthExpense, thisMonthExpense };
  }, [state.transactions]);

  const isOverspending = expense > income && income > 0;

  return (
    <div className="bg-gradient-to-br from-primary/10 to-purple-500/5 rounded-2xl p-6 border border-primary/20 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6 text-primary">
        <Lightbulb size={24} />
        <h3 className="text-xl font-semibold text-foreground">A.I. Insights</h3>
      </div>
      
      <div className="flex flex-col gap-4">
        {state.role === 'viewer' && (
          <motion.div className="bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-primary/30"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 text-primary rounded-lg"><Lightbulb size={18} /></div>
              <h4 className="font-medium text-sm">Viewer Mode Active</h4>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              You are viewing limited insights. Switch to Admin mode for personalized budget recommendations.
            </p>
          </motion.div>
        )}

        {isOverspending && state.role === 'admin' && (
          <motion.div className="bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-danger/30"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-danger/10 text-danger rounded-lg"><TrendingDown size={18} /></div>
              <h4 className="font-medium text-sm text-danger">Overspending Detected</h4>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Your expenses (₹{expense.toLocaleString()}) have exceeded your income (₹{income.toLocaleString()}). Consider slowing down discretionary purchases.
            </p>
          </motion.div>
        )}

        {topCategory && state.role === 'admin' && (
          <motion.div className="bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-border/50"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-warning/10 text-amber-500 rounded-lg"><TrendingDown size={18} /></div>
              <h4 className="font-medium text-sm">Highest Spending Area</h4>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              You've spent the most on <strong>{topCategory[0]}</strong> this month (₹{topCategory[1].toLocaleString()}). Consider reviewing these expenses.
            </p>
          </motion.div>
        )}

        {state.role === 'admin' && (
          <motion.div className="bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-border/50"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg 
                ${!monthlyComparison ? 'bg-primary/10 text-primary' : 
                  (monthlyComparison.percentage > 0 ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success')} 
              `}>
                <Calendar size={18} />
              </div>
              <h4 className="font-medium text-sm">Monthly Comparison</h4>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {monthlyComparison 
                ? (monthlyComparison.percentage > 0 
                  ? `You have spent ${monthlyComparison.percentage.toFixed(1)}% more this month compared to the last month. Keep an eye on your budget!`
                  : `Great job! Your expenses are down ${Math.abs(monthlyComparison.percentage).toFixed(1)}% compared to last month.`
                )
                : `Your overall spending sits at ₹${expense.toLocaleString()} this month. Keep adding your past transactions to unlock historic month-to-month comparisons.`
              }
            </p>
          </motion.div>
        )}
        
        <motion.div className="bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-border/50"
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-success/10 text-success rounded-lg"><Target size={18} /></div>
            <h4 className="font-medium text-sm">Savings Goal</h4>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {isOverspending ? "You're currently off-track for your saving goals. Re-adjust your budget!" : "You're on track to save 15% more than last month. Keep it up!"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
