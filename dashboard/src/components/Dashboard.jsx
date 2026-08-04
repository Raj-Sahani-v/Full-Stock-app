import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Summary from "../components/Summary";
import Orders from "../components/Orders";
// import Holding from "../components/Holding"
import Positions from "../components/Positions";
import Funds from "../components/Funds";
import Apps from "../components/Apps";
import { Holdings } from "./Holdings";
import { WatchList } from "./WatchList";
//import {GeneralContextProvider} from './GeneralContext'
import { FullChart } from "./UI/FullChart";
import { Account } from "./Account";
import { Protected } from "./Protected";

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
        
        <WatchList />
      

      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={  <Protected>
            <Holdings />
          </Protected> } />
          <Route path="/positions" element={<Positions />} />
          <Route path="/profile" element={<Account/>} />
          <Route path="/chart" element={<FullChart/>} />
        </Routes>
      </div>
    </div>
  );
};
