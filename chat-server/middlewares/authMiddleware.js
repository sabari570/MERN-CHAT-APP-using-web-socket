const jwt = require('jsonwebtoken');
require("dotenv").config();

const ACCESS_TOKEN_SECRET_KEY = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

const requireAuth = (req, res, next) => {
    // To obtain token from the headers
    let headerToken = req.header('authorization');
    headerToken = headerToken.split(" ")[1];
    console.log("Header token: ", headerToken);

    // check jsonwebtoken exists & is verified
    if(headerToken){
        jwt.verify(headerToken, ACCESS_TOKEN_SECRET_KEY, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.status(401).json({"error": "user unauthorized"});
            }else{
                console.log(decodedToken);
                req.userId = decodedToken.id;
                next();
            }
        });
    }else{
        res.status(401).json({"error": "user unauthorized"});
    }
};

module.exports = { requireAuth };