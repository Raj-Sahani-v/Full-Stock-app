import { Model,model } from "mongoose";
import { OrdersSchema } from "../schemas/OrdersSchema.js";
export const OrderModel = new model("order", OrdersSchema);