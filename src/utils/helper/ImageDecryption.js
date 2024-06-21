const crypto=require('crypto')
const fs = require('fs');
const {Buffer}=require('buffer')
const {pipeline}=require('stream')

const {ENCRYPTION_KEY,ENCRYPTION_IV}=require('../../config/ServerConfig');

const encryptionKey=Buffer.from(ENCRYPTION_KEY,'hex');
const iv = Buffer.from(ENCRYPTION_IV, 'hex'); // Convert the hexadecimal IV back to a Buffer

const decrypt=async(inputPath)=>{
    try{
        const outputPath = inputPath.replace('.enc', ''); // Remove .enc to get original file name
        const fileStream=fs.ReadStream(inputPath);
        const outputfileStream=fs.createWriteStream(outputPath);
        const decipher=crypto.createDecipheriv('aes-256-cbc',encryptionKey,iv);

        await pipeline(fileStream,decipher,outputfileStream)
        return outputPath;
    }catch (error) {
        console.log("error in imageDecryption file");
        throw error;
    }
};

module.exports={
    decrypt
}