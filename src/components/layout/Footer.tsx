export function Footer() {
  return (
    <footer className="mt-20 py-10 border-t border-slate-200 dark:border-slate-800 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 opacity-50 grayscale">
          <img src="/pangea-logo.png" alt="Pangea Logo" className="h-8 w-8 rounded-sm object-cover" />
          <h2 className="text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase">The Pangea Model</h2>
        </div>
        <p className="text-xs text-slate-500 max-w-2xl mx-auto px-4">
          Research and development of the PANGEA Models by Floris Chabrun, PharmD, PhD, Annie Cowan, MD, Federico Ferrari, PhD, Susanna Gentile, PhD, and Daniel Schwartz, PhD.
        </p>
        <p className="text-xs text-slate-500 max-w-2xl mx-auto px-4">
          Leadership provided by Irene Ghobrial, MD and Lorenzo Trippa, PhD.
        </p>
        <p className="text-xs text-slate-500 max-w-2xl mx-auto px-4">
          To learn more about the PANGEA Models, please read our publication in{' '}
          <a className="font-bold text-primary hover:underline" href="https://www.nature.com/nm/" target="_blank" rel="noopener noreferrer">Nature Medicine</a>.
        </p>
        <p className="text-xs text-slate-400 mt-2">
          © 2023 by the Ghobrial Lab | Dana-Farber Cancer Institute | Boston, MA | USA
        </p>
      </div>
    </footer>
  );
}
