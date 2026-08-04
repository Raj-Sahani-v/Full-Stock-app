import { Router } from "express";
import {
  allHoldingData,
  allPosition,
  bookmark,
  login,
  MarketData,
  signup,
  stockApi,
  stockData,
  bookmarked,
  wallet,
  buyOrder,
  allOrder,
  sellOrder,
  generateRefreshToken,
  logout,
} from "../controller/controller.js";
import { autherized } from "../Middleware/auth.js";

export const routing = Router();
routing.route("/signup").post(signup);
routing.route("/login").post(login);
routing.route("/stock").get(stockApi);
routing.route("/stockname").get(stockData);
routing.route("/market").get(MarketData);
routing.route("/wallet").get(autherized, wallet);
routing.route("/buyOrder").post(autherized, buyOrder);
routing.route("/sellOrder").post(autherized, sellOrder);
routing.route("/watchlist").post(autherized, bookmark);
routing.route("/watchlist").get(autherized, bookmarked);
routing.route("/refresh").post(generateRefreshToken);
routing.route("/allHoldingData").get(autherized, allHoldingData);
routing.route("/allOrderData").get(autherized, allOrder);
routing.route("/allPosition").get(autherized, allPosition);
routing.route("/logout").post(autherized, logout);
