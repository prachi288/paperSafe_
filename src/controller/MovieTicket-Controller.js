const fs = require('fs');
const {MovieTicketService}=require('../service/index');

async function uploadmovieTicket(req,res){
    try {
        const data=req.body;
        const filePath=req.file.path;

        const response=await MovieTicketService.uploadMovieTicket(data, filePath);
        return res.status(201).json({
            data: response,
            error:{},
            success: true,
            message: "MovieTicket Uploaded"
        });

    }catch(error) {
        console.log("Error in MovieTicket Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to upload MovieTicket"
        });
    }
}

async function downloadmovieTicket(req,res){
    try {
        const userID=req.params.id;

        const response=await MovieTicketService.downloadMovieTicket(userID);

        return res.status(200).sendFile(response.decryptedFilePath, (err) => {
            if (err) {
                throw err;
            }
            
            fs.unlinkSync(response.encryptedFilePath);

            // Clean up the decrypted file after sending it to the client
            fs.unlinkSync(response.decryptedFilePath);
        });

    }catch(error) {
        console.log("Error in MovieTicket Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to download MovieTicket"
        });
    }
}

async function deletemovieTicket(req,res){
    try {
        const userID=req.params.id;

        const response=await MovieTicketService.deleteMovieTicket(userID);
        return res.status(200).json({
            data: response,
            error:{},
            success: true,
            message: "MovieTicket Deleted"
        });

    }catch(error) {
        console.log("Error in MovieTicket Controller Layer");
        console.log(error)
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to delete MovieTicket"
        });
    }
}

module.exports={
    uploadmovieTicket,
    downloadmovieTicket,
    deletemovieTicket
}