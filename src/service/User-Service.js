const {UserRepository}=require('../repository/index');
const {generateOTP}=require('../utils/helper/GenerateOTP');
const {sendOTP}=require('../utils/helper/SendOTP')
const {uniqueIDGenerator}=require('../utils/helper/index');
const {OTPsave,validateOTP}=require('../utils/helper/ValidateOTP')

const userRepo=new UserRepository();

async function RegisterUser(data){
    try {
        const uniqueID=uniqueIDGenerator(data.firstName,data.mobileNumber);
        data={...data,uniqueID:uniqueID};
        const user=await userRepo.create(data);
        return user;
    } catch (error) {
        console.log("Error in User Service Layer");
        throw error;
    }
}

async function sendOtp(emailID){
    try {
        const otp=generateOTP();
        OTPsave(emailID, otp);
        await sendOTP(emailID, otp);
        const respose="OTP sent to registered email id for verification";
        return respose;
    } catch (error) {
        console.log(error)
        console.log("Error in User Service Layer");
        throw {error};
    }
}

async function verifyOtp(emailID, otp){
    try {
        if(validateOTP(emailID, otp)) {
            const user = await userRepo.getByEmail(emailID);
            if(user){
                return {
                    doExist: true,
                    user: user
                };
            }else{
                return {
                    doExist: false,
                    user: {}
                };
            }
        }else{
            throw new Error('Invalid OTP');
        }
    } catch (error) {
        console.log("Error in User Service Layer");
        console.log(error)
        throw {error};
    }
}

async function getUserById(id){
    try {
        const response = await userRepo.getById(id);
        return response;
    } catch (error) {
        console.log("Error in User Service Layer");
        throw {error};
    }
}

async function getUserByEmail(emailID){
    try {
        const response = await userRepo.getByEmail(emailID);
        return response;
    } catch (error) {
        console.log("Error in User Service Layer");
        throw {error};
    }
}

async function UserInfoUpdate(id, data){
    try {
        const response = await userRepo.update(id, data);
        return response;
    } catch (error) {
        console.log("Error in User Service Layer");
        console.log(error)
        throw {error};
    }
}

async function deleteUser(id){
    try{
        const response=await userRepo.remove(id);
        return response;
    }catch(error){
        console.log("Error in User Service Layer");
        throw {error};
    }
}
module.exports={
    RegisterUser,
    sendOtp,
    verifyOtp,
    getUserById,
    getUserByEmail,
    UserInfoUpdate,
    deleteUser
}