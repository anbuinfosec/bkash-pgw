import { config } from "@/config"

interface TokenData {
  id_token: string
  refresh_token: string
  expires_at: number
  refresh_expires_at: number
}

class TokenManager {
  private static instance: TokenManager
  private tokenData: TokenData | null = null

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager()
    }
    return TokenManager.instance
  }

  async getValidToken(): Promise<string> {
    // Check if we have a valid token
    if (this.tokenData && this.isTokenValid()) {
      return this.tokenData.id_token
    }

    // Check if we can refresh the token
    if (this.tokenData && this.isRefreshTokenValid()) {
      return await this.refreshToken()
    }

    // Get new tokens
    return await this.grantNewToken()
  }

  private isTokenValid(): boolean {
    if (!this.tokenData) return false
    return Date.now() < this.tokenData.expires_at
  }

  private isRefreshTokenValid(): boolean {
    if (!this.tokenData) return false
    return Date.now() < this.tokenData.refresh_expires_at
  }

  private async grantNewToken(): Promise<string> {
    const response = await fetch(config.bkash.grantTokenUrl, {
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

    if (!response.ok) {
      throw new Error("Failed to grant token")
    }

    const data = await response.json()

    this.tokenData = {
      id_token: data.id_token,
      refresh_token: data.refresh_token,
      expires_at: Date.now() + 60 * 60 * 1000, // 1 hour
      refresh_expires_at: Date.now() + 28 * 24 * 60 * 60 * 1000, // 28 days
    }

    return data.id_token
  }

  private async refreshToken(): Promise<string> {
    if (!this.tokenData) {
      throw new Error("No refresh token available")
    }

    const response = await fetch(config.bkash.refreshTokenUrl, {
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
        refresh_token: this.tokenData.refresh_token,
      }),
    })

    if (!response.ok) {
      // If refresh fails, get new token
      return await this.grantNewToken()
    }

    const data = await response.json()

    this.tokenData.id_token = data.id_token
    this.tokenData.expires_at = Date.now() + 60 * 60 * 1000 // 1 hour

    return data.id_token
  }
}

export default TokenManager
