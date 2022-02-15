const process = require('process')
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = "kinesiologiereims.fr"

const handler = async (event) => {
  const body = JSON.parse(event.body)
  const client = mailgun.client({username: 'api', key: API_KEY});

  const messageData = {
    from: 'kinesiologie@kinesiologiereims.fr',
    to: 'pierre@lacave.me',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
  };
  
  try {
    await client.messages.create(DOMAIN, messageData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
    return { statusCode: 200, body: '' }
  } catch (error) {
    return { statusCode: 500, body: error.message }
  }
}

module.exports = { handler }
