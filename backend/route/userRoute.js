import { Router } from "express";
import { allHoldingData, allPosition, login, signup } from "../controller/controller.js";
import { autherized } from "../Middleware/auth.js";

export const routing = Router();
routing.route("/signup").post(signup);
routing.route('/login').post(login);
routing.route("/allHoldingData").get(autherized,allHoldingData);
routing.route("/allPosition").get(autherized,allPosition);