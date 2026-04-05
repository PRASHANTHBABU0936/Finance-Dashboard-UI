import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { X } from 'lucide-react';
import { categories } from '../../utils/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export function TransactionForm({ onClose }) {
  const { dispatch } = useFinance();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: categories.expense[0],
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category) return;

    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        id: `t_${Date.now()}`,
        title: formData.title,
        amount: parseFloat(formData.amount),
        type: formData.type,
        category: formData.category,
        date: new Date(formData.date).toISOString()
      }
    });
    
    onClose();
  };

  const handleTypeChange = (type) => {
    setFormData({
      ...formData,
      type,
      category: categories[type][0] // Reset category based on type
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        <motion.div 
          className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl relative z-10 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
        >
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="text-xl font-semibold">New Transaction</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-secondary text-foreground/50 hover:text-foreground">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            <div className="flex bg-secondary p-1 rounded-xl">
              <button 
                type="button"
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${formData.type === 'expense' ? 'bg-card text-foreground shadow-sm' : 'text-foreground/60 hover:text-foreground'}`}
                onClick={() => handleTypeChange('expense')}
              >
                Expense
              </button>
              <button 
                type="button"
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${formData.type === 'income' ? 'bg-card text-success shadow-sm' : 'text-foreground/60 hover:text-foreground'}`}
                onClick={() => handleTypeChange('income')}
              >
                Income
              </button>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/70 mb-1 block">Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g. Groceries"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/70 mb-1 block">Amount (₹)</label>
              <input 
                type="number" 
                required
                min="0.01"
                step="0.01"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
                className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="0.00"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground/70 mb-1 block">Category</label>
                <select 
                  required
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
                >
                  {categories[formData.type].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground/70 mb-1 block">Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="mt-4 w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
              Save Transaction
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
