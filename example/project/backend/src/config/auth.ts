// Authentication related configuration
export const authConfig = {
  // JWT token related configuration
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'access_default_secret_change_this',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_default_secret_change_this',
    accessExpiresIn: '15m', // 15 minutes
    refreshExpiresIn: '7d'  // 7 days
  },
  
  // Cookie options
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only send cookies over HTTPS in production
    sameSite: 'strict' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
  }
}; 