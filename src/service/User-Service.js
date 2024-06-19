const {UserRepository}=require('../repository/index');

const userRepo=new UserRepository();

async function RegisterUser(data){
    try {
        const user=await userRepo.RegisterUser(data);
        return user;
    } catch (error) {
        console.log("Error in Service Layer");
        throw error;
    }
}

module.exports={
    RegisterUser,
}