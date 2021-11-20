import transporter from '../transporter';

async function sendResetPasswordUrl(email, url) {
  //todo update email
  const options = {
    from: '"Easy Land" team <from@example.com>',
    to: email,
    subject: 'Reset Password',
    text: `Hi username,\nYou can reset your password by the URL: ${url}`,
  };

  await transporter.sendMail(options);
}

export default sendResetPasswordUrl;
