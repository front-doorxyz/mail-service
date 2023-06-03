const { sendgridMail } = require('services/sendgrid')
const { oGet, errorCodes } = require('utils')

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

        if (!email)
            return { statusCode: 500, body: errorCodes.NO_EMAIL, headers: reponseHeaders }
        if (!refId)
            return { statusCode: 500, body: "No refId provided", headers: reponseHeaders }

        const emailReceipt = await sendgridMail(email, refId)
        
        if (emailReceipt.code == 400)
            return { statusCode: 500, body: errorCodes.EMAIL_FAILURE } 

        return { statusCode: 200, body: "Email sent!", receipt: JSON.stringify(emailReceipt), headers: reponseHeaders}
    }
    catch (err) {
        return { statusCode: 500, body: JSON.stringify(err), event: JSON.stringify(event), headers: reponseHeaders } 
    }
};


