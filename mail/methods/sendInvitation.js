import transporter from '../transporter';

async function sendInvitation(email, url) {
  const options = {
    from: '"Example Team" <from@example.com>',
    to: email,
    subject: 'Invitation',
    text: `Hi there,\nPlease confirm your invitation by this URL: ${url}`,
  };

  await transporter.sendMail(options);
}

export default sendInvitation;
