const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = {
    sendgridMail: async (to, verificationCode) => {
        const msg = {
            to: to, // Change to your recipient
            from: 'pedropelicano@koolabah.com', // Change to your verified sender
            subject: 'You got a job referral from front-door.xyz',
            text: `Hi you have a referral pending confirmation at front-door.xyz`,
            html: `<h1>Hi you have a referral pending confirmation at front-door.xyz</h1><div>please navigate to <a href="https://goerli.front-door.xyz#${refId};${to}">front-door.xyz to confirm your referral!</a> </div>`,
        }
        try {
            return await sgMail.send(msg)
        }
        catch (err) {
            return err;
        }
    }
}