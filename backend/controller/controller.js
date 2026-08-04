import { HoldingsModel } from "../model/HoldingsModel.js";
import { UserModel } from "../model/UserModel.js";
import { positionModel } from "../model/Positionmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import YahooFinance from "yahoo-finance2";
import { quote } from "yahoo-finance2/modules";
import { watchlist } from "../model/watchlist.model.js";
import { walletModel } from "../model/walletModel.js";
import { OrderModel } from "../model/OrdersModel.js";
import { transactionModel } from "../model/transactionModel.js";

// =========================signup=========================
export const signup = async (req, res) => {
  try {
    const { data } = req.body;
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
        await walletModel.create({
          userId: user._id,
          balance: 100000,
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

    const accessToken = jwt.sign(
      { user: user._id.toString() },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "5m",
      },
    );
    const refreshToken = jwt.sign(
      { user: user._id.toString() },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" },
    );
    user.token = refreshToken;
    user.save();

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ msg: "Login successful", accessToken });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something is wrong", error: err.message });
  }
};
//==================================Refreshing Token ==========================

export const generateRefreshToken = async (req, res) => {
  const token = req.cookies.token;
  console.log("token : ", token);
  if (!token) {
    console.log("token nahi mila");
    return res.status(400).json({ msg: "user is invaild" });
  }

  try {
    const decode = jwt.verify(token, process.env.REFRESH_TOKEN);

    console.log("decode refresh wala : ", decode);
    if (!decode) {
      return res.status(400).json({ msg: "decode nahi hua" });
    }

    const user = await UserModel.findById(decode.user);

    console.log("refresh user :", user);

    if (!user) {
      return res.status(500).json({ msg: "user invaild" });
    }

    if (user.token !== token) {
      return res
        .status(403)
        .json({ msg: "Invaild refresh token please login " });
    }
    const newAccessToken = jwt.sign(
      { user: user._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "5m" },
    );

    const newRefreshToken = jwt.sign(
      { user: user._id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" },
    );
    user.token = newRefreshToken;
    await user.save();

    res.cookie("token", newRefreshToken, {
      httpOnly: true,
      secure: false,
    });
    console.log("new access token ".newAccessToken);
    return res.status(200).json({ msg: "new token generate", newAccessToken });
  } catch (error) {
    return res.status(401).json({ msg: "Invaild user", error });
  }
};

//==================================holding fetch data===================
export const allHoldingData = async (req, res) => {
  try {
    const result = await HoldingsModel.find({ userId: req.userid });
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ msg: `holding error : ${error}` });
  }
};

//==============================All Order data ==========================

export const allOrder = async (req, res) => {
  try {
    const response = await OrderModel.find({ userId: req.userid }).sort({
      createdAt: -1,
    });
    console.log(response);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ msg: "something is wrong " });
  }
};

//=================================All position data========================

export const allPosition = async (req, res) => {
  try {
    const result = await positionModel.find({ userId: req.userid });
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: "somethink is wrong" });
  }
};

//====================NSE-BSE-API===================
//const nse = new NSE('./downloads'); // pass a folder path here

const yahooFinance = new YahooFinance();

export const stockApi = async (req, res) => {
  console.log(req.query.q);
  const userQuery = req.query.q;

  const results = await yahooFinance.search(`${userQuery}.NS`);
  const sym = results.quotes.map((key) => key.symbol);
  console.log(sym[0]);
  const resp = await yahooFinance.quote(sym[0]);
  console.log("quote :", resp);

  //console.log("result : ",results.quotes.map(key=>key.symbol))
  return res.status(200).json({ stockData: results.quotes, detailData: resp });
};

//===========================Date modiafiye==============

const getOneDay = () => {
  const date = new Date();
  //console.log("date",date.setHours(0,0,0,0))
  const day = date.getDay();
  if (day == 0) {
    date.setDate(date.getDate() - 2);
  } else if (day == 6) {
    date.setDate(date.getDate() - 2);
  }
  date.setHours(0, 0, 0, 0);
  return date;
};
getOneDay();

//============================Date Modife ========

const dateNow = (n) => {
  const period1 = new Date();
  period1.setDate(period1.getDate() - n);
  return period1;
};

//====================================================================

let symbol = "TCS.NS";
let period = getOneDay();

//============================Stock full Data chart  ===============

export const stockData = async (req, res) => {
  let { st, p } = req.query;
  symbol = st;
  period = p;
  console.log(st, " p", p);
  const lastDate = getOneDay();
  const date = dateNow(p);
  // console.log(date);

  let periodDate = 7;
  let intvl = "1h";

  if (p == 1) {
    periodDate = lastDate;
  } else {
    periodDate = date;
  }
  if (p == 1) {
    intvl = "5m";
  } else if (p == 7) {
    intvl = "1h";
  } else if (p == 30) {
    intvl = "1d";
  } else if (p == 180) {
    intvl = "1d";
  } else if (p == 365) {
    intvl = "1wk";
  } else {
    intvl = "1mo";
  }

  // console.log(periodDate);
  const oneDay = await yahooFinance.chart(st, {
    period1: periodDate,
    interval: intvl,
  });

  //console.log("one day :",oneDay)
  return res.status(200).json({ oneDay });
};

