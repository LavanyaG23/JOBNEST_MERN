//Used to check whether a user is authenticated (e.g. verifying JWT tokens)


 

const jwt = require("jsonwebtoken");

require("dotenv").config();



 

const authMiddleware = (req, res, next) => {

    //getting the tokens from the authorization header


 

    //const token = req.headers.authorization?.split(' ')[1];

    const token = req.header('Authorization')?.replace('Bearer ', '');


 

    if (!token) {

        res.status(401).json({ error: "Access denied. No token provided" });

        return;

    }


 

    try {


 

        //Verify token and attach decoded user data to request object

        const decoded = jwt.verify(token, process.env.JWT_SECRET);  //JWT_SECRET should be in your .env

        req.user = {userId: decoded.userId, role: decoded.role}; //Assuming the payload contains userId

        console.log(decoded);

        next();  //proceed to next middleware or route handler

    }


 

    catch (error) {

        res.status(400).json({ error: "Invalid Token" });

    }

}


 

module.exports = authMiddleware;