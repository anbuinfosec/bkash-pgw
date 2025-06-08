import SuccessComponent from "@/components/success-component"
import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Success | Mohammad Alamin",
  description: "Practice Bkash payment with sandbox",
}

const SuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <SuccessComponent />
    </Suspense>
  )
}

export default SuccessPage
