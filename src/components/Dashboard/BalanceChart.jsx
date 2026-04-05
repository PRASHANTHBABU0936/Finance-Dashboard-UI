import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { format, parseISO, subDays } from 'date-fns';

export function BalanceChart() {
  const { state } = useFinance();

  const data = useMemo(() => {
    const chartData = [];
    let runningBalance = 10000; 
    
    for (let i = 30; i >= 0; i--) {
      const d = subDays(new Date(), i);
      const dateStr = format(d, 'MMM dd');
      
      const dayTxs = state.transactions.filter(t => format(parseISO(t.date), 'MMM dd') === dateStr);
      let dayChange = 0;
      dayTxs.forEach(t => {
        if (t.type === 'income') dayChange += t.amount;
        else dayChange -= t.amount;
      });
      
      runningBalance += dayChange;
      
      chartData.push({
        date: dateStr,
        balance: runningBalance
      });
    }
    return chartData;
  }, [state.transactions]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text)' }} dy={10} minTickGap={30} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text)' }} tickFormatter={(val) => `₹${val}`} dx={-10} />
        <Tooltip 
          contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
          itemStyle={{ color: 'var(--foreground)' }}
        />
        <Area type="monotone" dataKey="balance" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
