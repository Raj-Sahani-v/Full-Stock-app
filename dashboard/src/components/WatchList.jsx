import React, { useState, useContext, useEffect } from "react";
import { Grow } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
//import { GeneralContext } from "./GeneralContext";
import { DataContextSymbol } from "./ContextVariable";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import BarChartOutlined from "@mui/icons-material/BarChartOutlined";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
//import { watchlist } from "../data";

import { authApi } from "../api";

export const WatchList = () => {
  const {watchlistPrevent, setWatchlistSymbl,accessToken} = useContext(DataContextSymbol) || {} ; 
  const [list, setList] = useState(null);
  useEffect(() => {
    const watchList = async () => {
      const listData = await authApi("/watchlist");
      const watchlist = listData?.data?.listed;
      setList(watchlist);
      setWatchlistSymbl(watchlist);
    };
    watchList();
    console.log(list);
  }, [watchlistPrevent,accessToken]);
  console.log("list : ",list)


  // const labels = watchlist.map((subArray) => subArray["name"]);
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: watchlist.map((stock) => stock.price),
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.5)",
  //         "rgba(54, 162, 235, 0.5)",
  //         "rgba(255, 206, 86, 0.5)",
  //         "rgba(75, 192, 192, 0.5)",
  //         "rgba(153, 102, 255, 0.5)",
  //         "rgba(255, 159, 64, 0.5)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          className="search"
        />
        {list === null ? (
          ""
        ) : (
          <span className="counts"> {list?.length}/50</span>
        )}
      </div>

      <ul className="list">
        {list === null
          ? "save Watchlist "
          : list?.map((stock, index) => {
              //console.log("wkmvekivmeorvnejvk", stock);

              return <WatchListItem stock={stock} key={index} />;
            })}
      </ul>
    </div>
  );
};

export const WatchListItem = ({ stock }) => {
  const allData = useContext(DataContextSymbol)?.allData;
  const setDataForSymbol = useContext(DataContextSymbol)?.setDataForSymbol;

  const [liveData, setLiveData] = useState(allData);

  const [showListAction, setShowListAction] = useState(false);
  const handleMouseEnter = () => {
    setShowListAction(true);
  };
  const handleMouseLeave = () => {
    setShowListAction(false);
  };

  const setsymbols = (st) => {
    setDataForSymbol(st);
  };
  //console.log("fivvkvmvlkdml", allData);
  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setsymbols(stock)}
    >
      <div className="item d-flex align-items-center">
        <div className="d-flex gap-2">
          <p className=" fw-bold ">{stock.replace(".NS", " ")}</p>
          <p>{allData?.[stock]?.fullExchangeName}</p>
        </div>
        <div className="itemInfo ">
          <div className="d-flex align-items-center ">
            <b>{allData?.[stock]?.regularMarketPrice.toFixed(2)}</b>
            <span>
              {" "}
              {allData?.[stock]?.regularMarketChangePercent > 0 ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}{" "}
            </span>
          </div>
          <div className="d-flex">
            <p>{allData?.[stock]?.regularMarketChange.toFixed(2)}</p>
            <p className="percent">
              ({allData?.[stock]?.regularMarketChangePercent.toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>
      {showListAction && <WatchListActions uid={stock} />}
      {/* {showListAction && <BuyAndSell open={true} /> } */}
    </li>
  );
};

export const WatchListActions = ({ uid }) => {
  //const generalContext = useContext(GeneralContext);

  const buyAndSell = useContext(DataContextSymbol)?.buyAndSell;
  const setBuyAndSell = useContext(DataContextSymbol)?.setBuyAndSell;

  console.log(uid);
  const handleBuyClick = () => {
    console.log(buyAndSell);
    setBuyAndSell(true);
    console.log(buyAndSell);
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
          <Button>Buy</Button>
        </Tooltip>

        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          slots={{
            transition: Grow,
          }}
        >
          <Button>Sell</Button>
        </Tooltip>

        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          slots={{
            transition: Grow,
          }}
        >
          <Button className="action">
            {" "}
            <BarChartOutlined />{" "}
          </Button>
        </Tooltip>
        <Tooltip
          title="More"
          placement="top"
          arrow
          slots={{
            transition: Grow,
          }}
        >
          <Button>
            {"  "}
            <MoreHoriz />
            {"  "}
          </Button>
        </Tooltip>
      </span>
    </span>
  );
};
