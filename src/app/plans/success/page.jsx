import { createSubcription } from '@/lib/actions/subscriptions'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const subInfo = {
      email: customerEmail,
      planId: metadata?.planId
    }

    const result = await createSubcription(subInfo)
    console.log('subsInfo', result)

    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 text-center">
          
          {/* Success Badge */}
          <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-50 dark:ring-emerald-900/20">
            <svg 
              className="w-8 h-8 text-emerald-600 dark:text-emerald-400" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Subscription Confirmed!
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            We appreciate your business! Your account has been upgraded and is ready to use.
          </p>

          {/* Email Notice Box */}
          <div className="mt-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800 text-left">
            <div className="flex items-start space-x-3">
              <svg 
                className="w-5 h-5 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <div className="text-xs sm:text-sm">
                <span className="text-slate-500 dark:text-slate-400 block font-medium">Confirmation sent to</span>
                <span className="text-slate-900 dark:text-slate-100 font-semibold break-all">{customerEmail}</span>
              </div>
            </div>
          </div>

          {/* Dashboard Button */}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex w-full justify-center items-center px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-sm transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 focus:ring-offset-2"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Support Link */}
          <p className="mt-6 text-xs text-slate-500 dark:text-slate-500">
            Have questions? Contact us at{' '}
            <a 
              href="mailto:orders@example.com" 
              className="font-medium text-slate-700 dark:text-slate-300 underline hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              orders@example.com
            </a>
          </p>

        </div>
      </main>
    )
  }
}