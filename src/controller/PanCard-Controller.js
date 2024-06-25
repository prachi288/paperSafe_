const fs = require('fs');
const {PanCardService}=require('../service/index');

async function uploadPanCard(req,res){
    try {
        const data=req.body;
        const filePath=req.file.path;

        const response=await PanCardService.uploadPan(data, filePath);
        return res.status(201).json({
            data: response,
            error:{},
            success: true,
            message: "Pan Card Uploaded"
        });

    }catch(error) {
        console.log("Error in Pan Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to upload Pan Card"
        });
    }
}

async function downloadPanCard(req,res){
    try {
        const userID=req.params.id;

        const response=await PanCardService.downloadPan(userID);

        return res.status(200).sendFile(response.decryptedFilePath, (err) => {
            if (err) {
                throw err;
            }
            
            fs.unlinkSync(response.encryptedFilePath);

            // Clean up the decrypted file after sending it to the client
            fs.unlinkSync(response.decryptedFilePath);
        });

    }catch(error) {
        console.log("Error in Pan Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to download Pan Card"
        });
    }
}

async function deletePanCard(req,res){
    try {
        const userID=req.params.id;

        const response=await PanCardService.deletePan(userID);
        return res.status(200).json({
            data: response,
            error:{},
            success: true,
            message: "Pan Card Deleted"
        });

    }catch(error) {
        console.log("Error in Pan Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to delete Pan Card"
        });
    }
}

module.exports={
    uploadPanCard,
    downloadPanCard,
    deletePanCard
}