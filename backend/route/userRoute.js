import { Router } from "express";
import { allHoldingData, allPosition, signup } from "../controller/controller.js";

export const routing = Router();
routing.route("/signup").post(signup);
routing.route("/allHoldingData").get(allHoldingData);
routing.route("/allpostion").get(allPosition);