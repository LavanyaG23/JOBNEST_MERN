const mongoose = require('mongoose');


 

const connectSchema = new mongoose.Schema({

 fromUser: {

   type: mongoose.Schema.Types.ObjectId,

   ref: 'User', // Reference to the User model for the user sending the connection request

   required: true,

 },

 toUser: {

   type: mongoose.Schema.Types.ObjectId,

   ref: 'User', // Reference to the User model for the user receiving the connection request

   required: true,

 },

 status: {

   type: String,

   enum: ['pending', 'accepted', 'rejected'],

   default: 'pending', // Connection can be pending, accepted, or rejected

 },

 createdAt: {

   type: Date,

   default: Date.now,

 },

});


 

// Export connection model

module.exports = mongoose.model('Connection', connectSchema);