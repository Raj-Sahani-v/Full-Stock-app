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
import {GeneralContextProvider} from './GeneralContext'

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
              <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};
