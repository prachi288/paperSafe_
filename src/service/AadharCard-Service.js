const cloudinary = require('cloudinary').v2;
const fs=require('fs');
const path=require('path');

const {AadharCardRepository}=require('../repository/index')
const {encrypt,decrypt}=require('../utils/helper/index')

const aadharCardRepository=new AadharCardRepository();

async function uploadAadhar(data, filePath){
    try{
        const encryptedFile = await encrypt(filePath);

        // Upload encrypted file to Cloudinary
        const result = await cloudinary.uploader.upload(encryptedFile, { 
            resource_type: "raw" 
        });
 
        // Clean up the temporary file
        fs.unlinkSync(filePath);

        // Clean up the encrypted file after upload
        fs.unlinkSync(encryptedFile);

        data={...data, version: result.version, public_id: result.public_id};

        const response=await aadharCardRepository.create(data);
        return response;
    }catch(error){
        console.log("error in aadhar service layer");
        throw error;
    }
}

module.exports={
    uploadAadhar
}