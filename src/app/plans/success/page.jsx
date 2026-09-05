export default function SuccessPage({
  customerEmail = "customer@example.com",
  formattedAmount = "$49.00",
  supportEmail = "orders@example.com",
  homeUrl = "/"
}) {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-emerald-600 px-6 py-8 sm:px-10 text-center text-white">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/30 mb-4 ring-8 ring-emerald-500/20">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Payment Successful!
          </h1>
          <p className="mt-2 text-emerald-100 text-sm sm:text-base">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Details Section */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">Receipt Email</span>
              <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-[260px]">
                {customerEmail}
              </span>
            </div>

            {formattedAmount && (
              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-medium">Total Paid</span>
                <span className="text-slate-900 font-bold text-base">
                  {formattedAmount}
                </span>
              </div>
            )}
          </div>

          <p className="text-sm text-slate-600 leading-relaxed text-center">
            A confirmation receipt has been sent to{' '}
            <span className="font-semibold text-slate-800">{customerEmail}</span>. 
            If you have any questions or need support, please contact us at{' '}
            <a
              href={`mailto:${supportEmail}`}
              className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-2 transition-colors"
            >
              {supportEmail}
            </a>.
          </p>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={homeUrl}
              className="w-full inline-flex justify-center items-center px-5 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all shadow-sm"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}