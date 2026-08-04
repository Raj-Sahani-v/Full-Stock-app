// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { ChartStock } from "../chart/ChartStock";
// import { DataContextSymbol } from "../ContextVariable";

// const timeRanges = [
//   { label: "1D", value: 1 },
//   { label: "1W", value: 7 },
//   { label: "1M", value: 30 },
//   { label: "6M", value: 180 },
//   { label: "1Y", value: 365 },
//   { label: "ALL", value: 5000 },
// ];

// export const FullChart = () => {
//   const [chartData, setChartData] = useState([]);
//   const [btn, setBtn] = useState(7);
//   const { dataForSymbol } = useContext(DataContextSymbol);

//   const btnHandle = (value) => {
//     setBtn(value); 
//   };

//   useEffect(() => {
//     if (!dataForSymbol) return;

    
//     const stockData = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:7000/api/v1/users/stockname?st=${dataForSymbol}&p=${btn}`
//         );
//         const chartdata = res.data.oneDay.quotes;
//         setChartData(chartdata);
//       } catch (error) {
//         console.log("error", error);
//       }
//     };
//     stockData();
//   }, [btn, dataForSymbol]);

//   useEffect(()=>{

//   },[]);

//   return (
//     <div style={{ width: "100%" }}>
      
//       <div
//         style={{
//           width: "100%",
//           height: "clamp(300px, 55vh, 550px)",
//         }}
//       >
//         <ChartStock forCandle={chartData} />
//       </div>

//       <div
//         className="d-flex gap-2 mt-2"
//         style={{ flexWrap: "wrap", justifyContent: "center" }}
//       >
//         {timeRanges.map((range) => (
//           <button
//             key={range.value}
//             onClick={() => btnHandle(range.value)}
//             style={{
//               padding: "6px 14px",
//               borderRadius: "6px",
//               border: "1px solid #ccc",
//               background: btn === range.value ? "#0d6efd" : "white",
//               color: btn === range.value ? "white" : "black",
//               cursor: "pointer",
//               fontWeight: btn === range.value ? "bold" : "normal",
//               transition: "all 0.2s ease",
//             }}
//           >
//             {range.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };


import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ChartStock } from "../chart/ChartStock";
import { DataContextSymbol } from "../ContextVariable";

const timeRanges = [
  { label: "1D", value: 1 },
  { label: "1W", value: 7 },
  { label: "1M", value: 30 },
];

export const FullChart = () => {
  const [chartData, setChartData] = useState([]);
  const [btn, setBtn] = useState(7);
  const dataForSymbol = useContext(DataContextSymbol)?.dataForSymbol
  const market = useContext(DataContextSymbol)?.market;

  
  useEffect(() => {
    if (!dataForSymbol) return;

    const fetchChartData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7000/api/v1/users/stockname?st=${dataForSymbol}&p=${btn}`
        );
        setChartData(res.data.oneDay.quotes);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchChartData();
  }, [btn, dataForSymbol]);
// Symbol socket (live price ke liye)
  // useEffect(() => {
  //   if (!socket || !dataForSymbol) return;
  //   socket.emit("subscribeSymbol", dataForSymbol);
  // }, [socket, dataForSymbol]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%", height: "500px" }}>
        <ChartStock forCandle={chartData} livePrice={market?.[dataForSymbol]} />
      </div>

      <div className="d-flex gap-2 mt-2" style={{ justifyContent: "center" }}>
        {timeRanges.map((range) => (
          <button key={range.value} onClick={() => setBtn(range.value)}>
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};