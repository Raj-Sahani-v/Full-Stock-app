import { HoldingsModel } from "../model/HoldingsModel.js";
import { UserModel } from "../model/UserModel.js";
import { positionModel } from "../model/Positionmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// =========================signup=========================
export const signup = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    if (data.password === data.conformPassword) {
      //============hash and Salt ================
      const saltPswd = await bcrypt.genSalt(12);
      const hashPswd = await bcrypt.hash(data.password, saltPswd);
      console.log(hashPswd);
      if (data.term) {
        const user = await UserModel.create({
          phone: data.phone,
          password: hashPswd,
          term: data.term,
        });
        console.log("from data : ", user);
        return res.status(201).json({ msg: "Signup successful", user });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong ", error: error.message });
  }
};

// ================================Login ==========================
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await UserModel.findOne({ phone: userName });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const checkPswd = await bcrypt.compare(password, user.password);

    if (!checkPswd) {
      return res.status(401).json({ msg: "Password is incorrect" });
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,         
      sameSite: "lax",  
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ msg: "Login successful" });
  } catch (err) {
    return res.status(500).json({ msg: "Something is wrong", error: err.message });
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
  console.log(result)
  res.status(200).json(result);
};
