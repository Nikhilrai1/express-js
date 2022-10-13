const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJwt = (req,res,next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith("Bearer ")) return res.status(401).json({"error": "UnAuthorized token"});
     // Bearer token
    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRECT,
        (err,decoded) => {
            if(err) return res.status(402).json({"error": "Invalid token"})
            req.user = decoded.userInfo.username;
            req.roles = decoded.userInfo.roles;
            next();
        }
    )
}

module.exports = verifyJwt;