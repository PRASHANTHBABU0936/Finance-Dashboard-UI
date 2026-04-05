import React from 'react';
import { LayoutDashboard, ArrowLeftRight, PieChart, Settings, LogOut } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 bg-card text-card-foreground border-r border-border h-full flex flex-col items-start px-4 py-6 shadow-sm">
      <div className="flex items-center gap-2 px-2 mb-10 w-full">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-md shadow-primary/20">
          Z
        </div>
        <span className="text-xl font-bold tracking-tight">Zorvyn</span>
      </div>

      <nav className="flex-1 w-full flex flex-col gap-2">
        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        <NavItem icon={<ArrowLeftRight size={20} />} label="Transactions" />
        <NavItem icon={<PieChart size={20} />} label="Insights" />
      </nav>

      <div className="w-full border-t border-border pt-4 flex flex-col gap-2">
        <NavItem icon={<Settings size={20} />} label="Settings" />
        <NavItem icon={<LogOut size={20} />} label="Logout" />
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium
      ${active 
        ? 'bg-primary/10 text-primary' 
        : 'text-foreground/70 hover:bg-secondary hover:text-foreground'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
