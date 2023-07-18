const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = {
    sendgridMail: async (to, refId) => {
        const msg = {
            to: to, // Change to your recipient
            from: 'pedropelicano@koolabah.com', // Change to your verified sender
            subject: 'You got a job referral from front-door.xyz',
            text: `Hi you have a referral pending confirmation at front-door.xyz`,
            html: `<h1>Hi you have a referral pending confirmation at front-door.xyz</h1><div>please navigate to <a href="https://goerli.front-door.xyz?refId=${refId}&email=${to}">front-door.xyz to confirm your referral!</a> </div>`,
        }
        try {
            return await sgMail.send(msg)
        }
        catch (err) {
            return err;
        }
    },
    sendgridMailHuddle: async (to, roomId) => {
        const msg = {
            to: to, // Change to your recipient
            from: 'pedropelicano@koolabah.com', // Change to your verified sender
            subject: 'You got an interview from front-door.xyz',
            text: `Hey Candidate you have a interview for your job. Please join using huddle at ${roomId}`,
            html: `Hey Candidate you have a interview for your job. Please join using huddle at <a href="${roomId}">${roomId}</a>`,
        }
        try {
            return await sgMail.send(msg)
        }
        catch (err) {
            return err;
        }
    }
}