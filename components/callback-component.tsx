"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

const CallBackComponent = () => {
  const searchParams = useSearchParams()
  const paymentID = searchParams.get("paymentID")
  const status = searchParams.get("status")

  useEffect(() => {
    const handleCallback = async () => {
      // Handle cancel or failure status immediately
      if (status === "cancel") {
        toast.error("Payment cancelled", {
          description: "You cancelled the payment process.",
          duration: 3000,
        })
        setTimeout(() => {
          window.location.href = `/failed?message=${encodeURIComponent("Payment was cancelled by user")}`
        }, 1000)
        return
      }

      if (status === "failure") {
        toast.error("Payment failed", {
          description: "The payment could not be processed.",
          duration: 3000,
        })
        setTimeout(() => {
          window.location.href = `/failed?message=${encodeURIComponent("Payment processing failed")}`
        }, 1000)
        return
      }

      // Handle success status
      if (status === "success" && paymentID) {
        toast.loading("Verifying payment...", { id: "verify-payment" })

        try {
          // For sandbox, we'll simulate a successful verification
          // In production, you would call your execute payment API
          await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call

          toast.dismiss("verify-payment")
          toast.success("Payment verified!", {
            description: "Your transaction has been confirmed.",
          })

          // Get amount from URL or use default
          const amount = searchParams.get("amount") || "100"

          setTimeout(() => {
            window.location.href = `/success?success=true&transactionId=${paymentID}&amount=${amount}`
          }, 1000)
        } catch (error) {
          toast.dismiss("verify-payment")
          toast.error("Verification failed", {
            description: "Payment verification failed",
          })
          setTimeout(() => {
            window.location.href = `/failed?message=${encodeURIComponent("Payment verification failed")}`
          }, 1000)
        }
      } else {
        // No valid status or paymentID
        toast.error("Invalid callback", {
          description: "Invalid payment callback received.",
        })
        setTimeout(() => {
          window.location.href = `/failed?message=${encodeURIComponent("Invalid payment callback")}`
        }, 1000)
      }
    }

    // Only run if we have search params
    if (searchParams.toString()) {
      handleCallback()
    }
  }, [paymentID, status, searchParams])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-gray-50 dark:to-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Processing your payment</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
          Please wait while we verify your transaction. This may take a few moments.
        </p>
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-md">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <strong>Transaction ID:</strong> {paymentID || "Processing..."}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <strong>Status:</strong> {status || "Pending"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CallBackComponent
