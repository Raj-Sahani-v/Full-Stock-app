import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { DataContextSymbol } from "../ContextVariable";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { authApi } from "../../api";
//import { BuyActionWindow } from "../BuyActionWindow";

export const LiveSerch = () => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [dtData, setDtData] = useState({});
  const [loading, setLoading] = useState(false);
  const setDataForSymbol = useContext(DataContextSymbol)?.setDataForSymbol;
  const watchlistPrevent = useContext(DataContextSymbol)?.watchlistPrevent;
  const setWatchlistPrevent =
    useContext(DataContextSymbol)?.setWatchlistPrevent;
  const searchRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!search) {
      setSearchData([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      liveSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const liveSearch = async (query) => {
    try {
      const response = await authApi.get(`/stock?q=${query}`);

      const stocks = response.data.stockData || [];
      const dtStock = response.data.detailData || {};
      console.log("1212", response);
      setSearchData(stocks);
      setDtData(dtStock);
      setShowDropdown(true);

      if (stocks.length > 0) {
        setDataForSymbol(stocks[0].symbol);
      }
    } catch (error) {
      console.log(error);
      setSearchData([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSearchData([]);
    setShowDropdown(false);
  };

  const bookmark = async (wt) => {
    try {
      console.log("wt", wt);
      const response = await authApi.post(
        `http://localhost:7000/api/v1/users/watchlist?wt=${wt}`,
        {},
      );
      console.log(response);
      console.log("Done watchlist");
      setWatchlistPrevent(watchlistPrevent + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div ref={searchRef} style={{ position: "relative", width: "270px" }}>
      <div className="d-flex align-items-center border rounded px-2 py-1 bg-white shadow-sm">
        <i className="fa-solid fa-magnifying-glass text-muted me-2"></i>
        <input
          className="form-control border-0 shadow-none"
          id="searchbar"
          type="search"
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => search && setShowDropdown(true)}
        />
        {search && (
          <i
            className="fa-solid fa-xmark text-muted"
            style={{ cursor: "pointer" }}
            onClick={clearSearch}
          ></i>
        )}
      </div>

      {showDropdown && (
        <div
          className="bg-white border rounded shadow"
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            width: "200%",
            maxHeight: "400px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {loading ? (
            <p className="p-3 mb-0 text-muted">Loading...</p>
          ) : searchData.length === 0 ? (
            <p className="p-3 mb-0 text-muted">No results found</p>
          ) : (
            searchData.map((item) => (
              <div className="d-flex" >
              <Link
                key={item.symbol}
                to={`/chart`}
                className="d-flex align-items-center gap-2 p-2 text-decoration-none text-dark"
                style={{ borderBottom: "1px solid #eee" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "white")
                }
                onClick={() => setShowDropdown(false)}
              >
                <div className="d-flex gap-3 align-items-center">
                  <span
                    className="badge bg-secondary d-flex align-items-center "
                    style={{
                      alignItems: "center",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    {dtData?.quoteType === "EQUITY" ? "EQ" : "--"}
                  </span>
                  <div className="flex-grow-1">
                    <div className="fw-bold">{item.symbol}</div>
                    <div className="d-flex">
                      <span className="text-muted">{item.longname}</span>
                      <span className="text-muted badge fs-6 ">
                        {item.exchDisp}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex gap-3 ">
                    <div>
                      <span
                        className="fw-bold d-flex align-items-center gap-1"
                        style={{
                          color:
                            dtData?.regularMarketChangePercent > 0
                              ? "rgb(2, 134, 2)"
                              : "red",
                        }}
                      >
                        {dtData?.regularMarketPrice?.toFixed(2) ?? "--"}
                        {dtData?.regularMarketChangePercent >= 0 ? (
                          <i
                            className="fa-solid fa-caret-up"
                            style={{ lineHeight: 1 }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-caret-down"
                            style={{ lineHeight: 1 }}
                          ></i>
                        )}
                      </span>
                    </div>
                    
                    <div className="d-flex gap-2">
                      <span>{dtData.regularMarketChange.toFixed(2)}</span>
                      <span>
                        ({dtData.regularMarketChangePercent.toFixed(2)}%)
                      </span>
                    </div>
                   
                  </div>
                </div>
              </Link>
               <span className="d-flex gap-2" >
                      <button>Buy</button>
                      <button>Sell</button>
                      <TurnedInNotIcon onClick={() => bookmark(item.symbol)} />
                    </span>
              </div>
            ))
          )}
        </div>
      )}
      {/* <BuyActionWindow uid={""} /> */}
    </div>
  );
};
