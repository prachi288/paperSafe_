const express = require('express');

const {upload}=require('../../middleware/index')
const {XMarksheetController}=require('../../controller/index');

const router = express.Router();

console.log("Inside XMarksheet Routes");

router.post('/uploadXMarksheet',upload.single('xMarksheet'),XMarksheetController.uploadxMarksheet);
router.get('/downloadXMarksheet/:id',XMarksheetController.downloadxMarksheet);
router.delete('/deleteXMarksheet/:id',XMarksheetController.deletexMarksheet);

module.exports = router;