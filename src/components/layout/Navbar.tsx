import { useState } from 'react';

export type Page = 'calculator' | 'what-is-pangea';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (page: Page, label: string, mobile = false) => {
    const active = currentPage === page;
    const base = mobile
      ? 'px-2 py-2 text-sm font-semibold transition-colors'
      : 'text-sm font-semibold transition-colors';
    const activeClass = active ? 'text-primary border-b-2 border-primary pb-1' : 'text-slate-600 dark:text-slate-300 hover:text-primary font-medium';
    return (
      <button
        key={page}
        className={`${base} ${activeClass}`}
        onClick={() => { onNavigate(page); setMenuOpen(false); }}
      >
        {label}
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            className="flex items-center gap-3 text-left"
            onClick={() => onNavigate('calculator')}
          >
            <img src="/pangea-logo.png" alt="Pangea Logo" className="h-12 w-12 rounded-lg object-cover" />
            <h2 className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">The Pangea Model</h2>
          </button>
          <nav className="hidden md:flex space-x-8 items-center">
            {navLink('calculator', 'The Calculator')}
            <span className="relative inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed select-none">
              Validation App
              <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                Coming soon
              </span>
            </span>
            {navLink('what-is-pangea', 'What is PANGEA?')}
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
            {navLink('calculator', 'The Calculator', true)}
            <span className="px-2 py-2 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed select-none">
              Validation App
              <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                Coming soon
              </span>
            </span>
            {navLink('what-is-pangea', 'What is PANGEA?', true)}
          </nav>
        )}
      </div>
    </header>
  );
}
