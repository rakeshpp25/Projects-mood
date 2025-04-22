import express from 'express'
import { transporter } from '../middleware/emailConfig.js'
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router()

router.post('/', async (req, res) => {
  const { name, email, message } = req.body

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // appears from user
      to: process.env.EMAIL_ADDRESS, // your Gmail
      subject: 'New Contact Message from MOOD',
      html: `
        <h3>New message from MOOD</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
      replyTo: email
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error("Email failed:", err)
    res.status(500).json({ success: false })
  }
})

export const getInTouch = router;
