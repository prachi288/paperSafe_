const cloudinary = require('cloudinary').v2;
const fs=require('fs');
const path=require('path');
const axios=require('axios')

const {MovieTicketRepository}=require('../repository/index')
const {encrypt}=require('../utils/helper/index')
const {decrypt}=require('../utils/helper/ImageDecryption')

const movieTicketRepository=new MovieTicketRepository();

async function uploadMovieTicket(data, filePath){
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

        const response=await movieTicketRepository.create(data);
        return response;
    }catch(error){
        console.log("error in MovieTicket service layer");
        throw error;
    }
}

async function downloadMovieTicket(userID){
    try {
        const movieTicket=await movieTicketRepository.getByUserId(userID);

        const version = movieTicket.version;
        const public_id = movieTicket.public_id;
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
        console.log('error in MovieTicket service layer');
        throw error;
    }
}

async function deleteMovieTicket(userID){
    try {
        const response= await movieTicketRepository.remove(userID);
        return response;
    } catch (error) {
        console.log('error in MovieTicket service layer');
        throw error;
    }
}

module.exports={
    uploadMovieTicket,
    downloadMovieTicket,
    deleteMovieTicket
}