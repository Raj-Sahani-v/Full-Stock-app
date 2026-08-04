import { model } from "mongoose";
import { walletSchema } from "../schemas/WalletSchema.js";
 
export const walletModel = new model( 'wallet', walletSchema);