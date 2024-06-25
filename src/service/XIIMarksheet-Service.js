const cloudinary = require('cloudinary').v2;
const fs=require('fs');
const path=require('path');
const axios=require('axios')

const {XIIMarksheetRepository}=require('../repository/index')
const {encrypt}=require('../utils/helper/index')
const {decrypt}=require('../utils/helper/ImageDecryption')

const xIIMarksheetRepository=new XIIMarksheetRepository();

async function uploadXIIMarksheet(data, filePath){
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

        const response=await xIIMarksheetRepository.create(data);
        return response;
    }catch(error){
        console.log("error in XIIMarksheet service layer");
        throw error;
    }
}

async function downloadXIIMarksheet(userID){
    try {
        const xIIMarksheet=await xIIMarksheetRepository.getByUserId(userID);

        const version = xIIMarksheet.version;
        const public_id = xIIMarksheet.public_id;
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
        console.log('error in XIIMarksheet service layer');
        throw error;
    }
}

async function deleteXIIMarksheet(userID){
    try {
        const response= await xIIMarksheetRepository.remove(userID);
        return response;
    } catch (error) {
        console.log('error in XIIMarksheet service layer');
        throw error;
    }
}

module.exports={
    uploadXIIMarksheet,
    downloadXIIMarksheet,
    deleteXIIMarksheet
}