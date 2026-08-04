// import axios from "axios";
// import React, { createContext, useEffect, useState, useRef } from "react";
// //import { authApi } from "../api";

// import { io } from "socket.io-client";
// import { BuyAndSell } from "./BuyAndSell";
// import { authApi, tokenHandler } from "../api";

// export const DataContextSymbol = createContext();

// export const ContextVariable = ({ children }) => {
//   const [dataForSymbol, setDataForSymbol] = useState("TCS.NS");
//   const [allSymbol, setAllSymbol] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [market, setMarket] = useState("");
//   const [allData, setAllData] = useState(null);
//   const [chartData, setChartData] = useState(null);
//   const [watchlistPrevent, setWatchlistPrevent] = useState(0);
//   const [holdingSymbl, setHoldingSymbl] = useState([]);
//   const [watchlistSymbl, setWatchlistSymbl] = useState([]);
//   const [buyAndSell, setBuyAndSell] = useState(false);
//   const [wallet, setWallet] = useState(null);
//   const [accessToken, setAccessTokenState] = useState("");
//   const [loading, setLoading] = useState(true);

//   //========================interceptor token handle=================================
//   const accessTokenRef = useRef("");
 
//   const setAccessToken = (token) => {
//     accessTokenRef.current = token; 
//     setAccessTokenState(token);
//   }

//     useEffect(() => {
//     tokenHandler(
//       () => accessToken,
//       (token) => setAccessToken(token),
//     );
//     console.log(accessToken);
//   }, [accessToken]);
//   //====================AccessToken====================

//   useEffect(() => {
//     const loginSession = async () => {
//       try {
//         const res = await axios.post(
//           "http://localhost:7000/api/v1/users/refresh",
//           {},
//           { withCredentials: true },
//         );
//         setAccessToken(res.data.newAccessToken);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loginSession();
//   }, []);
//   console.log(accessToken);

//   //==================Socket.io connection =======================
//   useEffect(() => {
//     const newSocket = io("http://localhost:7000", {
//       withCredentials: true,
//     });

//     setSocket(newSocket);

//     newSocket.on("connect", () => {
//       console.log("Socket id:", newSocket.id);
//     });

//     newSocket.on("marketData", (data = "j") => {
//       console.log("marketData:", data);
//       setMarket(data);
//     });

//     newSocket.on("liveChart", (data) => {
//       console.log("Chart Live:", data);
//       setChartData(data);
//     });

//     newSocket.on("liveData", (data) => {
//       console.log("All symbol live data:", data);
//       setAllData(data);
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   console.log("addDatrdg",allData)

//   useEffect(() => {
//     if (!socket) return;

//     const holdingSy = holdingSymbl.map((item) => `${item.name}.NS`);
//     const combineSy = [...new Set([...holdingSy,...watchlistSymbl])];

//     console.log("wwwwww", watchlistSymbl);
//     console.log("cobine", combineSy);

//     if (combineSy.length > 0) {
//       socket.emit("subscribeSymbols", { symbols: combineSy });
//     }
//   }, [socket, holdingSymbl, watchlistSymbl]);

  

//   useEffect(() => {
//     if (!accessToken) {
//       return;
//     }
//     const walletData = async () => {
//       try {
//         console.log("acceesssssss token ::", accessToken);
//         const respone = await authApi("/wallet");
//         console.log("walllet", respone);
//         setWallet(await respone?.data?.data?.balance);
//       } catch (error) {
//         console.log("walllet errror", error);
       
//       }
//     };
//     walletData();
//   }, [accessToken]);






//   return (
//     <DataContextSymbol.Provider
//       value={{
//         accessToken,
//         accessTokenRef,
//         setAccessToken,
//         dataForSymbol,
//         setDataForSymbol,
//         market,
//         setMarket,
//         socket,
//         setAllSymbol,
//         watchlistPrevent,
//         setWatchlistPrevent,
//         setHoldingSymbl,
//         setWatchlistSymbl,
//         allData,
//         chartData,
//         buyAndSell,
//         setBuyAndSell,
//         setWallet,
//         wallet,
//         loading,
//         setLoading,
//       }}
//     >
//       {children}
//       <BuyAndSell open={buyAndSell} data={dataForSymbol} />
//     </DataContextSymbol.Provider>
//   );
// };


import axios from "axios";
import React, { createContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { BuyAndSell } from "./BuyAndSell";
import { authApi, tokenHandler, refreshAccessToken } from "../api";   // ⭐ refreshAccessToken import kiya

export const DataContextSymbol = createContext();

export const ContextVariable = ({ children }) => {
  const [dataForSymbol, setDataForSymbol] = useState("TCS.NS");
  const [allSymbol, setAllSymbol] = useState([]);
  const [socket, setSocket] = useState(null);
  const [market, setMarket] = useState("");
  const [allData, setAllData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [watchlistPrevent, setWatchlistPrevent] = useState(0);
  const [holdingSymbl, setHoldingSymbl] = useState([]);
  const [watchlistSymbl, setWatchlistSymbl] = useState([]);
  const [buyAndSell, setBuyAndSell] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [accessToken, setAccessTokenState] = useState("");
  const [loading, setLoading] = useState(true);

  //========================interceptor token handle=================================
  const accessTokenRef = useRef("");

  const setAccessToken = (token) => {
    accessTokenRef.current = token;
    setAccessTokenState(token);
  };

  useEffect(() => {
    tokenHandler(
      () => accessTokenRef.current,   // ⭐ ref use kiya, stale closure ka issue nahi rahega
      (token) => setAccessToken(token)
    );
  }, []);   // ⭐ dependency [] — sirf ek baar register hona chahiye
  //====================AccessToken====================

  useEffect(() => {
    // ⭐ ab apna alag axios.post nahi, api.js ka shared refreshAccessToken use kiya
    refreshAccessToken()
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  //==================Socket.io connection =======================
  useEffect(() => {
    const newSocket = io("http://localhost:7000", {
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket id:", newSocket.id);
    });

    newSocket.on("marketData", (data = "j") => {
      setMarket(data);
    });

    newSocket.on("liveChart", (data) => {
      setChartData(data);
    });

    newSocket.on("liveData", (data) => {
      setAllData(data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const holdingSy = holdingSymbl.map((item) => `${item.name}.NS`);
    const combineSy = [...new Set([...holdingSy, ...watchlistSymbl])];

    if (combineSy.length > 0) {
      socket.emit("subscribeSymbols", { symbols: combineSy });
    }
  }, [socket, holdingSymbl, watchlistSymbl]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    const walletData = async () => {
      try {
        const respone = await authApi("/wallet");
        setWallet(await respone?.data?.data?.balance);
      } catch (error) {
        console.log("wallet error", error);
      }
    };
    walletData();
  }, [accessToken]);

  return (
    <DataContextSymbol.Provider
      value={{
        accessToken,
        accessTokenRef,
        setAccessToken,
        dataForSymbol,
        setDataForSymbol,
        market,
        setMarket,
        socket,
        setAllSymbol,
        watchlistPrevent,
        setWatchlistPrevent,
        setHoldingSymbl,
        setWatchlistSymbl,
        allData,
        chartData,
        buyAndSell,
        setBuyAndSell,
        setWallet,
        wallet,
        loading,
        setLoading,
      }}
    >
      {children}
      <BuyAndSell open={buyAndSell} data={dataForSymbol} />
    </DataContextSymbol.Provider>
  );
};