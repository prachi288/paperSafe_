const NodeCache = require('node-cache');

const otpCache = new NodeCache({ stdTTL: 300 }); // Cache TTL set to 600 seconds (10 minutes)

const OTPsave=(emailID, otp)=>{
    otpCache.set(emailID, otp);
}

const validateOTP=(emailID, otp)=>{
    const cachedOtp = otpCache.get(emailID);
    if(cachedOtp && cachedOtp === otp){
        otpCache.del(emailID);
        return true;
    }
    return false;
};

module.exports={
    OTPsave,
    validateOTP
}