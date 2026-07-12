const jwt = require("jsonwebtoken")

const verifyJWT=(req,res,next)=>{
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        res.status(401);
        throw new Error("You first need to login");
    }

    const token = authHeader.replace(
        "Bearer ",
        ""
    );

    try {
        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        req.user = decoded;

        next();

    } catch (error) {
        res.status(401);
        throw new Error("Invalid token");
    }
};

module.exports=verifyJWT;