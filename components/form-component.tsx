"use client"

import { useSearchParams } from "next/navigation"
import { type FormEvent, useEffect, useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import { CreditCard, User, DollarSign, Copy } from "lucide-react"

const FormComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const message = searchParams.get("message")

  useEffect(() => {
    if (message === "cancel" || message === "failure") {
      toast.error("Payment was not successful", {
        description: "Please try again with a different amount or payment method.",
      })
    }
  }, [message])

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} copied!`, {
        description: `${text} has been copied to your clipboard.`,
      })
    } catch (err) {
      toast.error("Failed to copy", {
        description: "Please copy the text manually.",
      })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const amount = formData.get("amount") as string

    if (!name || !amount) {
      return toast.error("Missing required fields", {
        description: "Please fill in all required fields to continue.",
      })
    }

    setIsLoading(true)
    toast.loading("Processing payment request...", { id: "payment-process" })

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          name,
        }),
      })

      if (!response?.ok) {
        const errorData = await response.json()
        toast.dismiss("payment-process")
        toast.error("Payment request failed", {
          description: errorData.statusMessage || "Please refresh the page and try again.",
        })
        setIsLoading(false)
        return
      }

      const session = await response.json()
      if (session?.bkashURL) {
        toast.dismiss("payment-process")
        toast.success("Redirecting to bKash", {
          description: "You'll be redirected to complete your payment.",
        })
        setTimeout(() => {
          window.location.href = session.bkashURL
        }, 1000)
      } else {
        toast.dismiss("payment-process")
        toast.error("Invalid response", {
          description: "Please try again or contact support.",
        })
        setIsLoading(false)
      }
    } catch (error) {
      toast.dismiss("payment-process")
      toast.error("Something went wrong", {
        description: "Please try again or contact support if the issue persists.",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex flex-col items-center mb-6">
              <Image src="/bkash.png" alt="bKash Integration" width={60} height={60} className="rounded-full mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">bKash Payment</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Secure payment gateway integration</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  Sandbox
                </span>
                <span className="text-sm font-medium text-green-800 dark:text-green-200">Test Credentials</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-green-700 dark:text-green-300">
                    <strong>Number:</strong> 01929918378
                  </div>
                  <button
                    onClick={() => copyToClipboard("01929918378", "Phone Number")}
                    className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 hover:bg-green-100 dark:hover:bg-green-800 rounded transition-colors"
                    title="Copy phone number"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-green-700 dark:text-green-300">
                    <strong>OTP:</strong> 123456
                  </div>
                  <button
                    onClick={() => copyToClipboard("123456", "OTP")}
                    className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 hover:bg-green-100 dark:hover:bg-green-800 rounded transition-colors"
                    title="Copy OTP"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-green-700 dark:text-green-300">
                    <strong>PIN:</strong> 12121
                  </div>
                  <button
                    onClick={() => copyToClipboard("12121", "PIN")}
                    className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 hover:bg-green-100 dark:hover:bg-green-800 rounded transition-colors"
                    title="Copy PIN"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount (BDT)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    min={1}
                    max={4999}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <CreditCard className="h-4 w-4" />
                )}
                {isLoading ? "Processing..." : "Pay with bKash"}
              </button>
            </form>
          </div>

          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <div className="text-center">
              <a
                href="https://github.com/anbuinfosec/bkash-pgw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                View source code →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormComponent
