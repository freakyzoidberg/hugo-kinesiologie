const process = require('process')
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = "kinesiologiereims.fr"

const handler = async (event) => {

    try {
	const body = JSON.parse(event.body)
	const client = mailgun.client({username: 'api', key: API_KEY});
	
	const messageData = {
	    from: 'no-reply@kinesiologiereims.fr',
	    'h:Reply-To': body.email,
	    to: 'marielle.legoff.pro@gmail.com',
	    bcc: 'pierre@lacave.me',
	    subject: `Kinesiologie: message de ${body.name}`,
	    text: `${body.text} \n\n\nmail: ${body.email}\ntel: ${body.tel}`
	};
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
