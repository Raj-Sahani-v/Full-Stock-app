import { model } from "mongoose";
import { transactionSchema } from "../schemas/TransactionSchema.js";

export const transactionModel = new model('transaction', transactionSchema);