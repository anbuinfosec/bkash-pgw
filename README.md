# bKash Payment Gateway Integration with Next.js

![bKash Payment Gateway](public/bkash.png)

A complete solution for integrating bKash payment gateway with Next.js applications. This project provides a seamless way to accept payments through bKash in your web applications.

## 🚀 Features

- ✅ Complete bKash payment flow integration
- ✅ Sandbox testing environment
- ✅ Dark/Light theme support
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Success and failure handling
- ✅ Comprehensive documentation
- ✅ Developer tools and GitHub integration

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **next-themes** - Theme management
- **Sonner** - Toast notifications
- **Zod** - Schema validation
- **Lucide React** - Icons

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/anbuinfosec/bkash-pgw.git
cd bkash-pgw
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables or add the data on `config/index.tx`:

```env
# bKash API Credentials
BKASH_USERNAME=sandboxTokenizedUser02
BKASH_PASSWORD=sandboxTokenizedUser02@12345
BKASH_API_KEY=4f6o0cjiki2rfm34kfdadl1eqq
BKASH_SECRET_KEY=2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b

# bKash API URLs
BKASH_GRANT_TOKEN_URL=https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant
BKASH_CREATE_PAYMENT_URL=https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create
BKASH_EXECUTE_PAYMENT_URL=https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/execute
BKASH_REFUND_TRANSACTION_URL=https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/payment/refund

# Application URL
NEXT_PUBLIC_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `BKASH_USERNAME` | bKash API username |
| `BKASH_PASSWORD` | bKash API password |
| `BKASH_API_KEY` | bKash API key |
| `BKASH_SECRET_KEY` | bKash API secret key |
| `BKASH_GRANT_TOKEN_URL` | URL for granting tokens |
| `BKASH_CREATE_PAYMENT_URL` | URL for creating payments |
| `BKASH_EXECUTE_PAYMENT_URL` | URL for executing payments |
| `BKASH_REFUND_TRANSACTION_URL` | URL for refunding transactions |
| `NEXT_PUBLIC_URL` | Your application's public URL |

## 📱 Usage

### Payment Flow

1. User enters amount and name on the home page
2. User clicks "Pay with bKash"
3. User is redirected to bKash payment page
4. User completes payment
5. User is redirected back to the application
6. Payment is verified and success/failure page is shown

### Sandbox Testing

Use the following credentials for testing:

| Type | Number | PIN | OTP |
|------|--------|-----|-----|
| Regular Customer | 01929918378 | 12121 | 123456 |
| Insufficient Balance | 01823074817 | 12121 | 123456 |
| Debit Block | 01823074818 | 12121 | 123456 |
| Merchant | 01619777282 | 12121 | 123456 |

## 🔄 API Endpoints

### Create Payment

```
POST /api/create
```

**Request Body:**
```json
{
  "amount": "100",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "bkashURL": "https://sandbox.bka.sh/checkout/payment/...",
  "paymentID": "TR0001",
  "statusMessage": "Successful"
}
```

### Execute Payment

```
POST /api/callback
```

**Request Body:**
```json
{
  "paymentID": "TR0001",
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "transactionStatus": "Completed",
  "trxID": "ABC123XYZ",
  "statusMessage": "Successful"
}
```

### Refund Transaction

```
POST /api/refund
```

**Request Body:**
```json
{
  "paymentID": "TR0001",
  "amount": "100",
  "trxID": "ABC123XYZ",
  "reason": "Customer requested refund"
}
```

**Response:**
```json
{
  "success": true,
  "refundTrxID": "REF123XYZ",
  "statusMessage": "Refund Successful"
}
```

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy this application is to use the [Vercel Platform](https://vercel.com).

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Set the environment variables in the Vercel dashboard
4. Deploy

### Build for Production

To build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

## 📚 Documentation

For more detailed information about the bKash Payment Gateway API, visit the [official documentation](https://developer.bka.sh/docs).

## 🧪 Testing

To test the payment flow:

1. Go to the home page
2. Enter an amount (e.g., 100)
3. Enter a name
4. Click "Pay with bKash"
5. Use the sandbox credentials provided above
6. Complete the payment flow
7. Verify the success/failure page

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Mohammad Alamin** - [@anbuinfosec](https://github.com/anbuinfosec)

## 🙏 Acknowledgments

- [bKash Developer Portal](https://developer.bka.sh)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
