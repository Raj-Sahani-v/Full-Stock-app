import React, { useState, useEffect } from "react";

import axios from "axios";
import { VerticalChart } from "./VerticalChart";

export const Holdings = () => {
  const [allHolder, setAllHolder] = useState([]);
  useEffect(() => {
    const fetchHolding = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/v1/users/allHoldingData",{
            withCredentials:true
          }
        );
        console.log(response);
        setAllHolder(response.data)
      } catch (error) {
        return console.log(error);
      }
    };
    fetchHolding();
  }, []);

  console.log("HolderData : ", allHolder);

  const labels = allHolder.map((subArray) => subArray["name"]);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHolder.map((stock) => stock.price),
        backgroundColor: "orange",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHolder.length})</h3>
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
          {allHolder.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayChange = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {" "}
                  {(curValue - stock.avg * stock.qty).toFixed(2)}{" "}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayChange}>{stock.day}</td>
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
