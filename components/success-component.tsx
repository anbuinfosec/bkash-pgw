"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { CheckCircle, Download, Home, Share2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const SuccessComponent = () => {
  const searchParams = useSearchParams()
  const transactionId = searchParams.get("transactionId") || `TXN-${Date.now()}`
  const amount = searchParams.get("amount") || "100"
  const success = searchParams.get("success")

  useEffect(() => {
    // Only show toast if this is a real success (not just visiting the page)
    if (success === "true") {
      toast.success("Payment successful!", {
        description: `Your transaction of ৳${amount} has been completed.`,
        duration: 5000,
      })
    }
  }, [amount, success])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "bKash Payment Successful",
          text: `I've successfully completed a payment of ৳${amount} with transaction ID: ${transactionId}`,
          url: window.location.href,
        })
        toast.success("Shared successfully!")
      } catch (error) {
        toast.error("Sharing failed", {
          description: "Could not share the transaction details.",
        })
      }
    } else {
      toast.error("Sharing not supported", {
        description: "Your browser doesn't support the Web Share API.",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">Payment Successful!</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your transaction has been completed</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Transaction ID</span>
                <span className="text-sm font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                  {transactionId}
                </span>
              </div>

              <hr className="border-gray-200 dark:border-gray-600" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Amount</span>
                <span className="font-semibold text-lg text-gray-900 dark:text-white">৳ {amount}</span>
              </div>

              <hr className="border-gray-200 dark:border-gray-600" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  Completed
                </span>
              </div>

              <hr className="border-gray-200 dark:border-gray-600" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Date</span>
                <span className="text-sm text-gray-900 dark:text-white">{new Date().toLocaleDateString()}</span>
              </div>

              <hr className="border-gray-200 dark:border-gray-600" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Time</span>
                <span className="text-sm text-gray-900 dark:text-white">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 space-y-2">
            <Link
              href="/"
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Home className="h-4 w-4" />
              Make Another Payment
            </Link>

            <div className="flex gap-2">
              <button
                onClick={() => toast.info("Receipt download", { description: "This feature is coming soon!" })}
                className="flex-1 flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="h-4 w-4" />
                Receipt
              </button>
              <button
                onClick={handleShare}
                className="flex-1 flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessComponent
