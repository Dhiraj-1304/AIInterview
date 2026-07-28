import jwt from "jsonwebtoken"

const authUser = (req, res, next)=>{
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
      message : "Unauthorized"
    })
  }
  try{
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    //remaining code for the middleware
  }catch(err){
  }
}