const jwt= require('jsonwebtoken');

const generateToken=(user)=>{
    return jwt.sign(
        {
            userId:user._id,
            name:user.name,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_LIFETIME
        }
    )
}

module.exports=generateToken