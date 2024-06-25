const express = require('express');

const {upload}=require('../../middleware/index')
const {AadharCardController}=require('../../controller/index');

const router = express.Router();

console.log("Inside Aadhar Routes");

router.post('/uploadAadhar',upload.single('aadhar'),AadharCardController.uploadAadharCard);
router.get('/downloadAadhar/:id',AadharCardController.downloadAadharCard);
router.delete('/deleteAadhar/:id',AadharCardController.deleteAadharCard);

module.exports = router;