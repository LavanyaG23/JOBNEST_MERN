const mongoose = require('mongoose');



// Define job schema

const jobSchema = new mongoose.Schema({

  userId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: 'User',

    required: true,

  },

 title: {

   type: String,

   required: true,

 },

 description: {

   type: String,

   required: true,

 },

 skillsRequired: {

   type: [String],

   required: true,

 },

 jobType: {

  type: [String],

  required: true,

 },

 companyCulture: {

  type: [String],

  required: true,

  },

 salaryRange: {

   type: String, // Example: '50,000 - 70,000'

 },

 appliedUsers: [{

      type: mongoose.Schema.Types.ObjectId,

      ref: 'User', // Reference to job seekers who applied for the job

    }],

 createdAt: {

   type: Date,

   default: Date.now,

 },

});


 

// Export job model

module.exports = mongoose.model('Job', jobSchema);

