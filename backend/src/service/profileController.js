const model = require("../model/model");

const upload = require("../middleware/fileUploadMiddleware");


 

const profileController = {};


 

//Get user profile

profileController.getProfile = async(req, res) => {

    try{

        const userId = req.params.id;

        //fetch user profile from the model

        const user = await model.getProfileByUserId(userId);

        console.log(user);


 

        if(!user){

            return res.status(404).json({error: "User not found"});

        }


 

        res.status(200).json({profile: user});

    }

    catch(error){

        console.error("Error fetching profile data", error);

        res.status(500).json({error: "Internal server error"});

    }

};


 

//update user profile

profileController.updatedProfile = async (req, res) => {

    console.log("file upload working");

    console.log(req.body);

    try{

        const userId = req.params.id;

        const updateData = req.body;

       

        upload.fields([

            {name: "photo", maxCount: 1},

            {name: "resume", maxCount: 1},

            {name: "coverLetter", maxCount: 1},

        ])(req, res, async(err) => {

            if(err){

                res.status(400).json({error: "File upload error", details: err.message});

                return;

            }

        //check if files are uploaded and include them in updatedata

        if(req.files){

            if(req.files.photo){

                updateData.photo = `/uploads/photo/${req.files.photo[0].filename}`;

            }

            if(req.files.resume){

                updateData.resume = `/uploads/resume/${req.files.resume[0].filename}`;

            }

            if(req.files.coverLetter){

                updateData.coverLetter = `/uploads/coverletter/${req.files.coverLetter[0].filename}`;

            }

        }


 

        //update user data using the model

        const updatedProfile = await model.updateProfile(userId, {$set: updateData});

        console.log(updatedProfile);

        if(!updatedProfile.acknowledged){

            res.status(404).json({error: "user not found"});

            return;

        }

        res.status(200).json({message: "Profile Updated successfully", profile: updatedProfile});

    });

    }

    catch(error){

        console.error("Error Updating Profile: ", error);

        if(!res.headersSent){

            res.status(400).json({error: "Invalid Request Body"});

        }

    }

};


 

module.exports = profileController;