import { Model, model } from "mongoose";
import { PositionsSchema } from "../schemas/PositionsSchema.js";

export const positionModel = new model("position", PositionsSchema )