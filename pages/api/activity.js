import nodemailer from 'nodemailer'
import { encrypt } from '../../src/utils/crypto'

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.json({ message: 'Method Not Allowed' })
    return
  }

  const { id, title } = req.body

  const encrypted = encrypt(JSON.stringify({ id, title, ts: Date.now() }))

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Activity Support" <noreply@email-confirmation.app.ishakantony.com>', // sender address
    to: 'you@example.com', // list of receivers
    subject: 'Confirmation to Convert Opportunity into Project', // Subject line
    text: `To approve the action of converting opportunity ${title}, visit ${process.env.HOST}/confirm/${encrypted.iv}.${encrypted.content}`, // plain text body
    html: `<b>To approve the action of converting opportunity ${title}, visit <a href="${process.env.HOST}/confirm/${encrypted.iv}.${encrypted.content}" target="_blank">here</a></b>`, // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.statusCode = 200
  res.json({ previewURL: nodemailer.getTestMessageUrl(info) })
}
