import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { VerticalChart } from "./VerticalChart";
import { DataContextSymbol } from "./ContextVariable";
import { authApi } from "../api";

export const Holdings = () => {
  const [allHolder, setAllHolder] = useState(null);
  const { allData, accessToken, setAccessToken } =
    useContext(DataContextSymbol) || {} ;
  useEffect(() => {
    const fetchHolding = async () => {
      console.log("holding accesss token", accessToken);
      try {
        const response = await authApi.get("/allHoldingData");
        console.log(response);
        setAllHolder(response.data.result);
        //setHoldingSymbl(response.data)
        // response.data.map((key)=>{
        //   setHoldingSymbl(key.name);
        // })
      } catch (error) {
        console.log(error);
      }
    };
    fetchHolding();
  }, [accessToken]);

  console.log("HolderData : ", allHolder);

  const labels = allHolder?.map((subArray) => subArray["name"]);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHolder?.map((stock) => stock.price),
        backgroundColor: "orange",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHolder?.length})</h3>
      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTD</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>
          {allHolder?.map((stock, index) => {
            const curValue =
              allData?.[stock.name]?.regularMarketPrice * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayChange = stock.isLoss ? "loss" : "profit";
            const netChanges =
              ((allData?.[stock.name]?.regularMarketPrice - stock.avg) /
                stock.avg) *
              100;
            const dayChanges =
              ((allData?.[stock.name]?.regularMarketPrice -
                allData?.[stock.name]?.regularMarketPreviousClose) /
                allData?.[stock.name]?.regularMarketPreviousClose) *
              100;

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{allData?.[stock.name]?.regularMarketPrice.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {" "}
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                  {"%"}
                </td>
                <td className={profClass}>{netChanges?.toFixed(2)}%</td>
                <td className={dayChange}>{dayChanges?.toFixed(2)}%</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalChart data={data} />
    </>
  );
};
