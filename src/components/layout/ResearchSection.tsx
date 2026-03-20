export function ResearchSection() {
  return (
    <section className="bg-white dark:bg-slate-900 py-8 sm:py-12 md:py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            Do You Have MGUS or SMM?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Learn more about monoclonal gammopathy of undetermined significance MGUS and asymptomatic multiple myeloma
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          {/* PROMISE Study Card */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <img src="/promise-logo.avif" alt="PROMISE Logo" className="h-10 w-10 rounded-full object-cover" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">PROMISE Study</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The PROMISE Study is a national effort to test people who are at higher risks of MGUS, SMM, and multiple myeloma. The goal of the PROMISE Study is to identify & understand why some people develop them while others do not.
            </p>
            <a href="https://www.promisestudy.org" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:underline">
              Learn more at www.promisestudy.org →
            </a>
          </div>

          {/* PCROWD Study Card */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <img src="/PCROWD_R02-01 copy_edited.png" alt="PCROWD Logo" className="h-10 w-10 rounded-full object-cover" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">PCROWD Study</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The PCROWD Study is a national effort to collect data from patients with MGUS or SMM. The goal is to understand why some people develop these conditions & why some patients with MGUS or SMM develop multiple myeloma others do not.
            </p>
            <a href="https://www.pcrowd.org" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:underline">
              Learn more at www.pcrowd.org →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
