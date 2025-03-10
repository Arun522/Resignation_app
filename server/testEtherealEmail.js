// testEtherealEmail.js
const nodemailer = require('nodemailer');


nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error('Failed to create a testing account', err);
    return;
  }

  console.log('Ethereal test account created:');
  console.log(`User: ${account.user}`);
  console.log(`Pass: ${account.pass}`);
  console.log('SMTP details:', account.smtp);


  const transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port, 
    secure: account.smtp.secure, 
    auth: {
      user: account.user, 
      pass: account.pass, 
    },
  });

  // Set up email options
  const mailOptions = {
    from: '"Example App" <no-reply@example.com>',
    to: 'recipient@example.com', 
    subject: 'Test Ethereal Email',
    text: 'Hello, this is a test email sent using Ethereal!',
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return;
    }
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
   
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  });
});