//==============================================Top Nav bar Data=============

export const MarketData = (io) => {
  setInterval(async () => {
    const symbols = ["^NSEI", "^BSESN", "^NSEBANK", "^CNXIT"];

    // const results = await Promise.allSettled(
    //   symbols.map((symbol) => yahooFinance.quote(symbol))
    // );

    // const data = {};
    // symbols.forEach((symbol, index) => {
    //   if (results[index].status === "fulfilled") {
    //     data[symbol] = results[index].value;

    //   } else {
    //     data[symbol] = null; // ya error message store kar sakte ho
    //     console.log(`Failed to fetch ${symbol}:`, results[index].reason);
    //   }
    // });
    try {
      const quoteData = await yahooFinance.quote(symbols);
      const market = {};
      symbols.forEach((symbol, index) => {
        market[symbol] = Array.isArray(quoteData)
          ? quoteData[index]
          : quoteData;
      });
      io.emit("marketData", market);
    } catch (error) {
      console.log("Market data fetch error:", error);
    }
  }, 60000);
};

export const LiveData = (io) => {
  const liveDataSymbols = new Set();

  const fetchAndEmit = async () => {
    if (liveDataSymbols.size === 0) return;
    try {
      const symbolsArray = Array.from(liveDataSymbols);
      const results = await yahooFinance.quote(symbolsArray);
      const resultsArr = Array.isArray(results) ? results : [results];
      const market = {};
      resultsArr.forEach((item) => {
        market[item.symbol] = item;
      });
      //console.log(market)
      io.emit("liveData", market);
    } catch (error) {
      console.log("LiveData fetch error:", error);
    }
  };

  io.on("connection", (socket) => {
    socket.on("subscribeSymbols", (data) => {
      const { symbols } = data;
      if (Array.isArray(symbols)) {
        symbols.forEach((s) => liveDataSymbols.add(s));
        fetchAndEmit();
      }
    });
  });

  setInterval(fetchAndEmit, 50000);
};

export const LiveChart = (io) => {
  setInterval(async () => {
    const results = await yahooFinance.quote(symbol);
    console.log("live .fglhgcgj .kjh");
    const resultsArr = Array.isArray(results) ? results : [results];

    const market = {};
    resultsArr.forEach((item) => {
      market[item.symbol] = item;
    });

    io.emit("liveChart", market);
  }, 60000);
};

//=============================WatchList========================

