require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'Your Secret Key',
    mongoUri: process.env.MONGODB_URI || 'MongoDB Atlas URL'
}

export default config