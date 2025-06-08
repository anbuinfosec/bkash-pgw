import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // Add any middleware logic here if needed
  // For example, rate limiting, authentication, etc.

  // For now, just pass through
  return NextResponse.next()
}

export const config_middleware = {
  matcher: ["/api/create/:path*"],
}
