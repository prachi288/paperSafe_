const express = require('express');

const {upload}=require('../../middleware/index')
const {PanCardController}=require('../../controller/index');

const router = express.Router();

console.log("Inside Pan Routes");

router.post('/uploadPan',upload.single('pan'),PanCardController.uploadPanCard);
router.get('/downloadPan/:id',PanCardController.downloadPanCard);
router.delete('/deletePan/:id',PanCardController.deletePanCard);

module.exports = router;