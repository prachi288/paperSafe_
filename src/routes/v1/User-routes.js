const express = require('express');

const {UserController}=require('../../controller/index');

const router = express.Router();

console.log("Inside Routes");

router.post('/register',UserController.userRegistration);
router.post('/requestOTP',UserController.otpRequest);
router.post('/verifyOTP',UserController.otpVerify);
router.patch('/updateUser/:id',UserController.UserInfoUpdate);
router.delete('/removeUser/:id',UserController.deleteUser);

module.exports = router;