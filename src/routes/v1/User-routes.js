const express = require('express');

const {UserController}=require('../../controller/index');

const router = express.Router();

console.log("Inside Routes");

router.post('/register',UserController.userRegistration);
router.patch('/updateUser/:id',UserController.UserInfoUpdate);
router.delete('/removeUser/:id',UserController.deleteUser);

module.exports = router;