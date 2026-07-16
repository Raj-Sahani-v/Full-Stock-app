import React from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import axios from 'axios';
import { useState } from "react";


const Orders = () => {
  const [orderData , setOrderData] = useState([]);
  useEffect(()=>{
    axios
      .get("http://localhost:7000/order")
      .then((res)=>{console.log(res.data)
        setOrderData(res.data)
      } )
      .catch(err => console.error(err));
  },[])
  return (
    <div className="order-table">
      <table>
        <thead>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
      
        {orderData.map((value,index)=>{
          console.log(value);
          return <tr>
            <td>{value.name}</td>
            <td>{value.qty}</td>
            <td>{value.price}</td>
            <td>{value.mode}</td>
          </tr>
        })}
    
        </tbody>
      </table>
      {/* <div className="no-orders">
        <p>You haven't placed any orders today</p>

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div> */}
    </div>
  );
};

export default Orders;
