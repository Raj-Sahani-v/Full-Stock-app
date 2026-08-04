// import React,{useState} from 'react'
// import { Link } from "react-router";
// import "./BuyActionWindow.css";
// import axios from "axios";
// import { DataContextSymbol } from "./ContextVariable"

// //import {GeneralContext} from "./GeneralContext";
// import { useContext } from 'react';



// export const BuyActionWindow = ({uid}) => {
//   const {allData} = useContext(DataContextSymbol)
//   console.log(allData)

//   const [stockQuantity, setStockQuantity] = useState(1);
//   const [stockPrice, setStockPrice] = useState(allData?.[uid]?.regularMarketPrice.toFixed(4));
//   const [Buy , setBuy ] = useState(null);

//   console.log(uid);

//   const handleBuyClick = async() => {
//     await axios.post("http://localhost:7000/api/v1/users/order", {
//       name: uid,
//       qty: stockQuantity,
//       price: stockPrice,
//       mode: "BUY",
//     });
//   GeneralContext.closeBuyWindow();
    
//   };

//     const handleCancelClick = () => {
//     GeneralContext.closeBuyWindow();
//   };

     
//   return (
//      <div className="container" id="buy-window" draggable="true">
//       <div className="regular-order">
//         <div className="inputs">
//           <fieldset>
//             <legend>Qty.</legend>
//             <input
//               type="number"
//               name="qty"
//               id="qty"
//               min={1}
//               value={stockQuantity}
//               onChange={(e)=>(setStockQuantity(e.target.value))}
              
//             />
//           </fieldset>
//           <fieldset>
//             <legend>Price</legend>
//             <input
//               type="number"
//               name="price"
//               id="price"
//               step="0.05"
//               value={stockPrice}
//               onChange={(e)=>(setStockPrice(e.target.value))}
              
//             />
//           </fieldset>
//         </div>
//       </div>

//       <div className="buttons">
//         <div className='d-flex gap-5' >
//           <span>Avaiable : ₹140.65</span>
//           <span>Required : ₹{(stockQuantity*stockPrice)}</span>

//         </div>
//         <div>
//           <Link className="btn btn-blue" onClick={handleBuyClick} > Buy
//           </Link>
//           <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
//             Cancel
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }
