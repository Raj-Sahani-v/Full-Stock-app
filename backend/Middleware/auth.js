import jwt from "jsonwebtoken";
export const autherized = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("auth :", token);
    const decode = jwt.verify(token, process.env.JWT);
    console.log("decode : ", decode);
    req.userid = decode.id;
    next();
  } catch (err) {
    return res.status(500).json({ msg: "Something is worng ", err });
  }
};