export const bookmark = async (req, res) => {
  console.log("hiiii");
  const { wt } = req.query;
  const userId = req.userid;
  try {
    const list = await watchlist.findOne({ userId });
    console.log("........");
    if (!list) {
      await watchlist.create({
        userId: userId,
        symbol: [wt],
      });
      res.status(200).json({
        msg: "new list cread and added",
      });
    } else {
      await watchlist.updateOne(
        { userId: userId },
        {
          $addToSet: {
            symbol: wt,
          },
        },
      );
      console.log("done");
      res.status(200).json({
        msg: "added watchlist",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "something wrong ", error });
  }
  console.log(wt);
};

export const bookmarked = async (req, res) => {
  const list = await watchlist.findOne({ userId: req.userid });
  if (!list) {
    return res.status(500).json({ msg: " list is not found " });
  }
  console.log(list);
  return res.status(200).json({
    listed: list?.symbol,
  });
};

//===========================Wallet==============

export const wallet = async (req, res) => {
  try {
    const request = req.userid;
    console.log("requrst walll", request);
    const data = await walletModel.findOne({ userId: request });
    if (!data) {
      return res.status(400).json({ msg: "walllet is not" });
    }
    console.log("walll", data);
    return res.status(200).json({ msg: "walalal", data });
  } catch (error) {
    return res.status(500).json({ msg: `wallet error : ${error} ` });
  }
};

//=======================new order====================

export const buyOrder = async (req, res) => {
  const { qty, price, data, mode, delMode } = req.body;
  console.log(typeof qty);
  console.log(delMode);
  const totalCost = qty * price;
  console.log(qty, price);
  try {
    if (delMode === 0) {
      if (mode != 0) {
        return res.status(500).json({ msg: "something is wrong " });
      }
      const wallet = await walletModel.findOneAndUpdate(
        { userId: req.userid, balance: { $gte: totalCost } },
        { $inc: { balance: -totalCost } },
        { new: true },
      );
      if (!wallet) {
        return res.status(500).json({ msg: "Insufficient balance" });
      }
      //=============================holding=========

      let holding = await HoldingsModel.findOne({
        userId: req.userid,
        name: data,
      });
      if (holding) {
        const newQty = holding.qty + qty;
        const newAvg = (holding.avg * holding.qty + price * qty) / newQty;
        holding.qty = newQty;
        holding.avg = newAvg;
        await holding.save();
      } else {
        const avg = (price * qty) / qty;
        await HoldingsModel.create({
          userId: req.userid,
          name: data,
          price: price,
          avg: avg,
          qty: qty,
        });
      }

      const newOrder = await OrderModel.create({
        userId: req.userid,
        name: data,
        order_type: delMode,
        qty: qty,
        price: price,
        mode: mode,
      });
      await newOrder.save();

      res
        .status(200)
        .json({ msg: "Buy order successful", balance: wallet.balance });
    }
    //======================================IntraDay = = == = ============================
    if (delMode === 1) {
      console.log("Interday");
      if (mode != 0) {
        return res.status(500).json({ msg: "something is wrong " });
      }
      const wallet = await walletModel.findOneAndUpdate(
        { userId: req.userid, balance: { $gte: totalCost } },
        { $inc: { balance: -totalCost } },
        { new: true },
      );
      console.log("wallet : ", wallet);
      if (!wallet) {
        return res.status(500).json({ msg: "Insufficient balance" });
      }
      //=============================Position=========

      let position = await positionModel.findOne({
        userId: req.userid,
        product: data,
      });
      console.log("position :", position);
      if (position) {
        const newQty = position.qty + qty;
        const newAvg = (position.avg * position.qty + price * qty) / newQty;
        position.qty = newQty;
        position.avg = newAvg;
        await position.save();
      } else {
        //const avg = (price*qty)/qty
        await positionModel.create({
          userId: req.userid,
          product: data,
          qty: qty,
          price: price,
          avg: price,
        });
      }
      const newOrder = await OrderModel.create({
        userId: req.userid,
        name: data,
        order_type: delMode,
        qty: qty,
        price: price,
        mode: mode,
      });
      await newOrder.save();

      res
        .status(200)
        .json({ msg: "Buy order successful", balance: wallet.balance });
    }
  } catch (error) {
    res.status(500).json({ msg: `order error : ${error} ` });
  }
};

//===========================================Sell Order=====================================

export const sellOrder = async (req, res) => {
  const { data, mode, delMode } = req.body;
  const qty = Number(req.body.qty);
  const price = Number(req.body.price);

  if (
    !Number.isFinite(qty) ||
    qty <= 0 ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return res.status(400).json({ msg: "Invalid qty or price" });
  }
  console.log("selling");
  try {
    if (delMode === 0) {
      const holding = await HoldingsModel.findOne({
        userId: req.userid,
        name: data,
      });
      console.log("holding", holding);
      if (!holding || holding.qty < qty) {
        return res.status(400).json({ msg: "Insufficient Quntity" });
      }

      //=======================holding update============ =========
      if (holding.qty === qty) {
        await HoldingsModel.deleteOne({ _id: holding._id });
      } else {
        holding.qty -= qty;
        await holding.save();
      }

      const totalAmount = qty * price;
      //=============wallet amount is credit===================
      const wallet = await walletModel.findOneAndUpdate(
        {
          userId: req.userid,
        },
        { $inc: { balance: totalAmount } },
        { new: true },
      );

      //====================Ordercreate=============
      await OrderModel.create({
        userId: req.userid,
        name: data,
        qty: qty,
        order_type: delMode,
        price: price,
        mode: mode,
      });
    }

    if (delMode === 1) {
      console.log("selling interday");
      if (mode != 1) {
        return res.status(500).json({ msg: " sell request invaild " });
      }
      const positiondata = await positionModel.findOne({
        userId: req.userid,
        product: data,
      });
      console.log(positiondata);
      if (!positiondata || positiondata.qty < qty) {
        return res.status(404).json({ msg: " No Share Present " });
      }
      console.log("position chaned");
      if (positiondata.qty === qty) {
        await positionModel.deleteOne({ _id: positiondata._id });
      } else {
        positiondata.qty -= qty;
        await positiondata.save();
      }
      console.log("wallet credit");
      const totalPrice = qty * price;
      const wallet = await walletModel.findOneAndUpdate(
        {
          userId: req.userid,
        },
        { $inc: { balance: totalPrice } },
        { new: true },
      );

      await OrderModel.create({
        userId: req.userid,
        name: data,
        qty: qty,
        order_type: delMode,
        price: price,
        mode: mode,
      });

      return res.status(200).json({ msg: " successfully " });
    }
  } catch (error) {
    res.status(500).json({ msg: `Something is wrong ${error}` });
  }
};

//=======================================Logout=============================

export const logout = async (req, res) => {
  try {
    await UserModel.findOneAndUpdate(
    { _id: req.userid },
    { $set: { token: null } },
    { new: true },
  );

  const cookiesClear = {
    httpOnly : true,
    secure : false,

  }

  res.clearCookie("token" , cookiesClear).status(200).json({msg : "logout successfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg : "logout nahi hua" , error})
  }
};
