import express, { json } from 'express'
import sgMail from '@sendgrid/mail'
import cors from 'cors'
import { SENDGRID_CONFIG } from './utils/config.js'

const app = express()
app.use(cors())

app.use(json())

app.post('/email', (req, res) => {
  try {
    const body = req.body || {}
    const { subject, html } = body
    if (!subject || !html) return res.status(400).json({ error: 'Bad request' })

    const { API_KEY } = SENDGRID_CONFIG

    sgMail.setApiKey(API_KEY)
    const msg = {
      to: 'ignaciovega200301@gmail.com',
      from: 'ignaciovega200301@gmail.com',
      subject,
      html
    }
    return sgMail.send(msg)
      .then(() => {
        return res.status(200).send()
      })
  } catch (error) {
    console.error(error)
    return res.status(502).json({ error: 'Server error' })
  }
})

const PORT = 3000 || process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
