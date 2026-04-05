import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export function SummaryCards() {
  const { state } = useFinance();
  const { transactions } = state;

  const { income, expense, balance } = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') {
          acc.income += curr.amount;
          acc.balance += curr.amount;
        } else {
          acc.expense += curr.amount;
          acc.balance -= curr.amount;
        }
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  const cards = [
    { title: 'Total Balance', amount: balance, icon: <Wallet size={24} className="text-primary" />, trend: '+12.5%', color: 'from-primary/20 to-transparent', positive: true },
    { title: 'Total Income', amount: income, icon: <TrendingUp size={24} className="text-success" />, trend: '+8.2%', color: 'from-success/20 to-transparent', positive: true },
    { title: 'Total Expense', amount: expense, icon: <TrendingDown size={24} className="text-danger" />, trend: '-2.4%', color: 'from-danger/20 to-transparent', positive: false },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden shadow-sm group hover:shadow-md transition-shadow"
        >
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${card.color} opacity-50 rounded-bl-full`}></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary rounded-xl group-hover:scale-110 transition-transform duration-300 relative z-10">
              {card.icon}
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md ${card.positive ? 'text-success bg-success/10' : 'text-danger bg-danger/10'}`}>
              {card.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {card.trend}
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-foreground/70 font-medium text-sm mb-1">{card.title}</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              ₹{card.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
