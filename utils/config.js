import { configDotenv } from 'dotenv'
configDotenv()

export const SENDGRID_CONFIG = {
  API_KEY: process.env.SENDGRID_API_KEY
}
