module.exports = {
    accessTokenSecret: process.env.JWT_TOKEN_SECRET || 'BusinessManagement@Server#$',
    accessTokenLife: process.env.JWT_TOKEN_LIFE || '10m',
    refreshTokenSize: 100,
}
