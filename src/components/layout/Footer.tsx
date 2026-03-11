export function Footer() {
  return (
    <footer className="mt-10 sm:mt-16 md:mt-20 py-6 sm:py-8 md:py-10 border-t border-slate-200 dark:border-slate-800 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 opacity-50 grayscale">
          <img src="/pangea-logo.png" alt="Pangea Logo" className="h-8 w-8 rounded-sm object-cover" />
          <h2 className="text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase">The Pangea Model</h2>
        </div>
       
        <p className="text-xs text-slate-400 mt-2">
          © 2026 by the Ghobrial Lab | Dana-Farber Cancer Institute | Boston, MA | USA
        </p>
      </div>
    </footer>
  );
}
