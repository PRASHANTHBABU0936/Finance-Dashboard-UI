import React from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Overview } from './components/Dashboard/Overview';

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background font-sans text-foreground">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />
        <div className="flex-1 overflow-y-auto p-8 lg:p-10 hide-scrollbar pb-24">
          <Overview />
        </div>
      </main>
    </div>
  );
}

export default App;
