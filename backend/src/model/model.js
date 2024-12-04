const User = require('./user');

const Job = require('./job');

const Connection = require('./connect');

const Message = require('./message');

const { default: mongoose } = require('mongoose');



 

// Read a user by email

const getUserByEmail = async (email) => {

  try {

    const user = await User.findOne({ email: email });

    return user;

  } catch (error) {

    throw new Error('Error fetching user: ' + error.message);

  }

};


 

// Read a profile by user ID

const getProfileByUserId = async (userId) => {

  try {

    console.log("Fetching profile for userId", userId);

    const profile = await User.findOne({ _id: userId })

    if (!profile) throw new Error('Profile not found');

    return profile;

  } catch (error) {

    throw new Error('Error fetching profile: ' + error.message);

  }

};


 

// Update a profile by user ID

const updateProfile = async (userId, updateData) => {

  console.log(updateData);

  try {

    const updatedProfile = await User.updateOne(

      { _id: userId },

      updateData,

      { new: true }

    );

    return updatedProfile;

  } catch (error) {

    throw new Error('Error updating profile: ' + error.message);

  }

};


 

const createJobPost = async (userId, jobPostDetails) => {

  const recruiter = await getProfileByUserId(userId);

  if (!recruiter || recruiter.role !== 'recruiter') {

    throw new Error('Only recruiters can create job posts');

  }

  const newJobPost = new Job({

    userId,

    ...jobPostDetails,

  })

  await newJobPost.save();

  return newJobPost;

}


 

const applyForJob = async (user, jobPostId) => {

  if (!mongoose.Types.ObjectId.isValid(jobPostId)) {

    res.status(400).json({ message: 'Invalid job post Id' });

    return;

  }

  console.log(user);

  if (!user || user.role !== 'jobSeeker') {

    throw new Error('Only job seekers can apply for job posts');

  }


 

  const jobPost = await Job.findOne({ '_id': jobPostId });

  if (!jobPost) {

    throw new Error('Job post not found');

  }


 

  if (jobPost.appliedUsers.includes(user.userId)) {

    throw new Error('You have already applied for this job');

  }


 

  jobPost.appliedUsers.push(user.userId)

  await jobPost.save();

  return jobPost;

}


 

const findMatchingJobPosts = async (user) => {

  const jobSeeker = await getProfileByUserId(user._id);

  if (!jobSeeker || jobSeeker.role !== 'jobSeeker') {

    throw new Error('User is not a job seeker');

  }


 

  const jobPosts = await Job.find({

    $or: [

      { skillsRequired: { $in: user.skills } },

      { jobType: { $in: user.jobPreferences } },

      { companyCulture: { $in: user.cultureFit } }

    ]

  })


 

  return jobPosts;

}


 

// Create a new connection request

const createConnection = async (fromUser, toUser) => {

  try {

    const newConnection = new Connection({

      fromUser,

      toUser,

      status: 'pending',

    });


 

    await newConnection.save();

    return newConnection;


 

  } catch (error) {

    throw new Error('Error creating connection: ' + error.message);

  }


 

};


 

// Get all connections for a user (either as sender or receiver)

const getAllConnections = async (userId) => {

  try {

    const connections = await Connection.find({

      $or: [{ fromUser: userId }, { toUser: userId }],

    });


 

    return connections;

  } catch (error) {

    throw new Error('Error fetching connections: ' + error.message);

  }


 

};


 

// Accept a connection request by updating its status

const acceptConnectionRequest = async (connectionId) => {

  try {

    const updatedConnection = await Connection.findByIdAndUpdate(

      connectionId,

      { status: 'accepted' },

      { new: true } // Return the updated document

    );


 

    return updatedConnection;

  } catch (error) {

    throw new Error('Error accepting connection request: ' + error.message);

  }


 

};


 

// Reject a connection request by deleting it

const rejectConnectionRequest = async (connectionId) => {

  try {

    const deletedConnection = await Connection.findByIdAndDelete(connectionId);

    return deletedConnection;

  } catch (error) {

    throw new Error('Error rejecting connection request: ' + error.message);

  }

}


 

const sendMessage =  async (userId, newMessage) =>{

  try{

     const {toUser, messageContent} = newMessage;

      const message = new Message({

        fromUser: userId,

        toUser,

        messageContent,

      });

      return await message.save();

  }

  catch(error){

    throw new Error('Failed to send message');

  }

}


 

const getMessagesByUserId = async (userId, chatId) => {

  try{

    const messages = await Message.find({

      $or: [{fromUser: userId, toUser: chatId}, {toUser: userId, fromUser: chatId}],

    }).sort({createdAt: 1});

    return messages;

  }

  catch(error){

    throw new Error('Failed to retrieve message');

  }

}


 

module.exports = {

  getUserByEmail,

  getProfileByUserId,

  updateProfile,

  createJobPost,

  applyForJob,

  findMatchingJobPosts,

  createConnection,

  getAllConnections,

  acceptConnectionRequest,

  rejectConnectionRequest,

  sendMessage,

  getMessagesByUserId,

};


 