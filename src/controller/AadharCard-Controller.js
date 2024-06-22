const fs = require('fs');
const path=require('path')
const {AadharCardService}=require('../service/index');

async function uploadAadharCard(req,res){
    try {
        const data=req.body;
        const filePath=req.file.path;

        const response=await AadharCardService.uploadAadhar(data, filePath);
        return res.status(201).json({
            data: response,
            error:{},
            success: true,
            message: "Aadhar Card Uploaded"
        });

    }catch(error) {
        console.log("Error in Aadhar Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to upload Aadhar Card"
        });
    }
}

module.exports={
    uploadAadharCard,
}