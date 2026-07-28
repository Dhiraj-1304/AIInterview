import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js";
import blackListModel from "../models/blacklist.model.js";

const authUser = async(req, res, next)=>{
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
      message : "Unauthorized"
    })
  }
  const isTokenBlacklisted = await blackListModel.findOne({token})

  if(isTokenBlacklisted){
    return res.status(401).json({
      message : "Token is invalid "
    })
  }
  try{
    console.log("before decode")
    const decode = jwt.verify(token, process.env.JWT_SECRET)
      // req.user = await UserModel.findById(decode).select("-password")
      // or  req.user = decode ->It just retutn the ID/
      req.user = decode
      next();
  }catch(err){
    console.log("Error in auth Token",err)
    return res.status(401).json({
      message : "Error : Invalid Token"
    })
  }

}

export default authUser;