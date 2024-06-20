const nodemailer=require('nodemailer');
const {EMAIL_ID,EMAIL_PASSWORD, EMAIL_PASSKEY}=require('../../config/ServerConfig')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_ID,
        pass: EMAIL_PASSKEY
    }
});

async function sendOTP(emailID, otp){
    try {
        const detail=await transporter.sendMail({
            from: 'PaperSafe',
            to: emailID,
            subject: 'Verify your PaperSafe Account',
            text: `Your verification code is: ${otp}`
        });
        return true;
    } catch (error) {
        console.log(error)
        console.log('Error Occured during OTP Sending');
        throw error;
    }
}

module.exports={
    sendOTP
}
