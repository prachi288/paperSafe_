const fs = require('fs');

const {XMarksheetService}=require('../service/index');

async function uploadxMarksheet(req,res){
    try {
        const data=req.body;
        const filePath=req.file.path;

        const response=await XMarksheetService.uploadXMarksheet(data, filePath);
        return res.status(201).json({
            data: response,
            error:{},
            success: true,
            message: "X-Marksheet Uploaded"
        });

    }catch(error) {
        console.log("Error in X-Marksheet Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to upload X-Marksheet"
        });
    }
}

async function downloadxMarksheet(req,res){
    try {
        const userID=req.params.id;

        const response=await XMarksheetService.downloadXMarksheet(userID);

        return res.status(200).sendFile(response.decryptedFilePath, (err) => {
            if (err) {
                throw err;
            }
            
            fs.unlinkSync(response.encryptedFilePath);

            // Clean up the decrypted file after sending it to the client
            fs.unlinkSync(response.decryptedFilePath);
        });

    }catch(error) {
        console.log("Error in X-Marksheet Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to download X-Marksheet"
        });
    }
}

async function deletexMarksheet(req,res){
    try {
        const userID=req.params.id;

        const response=await XMarksheetService.deleteXMarksheet(userID);
        return res.status(200).json({
            data: response,
            error:{},
            success: true,
            message: "X-Marksheet Deleted"
        });

    }catch(error) {
        console.log("Error in X-Marksheet Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to delete X-Marksheet"
        });
    }
}

module.exports={
    uploadxMarksheet,
    downloadxMarksheet,
    deletexMarksheet
}