const cloudinary = require('cloudinary').v2;
const fs=require('fs');
const path=require('path');
const axios=require('axios')

const {CLOUDINARY_CLOUD_NAME}=require('../config/ServerConfig')

const {AadharCardRepository}=require('../repository/index')
const {encrypt}=require('../utils/helper/index')
const {decrypt}=require('../utils/helper/ImageDecryption')

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

async function downloadAadhar(userID){
    console.log("inside service")
    try {
        const aadhar=await aadharCardRepository.getByUserId(userID);

        const version = aadhar.version;
        const public_id = aadhar.public_id;
        const url = `https://res.cloudinary.com/dekzkwo7x/raw/upload/v${version}/` + public_id;

        // Write the encrypted file to the local filesystem
        const encryptedFilePath = path.join(__dirname, '../downloads',`${public_id}.enc`);
        const decryptedFilePath = path.join(__dirname, '../downloads',`${public_id}.jpg`);
        
        // Download the encrypted file
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
        });

        const writeFile=fs.createWriteStream(encryptedFilePath);
        response.data.pipe(writeFile);

        await new Promise((resolve, reject) => {
            writeFile.on('finish', resolve);
            writeFile.on('error', reject);
        });

        await decrypt(encryptedFilePath, decryptedFilePath);

        const filePaths = {
            encryptedFilePath,
            decryptedFilePath
        }

        return filePaths;
    } catch (error) {
        console.log('error in aadhar service layer');
        throw error;
    }
}

async function getAadhaarDetails(userID){
    try {
      const response = await aadharCardRepository.getByUserID(userID);
      return response;
    } catch (error) {
      console.log('Error in Aadhaar Service Layer');
      throw error;
    }
}

async function deleteAadhar(userID){
    try {
        const response= await aadharCardRepository.remove(userID);
        return response;
    } catch (error) {
        console.log('error in Aadhar service layer');
        throw error;
    }
}

module.exports={
    uploadAadhar,
    downloadAadhar,
    getAadhaarDetails,
    deleteAadhar,
}