const jwt = require("jsonwebtoken")
const Seller = require("../models/Seller.js")

const protect= async(req,res,next)=>{
    let token
    //console.log(req.headers.authorization)
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1]
            console.log("from protect",token)
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            console.log("----",await Seller.findById(decoded.id))
            req.user= await Seller.findById(decoded.id)
                                    .select("-password -refreshToken")
            console.log("user ====",req.user)
            next()
        }
        catch(err){
            return res.status(401).json({message:`Access denied ${err}`})
        }
    }
    if(!token){
        return res.status(401).json({message:"No token in the request"})
    }
}

const authorizeRole = (...roles)=>{
        console.log("authorize",...roles)
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"Access denied for this operation"})
        }
        next()
    }
}

module.exports={protect,authorizeRole}