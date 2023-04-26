require('dotenv').config()

const config = {
    DATABASE_URL: process.env.DATABASE_URL as string,
    PORT: process.env.PORT || 4000,
    SECRET: process.env.SECRET as string,
    CLIENT_URL: process.env.CLIENT_URL as string
}

export default config