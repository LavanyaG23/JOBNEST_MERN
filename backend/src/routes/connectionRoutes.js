//Handles user networking features (connections)


 

//importing necessary modules

const express = require("express");

const connectionController = require("../service/connectionController");

const authMiddleware = require("../middleware/authMiddleware");


 

//creating instace of express router

const routing = express.Router();


 

//send connection request

routing.post("/send/:id", authMiddleware, connectionController.sendConnectionRequest);


 

//view all connections

routing.get("/view", authMiddleware, connectionController.viewAllConnections);


 

//route to accept a connection request

routing.put('/accept/:connectionId', authMiddleware, connectionController.acceptConnectionRequest);


 

//route to reject a connection request

routing.delete('/reject/:connectionId', authMiddleware, connectionController.rejectConnectionRequest);


 

module.exports = routing;