import React, { useState, useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Search, Plus, Filter, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { TransactionForm } from './TransactionForm';

export function TransactionsList() {
  const { state } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    return state.transactions.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = filterType === 'all' ? true : t.type === filterType;
      return matchSearch && matchType;
    });
  }, [state.transactions, searchTerm, filterType]);

  const exportCSV = () => {
    const headers = ['Date', 'Title', 'Category', 'Type', 'Amount'];
    const rows = state.transactions.map(t => [
      format(parseISO(t.date), 'yyyy-MM-dd'),
      t.title,
      t.category,
      t.type,
      t.amount
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-[500px] bg-card rounded-2xl w-full">
      <div className="p-6 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>
        
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto hide-scrollbar pb-1 md:pb-0">
          <div className="relative flex-1 min-w-[150px] md:w-64 flex-shrink-0">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <div className="relative flex-shrink-0">
            <select 
              className="appearance-none bg-secondary/50 border border-border rounded-lg pl-8 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50 pointer-events-none" />
          </div>

          <button onClick={exportCSV} className="p-2 border border-border flex-shrink-0 rounded-lg text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors" title="Export CSV">
            <Download size={18} />
          </button>

          {state.role === 'admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg flex-shrink-0 text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus size={16} /> Add 
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 hide-scrollbar">
        {filteredTransactions.length === 0 ? (
          <div className="h-full flex items-center justify-center text-foreground/50 text-sm">
            No transactions found.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredTransactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${t.type === 'income' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                    {t.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm md:text-base">{t.title}</h4>
                    <span className="text-xs text-foreground/60">{format(parseISO(t.date), 'MMM dd, yyyy')} • {t.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold text-sm md:text-base ${t.type === 'income' ? 'text-success' : 'text-foreground'}`}>
                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && <TransactionForm onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
