const {UserService}=require('../service/index');

async function userRegistration(req, res){
    try {
        const data=req.body;
        const user=await UserService.RegisterUser(data);
        return res.status(201).json({
            data: user,
            error:{},
            success: true,
            message: "User Successfully Registered"
        });

    }catch(error) {
        console.log("Error in User Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to Register User"
        });
    }
}

async function UserInfoUpdate(req,res){
    try{
        const id=req.params.id;
        const data=req.body;

        const response= await UserService.UserInfoUpdate(id,data);
        return res.status(200).json({
            data:response,
            error:{},
            success:true,
            message:"User data is updated"
        })
    }catch(error) {
        console.log("Error in User Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Cannot update the data"
        });
    }
}

async function deleteUser(req, res){
    try {
        const id = req.params.id;

        const response = await UserService.deleteUser(id);
        return res.status(200).json({
            data: response,
            error:{},
            success: true,
            message: "User removed successfully"
        })
    } catch (error) {
        console.log("Error in User Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Cannot delete user"
        });
    }
}
module.exports={
    userRegistration,
    UserInfoUpdate,
    deleteUser
}