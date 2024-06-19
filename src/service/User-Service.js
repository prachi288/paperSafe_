const {UserRepository}=require('../repository/index');
const {uniqueIDGenerator}=require('../utils/helper/index');

const userRepo=new UserRepository();

async function RegisterUser(data){
    try {
        const uniqueID=uniqueIDGenerator(data.firstName,data.mobileNumber);
        data={...data,uniqueID:uniqueID};
        const user=await userRepo.create(data);
        return user;
    } catch (error) {
        console.log("Error in Service Layer");
        throw error;
    }
}

async function getUserById(id){
    try {
        const response = await userRepo.getById(id);
        return response;
    } catch (error) {
        console.log("Error in Service Layer");
        throw {error};
    }
}

async function getUserByEmail(emailID){
    try {
        const response = await userRepo.getByEmail(emailID);
        return response;
    } catch (error) {
        console.log("Error in Service Layer");
        throw {error};
    }
}

async function UserInfoUpdate(id, data){
    try {
        const response = await userRepo.update(id, data);
        return response;
    } catch (error) {
        console.log("Error in Service Layer");
        console.log(error)
        throw {error};
    }
}

async function deleteUser(id){
    try{
        const response=await userRepo.remove(id);
        return response;
    }catch(error){
        console.log("Error in Service Layer");
        throw {error};
    }
}
module.exports={
    RegisterUser,
    getUserById,
    getUserByEmail,
    UserInfoUpdate,
    deleteUser
}