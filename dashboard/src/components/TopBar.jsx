import React, { useContext, useEffect, useState } from "react";
import { DataContextSymbol } from "./ContextVariable";
import Menu from "../components/Menu";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const TopBar = () => {
  const market = useContext(DataContextSymbol)?.market;
  const [nifty, setNifty] = useState("");
  const [sensex, setSensex] = useState("");

  useEffect(() => {
    if (market && market?.["^NSEI"]) {
      setNifty(market?.["^NSEI"]?.regularMarketPrice);
    }
    if (market && market?.["^BSESN"]) {
      setSensex(market?.["^BSESN"]?.regularMarketPrice);
    }
  }, [market]);
  console.log("market : ", market);
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p
            className="index-points"
            style={{
              fontWeight: "700",
              color:
                market?.["^NSEI"]?.regularMarketChangePercent > 0
                  ? "green"
                  : "red",
            }}
          >
            {nifty}
            <span>
              {" "}
              {market?.["^NSEI"]?.regularMarketChangePercent > 0 ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}{" "}
            </span>
          </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points d-flex align-items-center " style={{
            fontWeight: '700',
            color : market?.['^BSESN']?.regularMarketChangePercent > 0 ? 'green' : 'red'
          }} >
            {sensex}
            <span>
              {" "}
              {market?.["^BSESN"]?.regularMarketChangePercent > 0 ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}{" "}
            </span>
          </p>
          <p className="percent"></p>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default TopBar;
