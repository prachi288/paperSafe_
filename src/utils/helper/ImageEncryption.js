const crypto=require('crypto')
const fs = require('fs');
const {Buffer}=require('buffer')
const {pipeline}=require('stream')

const {ENCRYPTION_KEY,ENCRYPTION_IV}=require('../../config/ServerConfig');

const encryptionKey=Buffer.from(ENCRYPTION_KEY,'hex');
const iv = Buffer.from(ENCRYPTION_IV, 'hex'); // Convert the hexadecimal IV back to a Buffer

const encrypt=async(inputPath)=>{
    try{
        const outputPath = `${inputPath}.enc`; // Output path derived from input path
        const fileStream=fs.ReadStream(inputPath);
        const outputfileStream=fs.createWriteStream(outputPath);
        const cipher=crypto.createCipheriv('aes-256-cbc',encryptionKey,iv);

        await pipeline(fileStream,cipher,outputfileStream)
        return outputPath;
    }catch (error) {
        console.log("error in imageEncryption file");
        throw error;
    }
};

module.exports={
    encrypt
}