import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { config } from "@/config"

const callbackSchema = z.object({
  paymentID: z.string(),
  id_token: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentID, id_token } = callbackSchema.parse(body)

    // Execute payment
    const response = await fetch(config.bkash.executePaymentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: id_token,
        "x-app-key": config.bkash.apiKey,
      },
      body: JSON.stringify({
        paymentID,
      }),
    })

    const data = await response.json()

    if (data && data.statusCode === "0000") {
      return NextResponse.json({
        success: true,
        transactionStatus: data.transactionStatus,
        trxID: data.trxID,
        statusMessage: data.statusMessage,
      })
    } else {
      return NextResponse.json({
        success: false,
        statusMessage: data.statusMessage || "Payment execution failed",
      })
    }
  } catch (error) {
    console.error("Callback error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", issues: error.issues }, { status: 422 })
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
