import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { config } from "@/config"

const createPaymentSchema = z.object({
  amount: z.string().min(1),
  name: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, name } = createPaymentSchema.parse(body)

    // Get token for payment creation
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

    // Create payment
    const baseUrl = config.urls.baseUrl
    const createPaymentResponse = await fetch(config.bkash.createPaymentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: id_token,
        "x-app-key": config.bkash.apiKey,
      },
      body: JSON.stringify({
        mode: "0011",
        payerReference: name,
        callbackURL: `${baseUrl}/callback`,
        amount: amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: `INV-${Date.now()}`,
      }),
    })

    const paymentData = await createPaymentResponse.json()

    if (paymentData && paymentData.bkashURL) {
      return NextResponse.json({
        bkashURL: paymentData.bkashURL,
        paymentID: paymentData.paymentID,
        statusMessage: paymentData.statusMessage,
      })
    } else {
      return NextResponse.json(
        {
          error: "Payment creation failed",
          statusMessage: paymentData.statusMessage || "Unknown error",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Create payment error:", error)

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
