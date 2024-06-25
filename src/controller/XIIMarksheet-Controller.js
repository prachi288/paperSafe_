const fs = require('fs');

const {XIIMarksheetService}=require('../service/index');

async function uploadxIIMarksheet(req,res){
    try {
        const data=req.body;
        const filePath=req.file.path;

        const response=await XIIMarksheetService.uploadXIIMarksheet(data, filePath);
        return res.status(201).json({
            data: response,
            error:{},
            success: true,
            message: "XII-Marksheet Uploaded"
        });

    }catch(error) {
        console.log("Error in XII-Marksheet Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to upload XII-Marksheet"
        });
    }
}

async function downloadxIIMarksheet(req,res){
    try {
        const userID=req.params.id;

        const response=await XIIMarksheetService.downloadXIIMarksheet(userID);

        return res.status(200).sendFile(response.decryptedFilePath, (err) => {
            if (err) {
                throw err;
            }
            
            fs.unlinkSync(response.encryptedFilePath);

            // Clean up the decrypted file after sending it to the client
            fs.unlinkSync(response.decryptedFilePath);
        });

    }catch(error) {
        console.log("Error in XII-Marksheet Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to download XII-Marksheet"
        });
    }
}

async function deletexIIMarksheet(req,res){
    try {
        const userID=req.params.id;

        const response=await XIIMarksheetService.deleteXIIMarksheet(userID);
        return res.status(200).json({
            data: response,
            error:{},
            success: true,
            message: "XII-Marksheet Deleted"
        });

    }catch(error) {
        console.log("Error in XII-Marksheet Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to delete XII-Marksheet"
        });
    }
}

module.exports={
    uploadxIIMarksheet,
    downloadxIIMarksheet,
    deletexIIMarksheet
}