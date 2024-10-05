

const jwt = require("jsonwebtoken");
const secret = "123123"

// Modify the login route as below 
const middleware = (req, res, next) => {
    {
        const token = req.headers.authorization;
        if (!token) return res.status(403).json({
            msg: "No token present"
        });
        try {
            const decoded = jwt.verify(token,
                secret);
            // console.log(decoded)
            req.email = decoded.email;
            console.log(decoded.email)
        } catch (err) {
            return res.status(401).json({
                msg: "Invalid Token"
            });
        }
        next();
    };
}
module.exports = { middleware }
