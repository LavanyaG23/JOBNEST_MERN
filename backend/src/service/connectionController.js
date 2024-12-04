//Handles user connections(networking) like sending and accepting connection requests using the connection model.


 

const model = require("../model/model");


 

let connectionController = {};


 

//Send connection request

connectionController.sendConnectionRequest = async (req, res) => {

    try {

        const userId  = req.params.id;

        const currentUserId = req.user.userId;


 

        //Create a new connection request using the model

        const newConnection = await model.createConnection(currentUserId, userId);

        res.status(200).json({ message: "Connection request sent successfully", connection: newConnection });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({ error: "Internal server error" });

    }

}


 

//View all connection request

connectionController.viewAllConnections = async (req, res) => {

    try {

        const userId = req.user.userId;


 

        const connections = await model.getAllConnections(userId);


 

        if (connections.length === 0) {

            return res.status(404).json({ error: 'No Connections Found' });

        }


 

        res.status(200).json({ connections });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({ error: "Internal server error" });

    }

}


 

//Accept connection request

connectionController.acceptConnectionRequest = async (req, res) => {

    try {

        const connectionId = req.params.connectionId;


 

        //Accept the connection using the model

        const updatedConnection = await model.acceptConnectionRequest(connectionId);


 

        if (!updatedConnection) {

            return res.status(200).json({ message: "Connection request not found" });

        }


 

        res.status(200).json({ message: "Connection accepted succesfully", connection: updatedConnection });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({ error: "Interal server error" });

    }

}


 

// Reject a connection request

connectionController.rejectConnectionRequest = async (req, res) => {

    try {

        const { connectionId } = req.params; // Get connectionId from URL params


 

        // Reject the connection by deleting it

        const deletedConnection = await model.rejectConnectionRequest(connectionId);


 

        if (!deletedConnection) {

            return res.status(404).json({ error: 'Connection request not found' });

        }


 

        res.status(200).json({ message: 'Connection request rejected' });

    }

    catch (error) {

        console.error(error); res.status(500).json({ error: 'Internal server error' });

    }

};


 

module.exports = connectionController;