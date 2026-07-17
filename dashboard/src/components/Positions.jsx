import React, { useState, useEffect } from "react";
import axios from "axios";
//import { positions } from "../data";

const Positions = () => {
  const [allPosition, setAllPosition] = useState([]);
  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const positionData = await axios.get(
          "http://localhost:7000/api/v1/users/allPosition",{
            withCredentials:true
          }
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
      <h3 className="title">Positions ({allPosition.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {allPosition.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
