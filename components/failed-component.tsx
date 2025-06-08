"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { XCircle, RefreshCw, Home, HelpCircle, AlertTriangle, ChevronDown } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const FailedComponent = () => {
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get("message") || "Transaction failed"
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    // Only show toast if there's an error message (real failure, not just visiting page)
    if (searchParams.get("message")) {
      toast.error("Payment failed!", {
        description: errorMessage,
        duration: 5000,
      })
    }
  }, [errorMessage, searchParams])

  const commonErrors = [
    {
      title: "Insufficient Balance",
      description: "Your bKash account doesn't have enough balance to complete this transaction.",
    },
    {
      title: "Network Connectivity",
      description: "Poor internet connection can interrupt the payment process.",
    },
    {
      title: "Transaction Timeout",
      description: "The payment request took too long to process and timed out.",
    },
    {
      title: "Invalid Credentials",
      description: "The PIN or OTP entered was incorrect or invalid.",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">Payment Failed</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your transaction could not be completed</p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium text-red-800 dark:text-red-200">Error Details</span>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-900 dark:text-white">Common reasons for failure</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showHelp ? "rotate-180" : ""}`} />
              </button>
              {showHelp && (
                <div className="px-4 pb-4 space-y-3">
                  {commonErrors.map((error, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                          {error.title}
                        </span>
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{error.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-4 space-y-2">
            <Link
              href="/"
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Link>

            <Link
              href="/docs"
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Home className="h-4 w-4" />
              View Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FailedComponent
