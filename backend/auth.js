

const jwt = require("jsonwebtoken");
require("dotenv").config();


// Modify the login route as below 
const middleware = (req, res, next) => {
    {
        const token = req.headers.authorization;
        if (!token) return res.status(403).json({
            msg: "No token present"
        });
        try {
            const decoded = jwt.verify(token,
                process.env.JWT_SECRET);
            // console.log(decoded)
            req.name = decoded.name;
            req.email = decoded.email;
            
        } catch (err) {
            return res.status(401).json({
                msg: "Invalid Token"
            });
        }
        next();
    };
}
module.exports = { middleware }
