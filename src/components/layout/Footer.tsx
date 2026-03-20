export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 py-8 sm:py-10 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4">
          <img src="/dfci-logo.avif" alt="Dana-Farber Cancer Institute" className="h-12" />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          Research and development of the PANGEA Models by{' '}
          <a href="https://www.linkedin.com/in/anniencowan/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Floris Chabrun, PharmD, PhD</a>,{' '}
          <a href="https://www.linkedin.com/in/anniencowan/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Annie Cowan, MD</a>,{' '}
          <a href="https://www.linkedin.com/in/federico-ferrari-a35134aa/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Federico Ferrari, PhD</a>,{' '}
          <a href="https://www.linkedin.com/in/federico-ferrari-a35134aa/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Susanna Gentile, PhD</a>, and{' '}
          <a href="https://www.linkedin.com/in/federico-ferrari-a35134aa/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Daniel Schwartz, PhD</a>.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          Leadership provided by{' '}
          <a href="https://www.dfhcc.harvard.edu/insider/member-detail/member/irene-m-ghobrial-md/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Irene Ghobrial, MD</a> and{' '}
          <a href="https://www.dfhcc.harvard.edu/insider/member-detail/member/lorenzo-trippa-phd/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Lorenzo Trippa, PhD</a>.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-4">
          To learn more about the PANGEA Models, please read our publication in{' '}
          <a className="font-bold text-primary hover:underline" href="https://www.nature.com/articles/s41591-026-04304-x" target="_blank" rel="noopener noreferrer">Nature Medicine</a>.
        </p>
        <div className="flex items-center justify-center gap-2 opacity-50 grayscale mb-3">
          <img src="/pangea-logo.png" alt="Pangea Logo" className="h-8 w-8 rounded-sm object-cover" />
          <h2 className="text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase">The Pangea Model</h2>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
          © 2026 by the Ghobrial Lab | Dana-Farber Cancer Institute | Boston, MA | USA
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Developed by{' '}
          <a href="https://lpantano.github.io/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Lorena Pantano, PhD</a>
        </p>
      </div>
    </footer>
  );
}
