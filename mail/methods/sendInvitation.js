const nodemailer = require('./nodemailer');

async function sendInvitation(email, name, url) {
  const options = {
    from: '"Example Team" <from@example.com>',
    to: email,
    subject: 'Invitation',
    text: `Hi ${name},\nPlease confirm your invitation by this URL: ${url}`,
  };

  await nodemailer.sendMail(options);
}

export default sendInvitation;
