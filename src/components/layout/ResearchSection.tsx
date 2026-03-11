export function ResearchSection() {
  return (
    <section className="bg-white dark:bg-slate-900 py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            Do You Have MGUS or SMM?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Learn more about monoclonal gammopathy of undetermined significance MGUS and asymptomatic multiple myeloma
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* PROMISE Study Card */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <img src="/promise-logo.avif" alt="PROMISE Logo" className="h-10 w-10 rounded-full object-cover" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">PROMISE Study</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The PROMISE Study is a national effort to test people who are at higher risks of MGUS, SMM, and multiple myeloma. The goal of the PROMISE Study is to identify & understand why some people develop them while others do not.
            </p>
            <a href="#" className="text-sm font-bold text-primary hover:underline">
              Learn more at www.promisestudy.org →
            </a>
          </div>

          {/* PCROWD Study Card */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <img src="/PCROWD_R02-01 copy_edited.png" alt="PCROWD Logo" className="h-10 w-10 rounded-full object-cover" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">PCROWD Study</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The PCROWD Study is a national effort to collect data from patients with MGUS or SMM. The goal is to understand why some people develop these conditions & why some patients with MGUS or SMM develop multiple myeloma others do not.
            </p>
            <a href="#" className="text-sm font-bold text-primary hover:underline">
              Learn more at www.pcrowd.org →
            </a>
          </div>
        </div>

        {/* Dana-Farber Logo and Credits */}
        <div className="text-center border-t border-slate-200 dark:border-slate-700 pt-8">
          <div className="flex justify-center mb-4">
            <img src="/dfci-logo.avif" alt="Dana-Farber Cancer Institute" className="h-12" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Research and development of the PANGEA Models by Floris Chabrun, PharmD, PhD, Annie Cowan, MD, Federico Ferrari, PhD, Susanna Gentile, PhD, and Daniel Schwartz, PhD.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Leadership provided by Irene Ghobrial, MD and Lorenzo Trippa, PhD.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
            To learn more about the PANGEA Models, please read our publication in{' '}
            <a className="font-bold text-primary hover:underline" href="https://www.nature.com/nm/" target="_blank" rel="noopener noreferrer">Nature Medicine</a>.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
            © 2026 by the Ghobrial Lab | Dana-Farber Cancer Institute | Boston, MA | USA
          </p>
        </div>
      </div>
    </section>
  );
}
