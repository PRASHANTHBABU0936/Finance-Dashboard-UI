import React from 'react';
import { SummaryCards } from './SummaryCards';
import { BalanceChart } from './BalanceChart';
import { SpendingBreakdown } from './SpendingBreakdown';
import { InsightsPanel } from './InsightsPanel';
import { TransactionsList } from '../Transactions/TransactionsList';
import { useFinance } from '../../context/FinanceContext';
import { motion } from 'framer-motion';

export function Overview() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Balance Trend</h3>
            <select className="bg-secondary text-sm px-3 py-1.5 rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/50 text-foreground cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px]">
            <BalanceChart />
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-6">Spending Breakdown</h3>
          <div className="flex-1 flex flex-col justify-center items-center">
            <SpendingBreakdown />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2 bg-card border border-border rounded-2xl shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <TransactionsList />
        </motion.div>
        
        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <InsightsPanel />
        </motion.div>
      </div>
    </div>
  );
}
