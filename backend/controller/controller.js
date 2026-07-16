import { HoldingsModel } from "../model/HoldingsModel.js";
import { UserModel } from "../model/UserModel.js";

// =========================signup=========================
export const signup = async (req, res) => {
  try {
    const data = req.body;
  console.log(data)
  if (data.password === data.conformPassword) {
    if (data.term) {
      const user = await UserModel.create({
        phone: data.phone,
        password: data.password,
        term: data.term,
      }); 
      console.log("from data : ", user);
      return res.status(201).json({msg:"Signup successful",user})
    }
  }
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg:"Something went wrong ", error : error.message})
  }
};

//==================================holding fetch data===================
export const allHoldingData = async (req, res) => {
  const result = await HoldingsModel.find({});

  //console.log("Data is done",result);
  res.json(result);
};

//=================================All position data========================

export const allPosition = async (req, res) => {
  const result = await positionModel.find({});
  res.json(result);
};
