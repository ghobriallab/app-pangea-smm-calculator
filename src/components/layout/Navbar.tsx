import { useState } from 'react';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img src="/pangea-logo.png" alt="Pangea Logo" className="h-12 w-12 rounded-lg object-cover" />
            <h2 className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">The Pangea Model</h2>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a className="text-sm font-semibold text-primary border-b-2 border-primary pb-1 transition-colors" href="#">The Calculator</a>
            <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Validation App</a>
            <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">How It Works</a>
            <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">What is PANGEA?</a>
          </nav>
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-slate-200 dark:border-slate-800 py-3 flex flex-col gap-1">
            <a className="px-2 py-2 text-sm font-semibold text-primary" href="#">The Calculator</a>
            <a className="px-2 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Validation App</a>
            <a className="px-2 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">How It Works</a>
            <a className="px-2 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">What is PANGEA?</a>
          </nav>
        )}
      </div>
    </header>
  );
}
