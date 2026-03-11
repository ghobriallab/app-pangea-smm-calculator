export function Footer() {
  return (
    <footer className="mt-20 py-10 border-t border-slate-200 dark:border-slate-800 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 opacity-50 grayscale">
          <img src="/pangea-logo.png" alt="Pangea Logo" className="h-8 w-8 rounded-sm object-cover" />
          <h2 className="text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase">The Pangea Model</h2>
        </div>
        <p className="text-xs text-slate-500 max-w-xl mx-auto px-4">
          Disclaimer: This calculator is intended for use by healthcare professionals for informational purposes only. Clinical decisions should be based on comprehensive patient evaluations.
        </p>
        <div className="flex gap-6 mt-4">
          <a className="text-xs font-bold text-slate-400 hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="text-xs font-bold text-slate-400 hover:text-primary transition-colors" href="#">Terms of Use</a>
          <a className="text-xs font-bold text-slate-400 hover:text-primary transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}
