import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { config } from "@/config"

const refundSchema = z.object({
  paymentID: z.string(),
  amount: z.string(),
  trxID: z.string(),
  sku: z.string().optional(),
  reason: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentID, amount, trxID, sku, reason } = refundSchema.parse(body)

    // Get token for refund
    const tokenResponse = await fetch(config.bkash.grantTokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        username: config.bkash.username,
        password: config.bkash.password,
      },
      body: JSON.stringify({
        app_key: config.bkash.apiKey,
        app_secret: config.bkash.secretKey,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error("Failed to get authentication token")
    }

    const tokenData = await tokenResponse.json()
    const id_token = tokenData.id_token

    // Process refund
    const response = await fetch(config.bkash.refundTransactionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: id_token,
        "x-app-key": config.bkash.apiKey,
      },
      body: JSON.stringify({
        paymentID,
        amount,
        trxID,
        sku: sku || "payment",
        reason: reason || "Product return",
      }),
    })

    const data = await response.json()

    if (data && data.statusCode === "0000") {
      return NextResponse.json({
        success: true,
        refundTrxID: data.refundTrxID,
        statusMessage: data.statusMessage,
      })
    } else {
      return NextResponse.json({
        success: false,
        statusMessage: data.statusMessage || "Refund failed",
      })
    }
  } catch (error) {
    console.error("Refund error:", error)

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
