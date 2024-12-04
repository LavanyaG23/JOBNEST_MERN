//Handles user Authentication (signup and login)


 

//importing necessary routes and modules

const express = require("express");

//creating instance of express router

const routing = express.Router();

const authController = require('../service/authController');


 

//signup route

routing.post("/signup", authController.signup);


 

//login route

routing.post("/login", authController.login);

routing.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
});



 

module.exports = routing;