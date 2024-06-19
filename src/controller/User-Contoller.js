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

    } catch (error) {
        console.log("Error in User Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to Register User"
        });
    }
}

module.exports={
    userRegistration
}