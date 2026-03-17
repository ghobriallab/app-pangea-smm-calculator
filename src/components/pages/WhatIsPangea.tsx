export function WhatIsPangea() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent dark:from-primary/25 dark:via-primary/10 dark:to-transparent z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            What is PANGEA?
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A global collaboration bringing the world together to understand and predict
            progression of early monoclonal gammopathy conditions.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8">
        {/* Origin story */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="material-symbols-outlined text-3xl text-primary">public</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">The Name Behind the Mission</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Long ago, Pangea stood as a single, vast supercontinent — a symbol of everything
            connected, unified, and moving together.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            In that same spirit, we created the PANGEA project to bring the world together by
            combining data from patients across the globe who are living with MGUS, smoldering
            multiple myeloma, or other early monoclonal gammopathy conditions. This global effort
            allows PANGEA to form one clear, unified view of how key blood markers change over
            time, rather than relying on a single test.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            By drawing strength from worldwide collaboration and diverse patient experiences,
            PANGEA helps assess each person's precise risk of progressing to active disease —
            giving patients and doctors a clearer and more confident path forward.
          </p>
        </div>

        {/* Credits */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-3xl text-primary">groups</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">The Team</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center mb-6">
            <img
              src="/dfci-logo.avif"
              alt="Dana-Farber Cancer Institute"
              className="h-10 object-contain"
            />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
            Research and development of the PANGEA Models by{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">Floris Chabrun, PharmD, PhD</span>,{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">Annie Cowan, MD</span>,{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">Federico Ferrari, PhD</span>,{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">Susanna Gentile, PhD</span>, and{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">Daniel Schwartz, PhD</span>.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
            Leadership provided by{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">Irene Ghobrial, MD</span> and{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">Lorenzo Trippa, PhD</span>.
          </p>
          <a
            href="https://www.nature.com/nm/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            <span className="material-symbols-outlined text-base">open_in_new</span>
            Read our publication in Nature Medicine
          </a>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-2xl text-amber-600 dark:text-amber-400">info</span>
            <h2 className="text-lg font-black text-amber-900 dark:text-amber-200">Disclaimer</h2>
          </div>
          <div className="space-y-4 text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            <p>
              User of the PANGEA Calculator on this website ("Calculator") acknowledges that the
              Calculator is a research tool that has not been reviewed or approved by the United
              States Food and Drug Administration, the European Medicines Agency, or by any other
              agency and Calculator is still evolving and that it is being supplied "as is,"
              without any accompanying services.
            </p>
            <p>
              The Dana-Farber Cancer Institute, Inc. ("Hospital") may, from time to time, make
              changes to the Calculator without any obligation to inform any of the users of the
              Calculator. The Calculator is only a tool to be used for analytical purposes and it
              is not intended to be a substitute for professional medical advice or to render a
              medical diagnosis or prognosis.
            </p>
            <p>
              Seek the advice of your physician or qualified health care provider if you have
              questions about test results or any medical condition. Hospital shall have no
              liability to any patient or to any user of this Calculator with respect to the use
              of the Calculator and/or any results from this Calculator, or any interpretation
              of the results thereof, by any of the users of this Calculator. This is intended
              for non-commercial use only. For commercial use or license, please contact{' '}
              <span className="font-semibold">Raymond Walsh</span>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
