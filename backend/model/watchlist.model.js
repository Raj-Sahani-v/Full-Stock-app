import { model } from "mongoose";
import { watchList } from "../schemas/watchList.js";

export const watchlist = new model('watchlist', watchList);