const cloudinary = require('cloudinary').v2;
const fs=require('fs');
const path=require('path');
const axios=require('axios')

const {PANCardRepository}=require('../repository/index')
const {encrypt}=require('../utils/helper/index')
const {decrypt}=require('../utils/helper/ImageDecryption')

const panCardRepository=new PANCardRepository();

async function uploadPan(data, filePath){
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

        const response=await panCardRepository.create(data);
        return response;
    }catch(error){
        console.log("error in Pan service layer");
        throw error;
    }
}

async function downloadPan(userID){
    try {
        const pan=await panCardRepository.getByUserId(userID);

        const version = pan.version;
        const public_id = pan.public_id;
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
        console.log('error in Pan service layer');
        throw error;
    }
}

async function getPanDetails(userID){
    try {
      const response = await panCardRepository.getByUserID(userID);

      return response;
    } catch (error) {
      console.log('Error in PAN Service Layer');
      throw error;
    }
  }

async function deletePan(userID){
    try {
        const response= await panCardRepository.remove(userID);
        return response;
    } catch (error) {
        console.log('error in Pan service layer');
        throw error;
    }
}

module.exports={
    uploadPan,
    downloadPan,
    getPanDetails,
    deletePan
}