const model = require("../model/model");

const Message = require("../model/message");


 

const messageController = {};


 

//function to send a message

messageController.sendMessage = async (req, res) => {

    const userId = req.user.userId;

    const newMessage = req.body;

    try{

        const message = await model.sendMessage(userId, newMessage);


 

        res.status(201).json({

            message: 'Message sent successfully',

            data: `${message}`,

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            error: 'Failed to send message',

            details: error.message,

        });

    }

};


 

//function to view messages by userId

messageController.viewMessagesByUserId = async(req, res) => {

    try{

        const userId = req.user.userId;

        const chatId = req.params.chatId;


 

        const messages = await model.getMessagesByUserId(userId, chatId);


 

        if(!messages || messages.length === 0){

            return res.status(404).json({message: 'No messages found for this user'});

        }


 

        //return the messages as a response

        res.status(200).json({

            message: 'Message retrieved successfully',

            data: messages,

        });

    }

    catch(error){

        console.error(500);

        res.status(500).json({

            error: 'Failed to retrieve messages',

            details: error.message,

        })

    }

}


 

module.exports = messageController;