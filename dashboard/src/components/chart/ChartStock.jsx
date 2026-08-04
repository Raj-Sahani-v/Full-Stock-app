// // import React from "react";
// // import { CandlestickSeries, createChart } from "lightweight-charts";
// // import { useRef, useEffect } from "react";
// // //import DataContextSymbol  from "../ContextVariable";

// // export const ChartStock = ({ forCandle }) => {

  

// //   console.log("for candle", forCandle);
// //   const chartContainerRef = useRef();
// //   console.log(createChart);

// //   useEffect(() => {
// //     const chart = createChart(chartContainerRef.current, {
// //   width: 200,
// //   height: 600,
// //   timeScale: {
// //     timeVisible: true,
// //     secondsVisible: false,
// //     tickMarkFormatter: (time) => {
// //       const date = new Date(time * 1000);
// //       return date.toLocaleTimeString('en-IN', {
// //         hour: '2-digit',
// //         minute: '2-digit',
// //         hour12: false,
// //         timeZone: 'Asia/Kolkata',
// //       });
// //     },
// //   },
// //   localization: {
// //     timeFormatter: (time) => {
// //       const date = new Date(time * 1000);
// //       return date.toLocaleString('en-IN', {
// //         day: '2-digit',
// //         month: 'short',
// //         hour: '2-digit',
// //         minute: '2-digit',
// //         hour12: false,
// //         timeZone: 'Asia/Kolkata',
// //       });
// //     },
// //   },
// // });
// //     console.log(chartContainerRef.current);
// //     const candlestickSeries = chart.addSeries(CandlestickSeries, {
// //       upColor: "#26a69a",
// //       downColor: "#ef5350",
// //       borderVisible: false,
// //       wickUpColor: "#26a69a",
// //       wickDownColor: "#ef5350",
// //     });

// //     const forCandleData = forCandle.map((item) => ({
// //       time: Math.floor(new Date(item.date).getTime() / 1000),
// //       open: item.open,
// //       close: item.close,
// //       high: item.high,
// //       low: item.low,
// //     }));
// //     console.log("new ", forCandleData);
// //     candlestickSeries.setData(forCandleData);

// //     chart.timeScale().fitContent();
// //     return () => chart.remove();
// //   }, [forCandle]);

// //   return (
// //     <div
// //       ref={chartContainerRef}
// //       style={{ height: "530px", width: "400px",minWidth:"700px" }}
// //     ></div>
// //   );
// // };
// //

// import React, { useEffect, useRef } from "react";
// import { CandlestickSeries, createChart } from "lightweight-charts";

// export const ChartStock = ({ forCandle, livePrice }) => {
//   const chartContainerRef = useRef();
//   const seriesRef = useRef();
//   const lastCandleRef = useRef(null);

//   console.log('Live',livePrice)
//   console.log('for candle',forCandle)

//   // Historical data load
//   useEffect(() => {
//     if (!chartContainerRef.current) return;

//     const chart = createChart(chartContainerRef.current, {
//       width: chartContainerRef.current.clientWidth,
//       height: chartContainerRef.current.clientHeight,
//       timeScale: { timeVisible: true, secondsVisible: false },
//     });

//     const candlestickSeries = chart.addSeries(CandlestickSeries, {
//       upColor: "#26a69a",
//       downColor: "#ef5350",
//       borderVisible: false,
//       wickUpColor: "#26a69a",
//       wickDownColor: "#ef5350",
//     });

//     seriesRef.current = candlestickSeries;

//     const formattedData = (forCandle || []).map((item) => ({
//       time: Math.floor(new Date(item.date).getTime() / 1000),
//       open: item.open,
//       close: item.close,
//       high: item.high,
//       low: item.low,
//     }));
//     console.log("formetd",formattedData)

//     if (formattedData.length > 0) {
//       candlestickSeries.setData(formattedData);
//       chart.timeScale().fitContent();
//       lastCandleRef.current = formattedData[formattedData.length - 1];
//     }

//     const resizeObserver = new ResizeObserver((entries) => {
//       const { width, height } = entries[0].contentRect;
//       chart.applyOptions({ width, height });
//     });
//     resizeObserver.observe(chartContainerRef.current);

//     return () => {
//       resizeObserver.disconnect();
//       chart.remove();
//     };
//   }, [forCandle]);

//   // Live price se last candle update
//   useEffect(() => {
//     if (!seriesRef.current || !livePrice?.regularMarketPrice || !lastCandleRef.current) return;

//     const price = livePrice.regularMarketPrice;
//     const last = lastCandleRef.current;

//     const updatedCandle = {
//       time: last.time,
//       open: last.open,
//       high: Math.max(last.high, price),
//       low: Math.min(last.low, price),
//       close: price,
//     };

//     seriesRef.current.update(updatedCandle);
//     lastCandleRef.current = updatedCandle;
//   }, [livePrice]);

//   return (
//     <div
//       ref={chartContainerRef}
//       style={{ width: "100%", height: "100%", minHeight: "400px" }}
//     ></div>
//   );
// };
import React, { useEffect, useRef } from "react";
import { CandlestickSeries, createChart } from "lightweight-charts";

export const ChartStock = ({ forCandle, livePrice }) => {
  const chartContainerRef = useRef();
  const seriesRef = useRef();
  const lastCandleRef = useRef(null);

  // Historical data load
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time) => {
          const date = new Date(time * 1000);
          return date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Kolkata", // ✅ wapas add kiya
          });
        },
      },
      localization: {
        timeFormatter: (time) => {
          const date = new Date(time * 1000);
          return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Kolkata", // ✅ wapas add kiya
          });
        },
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    seriesRef.current = candlestickSeries;

    const formattedData = (forCandle || []).map((item) => ({
      time: Math.floor(new Date(item.date).getTime() / 1000),
      open: item.open,
      close: item.close,
      high: item.high,
      low: item.low,
    }));

    if (formattedData.length > 0) {
      candlestickSeries.setData(formattedData);
      chart.timeScale().fitContent();
      lastCandleRef.current = formattedData[formattedData.length - 1];
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.applyOptions({ width, height });
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [forCandle]);

  // Live price se last candle update
  useEffect(() => {
    if (!seriesRef.current || !livePrice?.regularMarketPrice || !lastCandleRef.current) return;

    const price = livePrice.regularMarketPrice;
    const last = lastCandleRef.current;

    const updatedCandle = {
      time: last.time,
      open: last.open,
      high: Math.max(last.high, price),
      low: Math.min(last.low, price),
      close: price,
    };

    seriesRef.current.update(updatedCandle);
    lastCandleRef.current = updatedCandle;
  }, [livePrice]);

  return (
    <div
      ref={chartContainerRef}
      style={{ width: "100%", height: "100%", minHeight: "400px" }}
    ></div>
  );
};