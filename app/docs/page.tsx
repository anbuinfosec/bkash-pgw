"use client"

import {
  BookOpen,
  Globe,
  Key,
  CreditCard,
  RefreshCw,
  Search,
  AlertTriangle,
  CheckCircle,
  User,
  Phone,
  Lock,
  FileText,
  ExternalLink,
  CodeIcon,
  ArrowRight,
  CheckSquare,
  XCircle,
  Copy,
} from "lucide-react"
import { toast } from "sonner"

export default function DocsPage() {
  const testCredentials = [
    { type: "Regular Customer", number: "01929918378", pin: "12121", otp: "123456" },
    { type: "Insufficient Balance", number: "01823074817", pin: "12121", otp: "123456" },
    { type: "Debit Block", number: "01823074818", pin: "12121", otp: "123456" },
    { type: "Merchant", number: "01619777282", pin: "12121", otp: "123456" },
  ]

  const regularWallets = [
    { number: "01770618575", status: "Active" },
    { number: "01929918378", status: "Active" },
    { number: "01770618576", status: "Active" },
    { number: "01877722345", status: "Active" },
    { number: "01619777282", status: "Active" },
    { number: "01619777283", status: "Active" },
  ]

  const failedWallets = [
    { number: "01823074817", reason: "Insufficient Balance" },
    { number: "01823074818", reason: "Debit Block" },
  ]

  const apis = [
    { name: "Grant Token", url: "https://developer.bka.sh/docs/grant-token-1", icon: Key },
    { name: "Refresh Token", url: "https://developer.bka.sh/docs/refresh-token-1", icon: RefreshCw },
    { name: "Create Payment", url: "https://developer.bka.sh/docs/create-payment-2", icon: CreditCard },
    { name: "Execute Payment", url: "https://developer.bka.sh/docs/execute-payment-2", icon: CheckCircle },
    { name: "Query Payment", url: "https://developer.bka.sh/docs/query-payment-1", icon: Search },
    { name: "Search Transaction", url: "https://developer.bka.sh/docs/search-transaction-1", icon: Search },
    { name: "Refund Transaction", url: "https://developer.bka.sh/docs/refund-transaction-1", icon: RefreshCw },
  ]

  const milestones = [
    {
      step: "Step 1: Integration Initiation",
      task: "Merchant is offered Developer Portal, Merchant Integration Portal, Demo Link and Sandbox credentials for testing",
    },
    {
      step: "Step 2: Merchant system readiness with bKash PGW Sandbox",
      task: "a. Merchant confirms development readiness using sandbox\nb. Merchant shares user journey flow (if required)\nc. Solution document finalization (if required)",
    },
    {
      step: "Step 3: Sandbox result validation",
      task: "Merchant Validate Create and Execute responses in Merchant Integration portal",
    },
    {
      step: "Step 4: Production info collection & Production onboarding",
      task: "merchant is provided with live credentials in the Merchant Integration Portal and is onboarded for production.",
    },
    {
      step: "Step 5: Merchant system readiness with bKash PGW Production",
      task: "Merchant confirms system readiness using Production credentials",
    },
    {
      step: "Step 6: UAT & Go Live",
      task: "a. Technical UAT : Checking merchant backend security mechanism\nb. Business UAT : Checking user journey with Production credentials.\nc. Merchant makes the payment system available for all customers.",
    },
  ]

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">bKash Payment Gateway Documentation</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 ml-8">
          Complete guide for bKash Checkout and Refund integration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="sticky top-20">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contents</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#test-credentials"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <User className="h-4 w-4" />
                      Test Credentials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#getting-started"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <BookOpen className="h-4 w-4" />
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a
                      href="#important-links"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Globe className="h-4 w-4" />
                      Important Links
                    </a>
                  </li>
                  <li>
                    <a
                      href="#required-apis"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Key className="h-4 w-4" />
                      Required APIs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#sandbox-wallets"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <CreditCard className="h-4 w-4" />
                      Sandbox Wallets
                    </a>
                  </li>
                  <li>
                    <a
                      href="#milestones"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <CheckSquare className="h-4 w-4" />
                      Integration Milestones
                    </a>
                  </li>
                  <li>
                    <a
                      href="#token-management"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Token Management
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <a
                href="https://developer.bka.sh/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Official bKash Docs
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          {/* Test Credentials Section */}
          <section id="test-credentials">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Test Credentials</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testCredentials.map((cred, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-medium mb-2 text-gray-900 dark:text-white">{cred.type}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Number: </span>
                            <code className="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                              {cred.number}
                            </code>
                          </div>
                          <button
                            onClick={() => copyToClipboard(cred.number, "Phone Number")}
                            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800 rounded transition-colors"
                            title="Copy phone number"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">PIN: </span>
                            <code className="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{cred.pin}</code>
                          </div>
                          <button
                            onClick={() => copyToClipboard(cred.pin, "PIN")}
                            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800 rounded transition-colors"
                            title="Copy PIN"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Key className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">OTP: </span>
                            <code className="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{cred.otp}</code>
                          </div>
                          <button
                            onClick={() => copyToClipboard(cred.otp, "OTP")}
                            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800 rounded transition-colors"
                            title="Copy OTP"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section id="getting-started">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Getting Started</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Please complete the signup at Merchant Integration Portal to proceed with the next steps.
                </p>
                <a
                  href="https://pgw-integration.bkash.com/sign-up"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Merchant Integration Portal Signup
                  <ExternalLink className="h-4 w-4" />
                </a>

                <hr className="my-6 border-gray-200 dark:border-gray-600" />

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                    <CodeIcon className="h-4 w-4 text-blue-600" />
                    Quick Integration Steps
                  </h3>
                  <ol className="space-y-2 ml-6 list-decimal text-sm text-gray-600 dark:text-gray-400">
                    <li>Sign up for a Merchant account</li>
                    <li>Obtain API credentials from the Merchant Portal</li>
                    <li>Implement the required APIs in your application</li>
                    <li>Test your integration with sandbox credentials</li>
                    <li>Submit for validation and go live</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Important Links */}
          <section id="important-links">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Important Links</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Developer Portal</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Detail Product, workflow, API information
                  </p>
                  <a
                    href="https://developer.bka.sh/docs/checkout-url-process-overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                  >
                    Developer Documentation →
                  </a>
                </div>

                <hr className="border-gray-200 dark:border-gray-600" />

                <div>
                  <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Checkout Demo</h3>
                  <a
                    href="https://merchantdemo.sandbox.bka.sh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                  >
                    Sandbox Demo →
                  </a>
                </div>

                <hr className="border-gray-200 dark:border-gray-600" />

                <div>
                  <h3 className="font-medium mb-2 text-gray-900 dark:text-white">GitHub Repository</h3>
                  <a
                    href="https://github.com/bKash-HSL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                  >
                    Sample Code Reference →
                  </a>
                </div>

                <hr className="border-gray-200 dark:border-gray-600" />

                <div>
                  <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Error Codes</h3>
                  <a
                    href="https://developer.bka.sh/docs/error-codes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                  >
                    Payment Gateway Error Codes →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Required APIs */}
          <section id="required-apis">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Required APIs</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {apis.map((api, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <api.icon className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-gray-900 dark:text-white">{api.name}</span>
                      </div>
                      <a
                        href={api.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Documentation →
                      </a>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="font-medium text-yellow-800 dark:text-yellow-200">Important Note</span>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    API timeout of 30 seconds should be set for all the APIs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sandbox Credentials */}
          <section id="sandbox-wallets">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sandbox Wallet Numbers</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-medium mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Regular Active Customer Wallets
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {regularWallets.map((wallet, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded-lg p-2"
                      >
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          {wallet.number}
                        </span>
                        <button
                          onClick={() => copyToClipboard(wallet.number, "Wallet Number")}
                          className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 hover:bg-green-100 dark:hover:bg-green-800 rounded transition-colors"
                          title="Copy wallet number"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-200 dark:border-gray-600" />

                <div>
                  <h3 className="font-medium mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    Failed Case Wallets
                  </h3>
                  <div className="space-y-2">
                    {failedWallets.map((wallet, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                            {wallet.number}
                          </span>
                          <span className="text-sm text-red-600 dark:text-red-400">{wallet.reason}</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(wallet.number, "Failed Wallet Number")}
                          className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-100 dark:hover:bg-red-800 rounded transition-colors"
                          title="Copy wallet number"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-200 dark:border-gray-600" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <p className="font-medium text-blue-600 dark:text-blue-400">PIN</p>
                        <code className="text-lg bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded">12121</code>
                      </div>
                      <button
                        onClick={() => copyToClipboard("12121", "PIN")}
                        className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800 rounded transition-colors"
                        title="Copy PIN"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <p className="font-medium text-purple-600 dark:text-purple-400">OTP</p>
                        <code className="text-lg bg-purple-100 dark:bg-purple-800 px-3 py-1 rounded">123456</code>
                      </div>
                      <button
                        onClick={() => copyToClipboard("123456", "OTP")}
                        className="p-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-800 rounded transition-colors"
                        title="Copy OTP"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Integration Milestones */}
          <section id="milestones">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Integration Milestones</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className="relative pl-8 pb-8 border-l-2 border-blue-200 dark:border-blue-800 last:border-l-0"
                    >
                      <div className="absolute -left-[9px] top-0 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-xs text-white font-bold">{index + 1}</span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h3 className="font-medium text-blue-600 dark:text-blue-400 mb-2">{milestone.step}</h3>
                        <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                          {milestone.task}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Token Management */}
          <section id="token-management">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Token Management</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Token Lifecycle</h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="font-medium text-green-600 dark:text-green-400">ID Token</span>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400">Valid for 1 hour</p>
                    </div>

                    <div className="flex justify-center">
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-blue-600 dark:text-blue-400">Refresh Token</span>
                      </div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Valid for 28 days</p>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200 dark:border-gray-600" />

                <div>
                  <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Important Guidelines</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Reuse ID token for 1 hour for any subsequent API request
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Show "payment failed" message for failure/cancel status
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Execute API should only be called for success status
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        StatusCode 0000 indicates successful execute response
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Query payment should only be used if execute API fails
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
