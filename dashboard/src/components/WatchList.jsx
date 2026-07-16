import React, { useState,useContext } from "react";
import { Grow } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import {GeneralContext} from "./GeneralContext";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { watchlist } from "../data";
import { DoughnutChart } from "./DoughnutChart";

export const WatchList = () => {

  const labels = watchlist.map((subArray)=>subArray["name"]);
  const data = {
    labels,
  datasets: [
    {
      label: '# of Votes',
      data: watchlist.map((stock)=>stock.price),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts">{watchlist.length}/50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>
      <DoughnutChart  data={data} />
    </div>
  );
};

export const WatchListItem = ({ stock }) => {
  const [showListAction, setShowListAction] = useState(false);
  const handleMouseEnter = () => {
    setShowListAction(true);
  };
  const handleMouseLeave = () => {
    setShowListAction(false);
  };
  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="down" />
          )}
        </div>
      </div>
      {showListAction && <WatchListActions uid={stock.name} />}
    </li>
  );
};

export const WatchListActions = ({ uid }) => {

  const generalContext = useContext(GeneralContext);

   const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };
  return (
    <span>
      <span>
        {/* <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
  <button className="buy">Buy</button>
</Tooltip> */}
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          slots={{
            transition: Grow,
          }}
          onClick={handleBuyClick}
        >
          <Button  >Buy</Button>
        </Tooltip>
      
          <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          slots={{
            transition: Grow,
          }}
        >
          <Button  >Sell</Button>
        </Tooltip>
      
          <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          slots={{
            transition: Grow,
          }}
        >
          <Button className="action"  > <BarChartOutlined   /> </Button>
        </Tooltip>
        <Tooltip
          title="More"
          placement="top"
          arrow
          slots={{
            transition: Grow,
          }}
        >
          <Button  > <MoreHoriz /> </Button>
        </Tooltip>
      </span>

    </span>
  );
};
