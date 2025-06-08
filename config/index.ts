export const config = {
  bkash: {
    username: process.env.BKASH_USERNAME || "sandboxTokenizedUser02",
    password: process.env.BKASH_PASSWORD || "sandboxTokenizedUser02@12345",
    apiKey: process.env.BKASH_API_KEY || "4f6o0cjiki2rfm34kfdadl1eqq",
    secretKey: process.env.BKASH_SECRET_KEY || "2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b",
    grantTokenUrl:
      process.env.BKASH_GRANT_TOKEN_URL ||
      "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant",
    createPaymentUrl:
      process.env.BKASH_CREATE_PAYMENT_URL || "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create",
    executePaymentUrl:
      process.env.BKASH_EXECUTE_PAYMENT_URL ||
      "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/execute",
    refundTransactionUrl:
      process.env.BKASH_REFUND_TRANSACTION_URL ||
      "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/payment/refund",
  },
  urls: {
    baseUrl: process.env.NEXT_PUBLIC_URL || "https://bkash-pgw.vercel.app/",
  },
}

export type Config = typeof config
