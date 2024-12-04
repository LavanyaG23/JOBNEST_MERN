const model = require('../model/model');  // Import model functions


 

const jobController = {};


 

// Controller function to create a job post

jobController.createJobPost = async (req, res) => {

  try {

    const userId = req.params.id;

    const { title, description, skillsRequired, jobType, companyCulture, salaryRange } = req.body;

    const jobPostDetails = {

      title: title,

      description: description,

      skillsRequired: skillsRequired,

      jobType: jobType,

      companyCulture: companyCulture,

      salaryRange: salaryRange,

    }

    console.log(jobPostDetails);

    console.log(req.user);


 

    if (req.user.role != 'recruiter') {

      res.status(403).json({ message: "Only recruiters can create job posts" });

      return;

    }


 

    // Call the model method to create the job post

    const newJobPost = await model.createJobPost(userId, jobPostDetails);

    res.status(201).json({ message: 'Job post created successfully', jobPost: newJobPost });

  } catch (error) {

    res.status(400).json({ message: error.message });

  }

};


 

// Controller function to apply for a job post

jobController.applyForJob = async (req, res) => {

  try {

    const jobPostId = req.params.jobPostId;

    const user = req.user;

    console.log(jobPostId);

    console.log(user);

    // Call the model method to apply for a job

    await model.applyForJob(user, jobPostId);

    res.status(200).json({ message: 'Applied for the job successfully' });

  } catch (error) {

    res.status(400).json({ message: error.message });

  }

};


 

// Controller function to find matching job posts for a job seeker

jobController.findMatchingJobPosts = async (req, res) => {

  try {

    const userId = req.params.id;

    const user = await model.getProfileByUserId(userId);

    console.log(user);

    // Call the model method to find matching job posts

    const matchingJobs = await model.findMatchingJobPosts(user);

    res.status(200).json({ matchingJobs });

  } catch (error) {

    res.status(400).json({ message: error.message });

  }

};


 

module.exports = jobController;


 