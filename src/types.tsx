export interface User {
    accent_color: number | null
    avatar: string | null
    avatar_decoration_data: { asset: string | null, sku_id: string | null }
    banner: string | null
    banner_color: string | null
    discriminator: string | null
    email: string
    flags: number | null
    global_name: string | null
    id: string
    locale: string | null
    mfa_enabled: boolean
    premium_type: number | null
    public_flags: number | null
    username: string
    verified: boolean
}

export interface Token {
    access_token: string | null
    error: any
    expires_in: string | null
    token_type: "Bearer" | null
}