import jwt from "jsonwebtoken";

export const generateJwtToken = (user)=>{
  return jwt.sign({
    id : user._id,
    username : user.username,
  }, 
  process.env.JWT_SECRET,
  {
    expiresIn : "1d"
  }
)
}