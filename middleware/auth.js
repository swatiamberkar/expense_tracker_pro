const jsonwebtoken = require('jsonwebtoken')

const auth = (req, res, next) => {

    //console.log(req.headers);

    

    try {
        const accessToken = req.headers.authorization.replace("Bearer ", "")

        const JWT_payload = jsonwebtoken.verify(
            accessToken,
            process.env.jwt_salt
        )

        req.user = JWT_payload
    }
    catch (e) {
        res.status(401).json({
            status: "Failed",
            message: "Unauthorized!"
        })
        return;
    }

 

    next();
}

module.exports = auth