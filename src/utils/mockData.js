import { subDays } from 'date-fns';

export const initialTransactions = [
  { id: 't1', date: subDays(new Date(), 1).toISOString(), amount: 3200, category: 'Salary', type: 'income', title: 'Monthly Salary' },
  { id: 't2', date: subDays(new Date(), 2).toISOString(), amount: 150, category: 'Food', type: 'expense', title: 'Whole Foods' },
  { id: 't3', date: subDays(new Date(), 3).toISOString(), amount: 45, category: 'Transport', type: 'expense', title: 'Uber' },
  { id: 't4', date: subDays(new Date(), 5).toISOString(), amount: 1200, category: 'Housing', type: 'expense', title: 'Rent' },
  { id: 't5', date: subDays(new Date(), 8).toISOString(), amount: 180, category: 'Utilities', type: 'expense', title: 'Electric Bill' },
  { id: 't6', date: subDays(new Date(), 10).toISOString(), amount: 500, category: 'Freelance', type: 'income', title: 'Web Project' },
  { id: 't7', date: subDays(new Date(), 12).toISOString(), amount: 80, category: 'Entertainment', type: 'expense', title: 'Netflix & Spotify' },
  { id: 't8', date: subDays(new Date(), 15).toISOString(), amount: 320, category: 'Shopping', type: 'expense', title: 'Amazon Electronics' },
  { id: 't9', date: subDays(new Date(), 20).toISOString(), amount: 200, category: 'Investments', type: 'expense', title: 'Stock Purchase' },
];

export const categories = {
  income: ['Salary', 'Freelance', 'Investments', 'Other'],
  expense: ['Food', 'Transport', 'Housing', 'Utilities', 'Entertainment', 'Shopping', 'Investments', 'Other']
};
