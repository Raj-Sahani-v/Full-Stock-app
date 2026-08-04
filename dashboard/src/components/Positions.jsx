import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
//import { positions } from "../data";
import { DataContextSymbol } from "./ContextVariable";
import { authApi } from "../api";

const Positions = () => {
  const { allData } = useContext(DataContextSymbol) || {} ;
  const [allPosition, setAllPosition] = useState([]);
  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const positionData = await authApi(
          "/allPosition"
        );
        console.log("data position : ", positionData);
        setAllPosition(positionData.data);
      } catch (error) {
        return console.log(error);
      }
    };
    fetchPosition();
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPosition?.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {allPosition.map((stock, index) => {
            const curValue = allData?.[stock.product]?.regularMarketPrice * stock.qty;

            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";
            const dayChanges =
              ((allData?.[stock.product]?.regularMarketPrice -
                allData?.[stock.product]?.regularMarketPreviousClose) /
                allData?.[stock.product]?.regularMarketPreviousClose) *
              100;

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={dayClass}>{dayChanges.toFixed(2)}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
