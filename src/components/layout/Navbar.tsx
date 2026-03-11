export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img src="/pangea-logo.png" alt="Pangea Logo" className="h-12 w-12 rounded-lg object-cover" />
            <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">The Pangea Model</h2>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a className="text-sm font-semibold text-primary border-b-2 border-primary pb-1 transition-colors" href="#">The Calculator</a>
            <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Validation App</a>
            <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">How It Works</a>
            <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">What is PANGEA?</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
