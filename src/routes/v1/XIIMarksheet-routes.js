const express = require('express');

const {upload}=require('../../middleware/index')
const {XIIMarksheetController}=require('../../controller/index');

const router = express.Router();

console.log("Inside XIIMarksheet Routes");

router.post('/uploadXIIMarksheet',upload.single('xIIMarksheet'),XIIMarksheetController.uploadxIIMarksheet);
router.get('/downloadXIIMarksheet/:id',XIIMarksheetController.downloadxIIMarksheet);
router.delete('/deleteXIIMarksheet/:id',XIIMarksheetController.deletexIIMarksheet);

module.exports = router;