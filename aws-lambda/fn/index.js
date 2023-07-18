const { sendgridMail, sendgridMailHuddle } = require('services/sendgrid')
const { oGet, errorCodes } = require('utils');

exports.handler = async (event) => {
    const reponseHeaders =  {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "https://www.example.com",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    };
    try {
        
        // const token = oGet(event,'headers.Authorization')
        // if (!token)
        //     return { statusCode: 500, body: errorCodes.NO_AUTH_HEADER }
        const email = oGet(event,'body.email')
        const refId = oGet(event,'body.refId')
        const roomId = oGet(event,'body.roomId')

        if (!email)
            return { statusCode: 500, body: errorCodes.NO_EMAIL, headers: reponseHeaders }
        if (refId) {
            const emailReceipt = await sendgridMail(email, refId)
            if (emailReceipt.code == 400)
                return { statusCode: 500, body: errorCodes.EMAIL_FAILURE } 
            return { statusCode: 200, body: "Email sent!", receipt: JSON.stringify(emailReceipt), headers: reponseHeaders}
        }
        if (roomId) {
            const emailReceipt = await sendgridMailHuddle(email, roomId)
            if (emailReceipt.code == 400)
                return { statusCode: 500, body: errorCodes.EMAIL_FAILURE } 
            return { statusCode: 200, body: "Email sent!", receipt: JSON.stringify(emailReceipt), headers: reponseHeaders}
        }
        return { statusCode: 500, body: "Invalid input params", headers: reponseHeaders }
    }
    catch (err) {
        return { statusCode: 500, body: JSON.stringify(err), event: JSON.stringify(event), headers: reponseHeaders } 
    }
};


