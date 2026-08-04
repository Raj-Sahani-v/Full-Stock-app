import React from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { useState } from "react";
import { authApi } from "../api";

const Orders = () => {
  const [orderData, setOrderData] = useState(null);
  useEffect(() => {
    const ordData = async () => {
      const res = await authApi(
        "/allOrderData"
      );
      console.log(res);
      setOrderData(res?.data?.response);
    };
    ordData();
  }, []);
  return (
    <div className="order-table">
      {orderData === null ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>INT/DEL </th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.map((value) => {
              console.log(value);
              return (
                <tr>
                  <td>{value.name}</td>
                  <td>{value?.order_type == 0 ? "DEL" : "INT"}</td>
                  <td>{value.qty}</td>
                  <td>{value.price}</td>
                  <td>{value.mode===0? <span style={{color:'green',
                    fontWeight:'700'
                  }} > BUY </span> : <span style={{color:'red',fontWeight:'700'}} > SELL </span> }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
