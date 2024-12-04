const mongoose = require('mongoose');


 

const messageSchema = new mongoose.Schema({

 fromUser: {

   type: mongoose.Schema.Types.ObjectId,

   ref: 'User', // Reference to the sender's User model

   required: true,

 },

 toUser: {

   type: mongoose.Schema.Types.ObjectId,

   ref: 'User', // Reference to the recipient's User model

   required: true,

 },

 messageContent: {

   type: String,

   required: true, // Message content (text)

 },

 createdAt: {

   type: Date,

   default: Date.now, // Timestamp for the message

 },

});


 

// Export message model

module.exports = mongoose.model('Message', messageSchema);

