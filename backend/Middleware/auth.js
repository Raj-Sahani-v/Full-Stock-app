import jwt from "jsonwebtoken";
export const autherized = async (req, res, next) => {
  const authToken = req.headers.authorization;
  console.log("authToken :",authToken);
  if(!authToken || !authToken.startsWith("Bearer ")){
    return res.status(401).json({msg : "token not provide"})
  }
  const token = authToken.split(" ")[1];
  console.log("auth Token : ",token);
  if (!token) {
    return res.status(401).json({ msg: "unauthorized Access token is not provide " });
  }
  try {
    console.log("auth :", token);
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log("decode : ", decode);
    
    req.userid = decode.user;
    console.log(req.userid);
    next();
  } catch (err) {
    console.log(err.name);
    if(err.name === "TokenExpiredError"){
      return res.status(401).json({msg :"token is expire"})
    }
    return res.status(401).json({msg :"invaild token"});
  }
};
