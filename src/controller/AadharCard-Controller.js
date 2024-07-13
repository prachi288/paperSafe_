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

async function downloadAadharCard(req,res){
    console.log("inside controller")
    try {
        const userID=req.params.id;

        const response=await AadharCardService.downloadAadhar(userID);

        return res.status(200).sendFile(response.decryptedFilePath, (err) => {
            if (err) {
                throw err;
            }
            
            fs.unlinkSync(response.encryptedFilePath);

            // Clean up the decrypted file after sending it to the client
            fs.unlinkSync(response.decryptedFilePath);
        });

    }catch(error) {
        console.log("Error in Aadhar Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to download Aadhar Card"
        });
    }
}

async function getAadhaarDetails(req, res){
    try {
        const userID = req.params.id;

        const response = await AadharCardService.getAadhaarDetails(userID);

        return res.status(200).json({
            data: response,
            error: {},
            success: true,
            message: "Successfully Fetched Aadhaar Details"
        });
    } catch (error) {
        console.log("Error in Controller Layer");
        return res.status(500).json({
            data: {},
            error: {error},
            success: false,
            message: "Failed to Fetch Aadhaar Details"
        });
    }
}

async function deleteAadharCard(req,res){
    try {
        const userID=req.params.id;

        const response=await AadharCardService.deleteAadhar(userID);
        return res.status(200).json({
            data: response,
            error:{},
            success: true,
            message: "Aadhar Card Deleted"
        });

    }catch(error) {
        console.log("Error in Aadhar Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to delete Aadhar Card"
        });
    }
}

module.exports={
    uploadAadharCard,
    downloadAadharCard,
    getAadhaarDetails,
    deleteAadharCard
}