import { Button } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { DataContextSymbol } from "./ContextVariable";
import "./buyAndSell.css";
import axios from "axios";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { green } from "@mui/material/colors";
import { authApi } from "../api";

export const BuyAndSell = ({ open, data }) => {
  const { buyAndSell, setBuyAndSell, allData, wallet ,setWallet} =
    useContext(DataContextSymbol);

  const currentPrice = allData?.[data]?.regularMarketPrice?.toFixed(3);
  console.log(currentPrice);

  const [mode, setMode] = useState(0);
  const [delMode, setDelMode] = useState(0);
  const [price, setPrice] = useState(currentPrice);
  const [qty, setQty] = useState(0);
  const [loading, setLoading] = useState(false);

  console.log("", price);

  const onOrder = async () => {
    console.log("pending wait");
    setLoading(true);
    try {
      if (mode === 0) {
        console.log("Buy");
        if (qty * price <= wallet) {
          const response = await authApi.post("/buyOrder", {
            qty: Number(qty),
            price: Number(price),
            data,
            mode: Number(mode),
            delMode: Number(delMode),
          });
          console.log("Payment : ", response);
          if (await response) {
            setWallet(response.data.balance)
            setQty(0);
          }
        }
      } else {
        console.log("sell");
        const response = await authApi.post("/sellOrder", {
          qty: Number(qty),
          price: Number(price),
          data,
          mode: Number(mode),
          delMode: Number(delMode),
        });
        console.log("Payment sell : ", response);
        if (await response) {
          setQty(0);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPrice) {
      setPrice(currentPrice);
    }
  }, [currentPrice]);

  if (!open) {
    return null;
  }

  const closeWindow = () => {
    console.log("Close");
    console.log(buyAndSell);
    setBuyAndSell(false);
    console.log(buyAndSell);
  };

  const inputStyle = {
    width: "8rem",
    height: "2.5rem",
    border: "0.1rem solid",
    borderRadius: "0.5rem",
  };

  const model = (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "1000",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "500px",
          height: "auto",
          transform: "translate(-30% , -50%)",
          backgroundColor: "white",
          pointerEvents: "auto",
          border: " 0px solid",
          borderRadius: "0.4rem",
          overflow: "hidden",
          boxShadow: "5px 5px 12px 3px",
          fontSize: ".8rem",
          lineHeight: ".7rem",
        }}
      >
        <div
          className="d-flex justify-content-between"
          style={{
            borderBottom: ".01rem solid hsl(186, 6%, 64%)",
            backgroundColor:
              mode === 0 ? "rgb(151, 229, 169)" : " rgb(248, 174, 155) ",
            padding: ".4rem",
          }}
        >
          <div>
            <p>{data?.replace(".NS", "")}</p>
            <p className="d-flex gap-2 align-items-center">
              NSE
              <span
                className="fw-bold d-flex align-items-center gap-1"
                style={{
                  fontWeight: "700",
                  color:
                    allData?.[data]?.regularMarketChangePercent > 0
                      ? "green"
                      : "red",
                }}
              >
                {allData?.[data]?.regularMarketPrice?.toFixed(2)}
                {allData?.[data]?.regularMarketChangePercent > 0 ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </span>{" "}
              <span> {allData?.[data]?.regularMarketChange?.toFixed(2)} </span>{" "}
              <span>
                {"("}
                {allData?.[data]?.regularMarketChangePercent?.toFixed(2)}%{")"}
              </span>
            </p>
          </div>
          <div>
            <button type="button" onClick={closeWindow}>
              X
            </button>
          </div>
        </div>
        <div>
          <div
            style={{
              borderBottom: ".01rem solid hsl(186, 6%, 64%)",
            }}
          >
            <ul
              className="d-flex "
              style={{
                listStyle: "none",
                padding: "0",
                margin: "0",
              }}
            >
              <li>
                <Button
                  size="small"
                  variant={mode === 0 ? "contained" : "outlined"}
                  onClick={() => setMode(0)}
                  style={{
                    borderRadius: "0px",
                    border: "none",
                    backgroundColor: mode === 0 ? "green" : "white",
                  }}
                >
                  Buy
                </Button>
              </li>
              <li>
                <Button
                  size="small"
                  variant={mode === 1 ? "contained" : "outlined"}
                  onClick={() => setMode(1)}
                  style={{
                    borderRadius: "0px",
                    border: "none",
                    backgroundColor: mode == 1 ? "red" : "white",
                  }}
                >
                  Sell
                </Button>
              </li>
            </ul>
          </div>

          <div className="d-flex gap-5 ps-2 mt-3">
            <div>
              <p>Product Type</p>

              <div
                className="d-flex"
                style={{
                  border: "2px solid blue",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  width: "fit-content",
                }}
              >
                <Button
                  size="small"
                  variant={delMode === 1 ? "contained" : "outlined"}
                  sx={{
                    borderRadius: 0,
                    backgroundColor:
                      delMode === 1 ? (mode === 1 ? "red" : "green") : "white",
                  }}
                  onClick={() => setDelMode(1)}
                >
                  INT
                </Button>
                <Button
                  size="small"
                  variant={delMode === 0 ? "contained" : "outlined"}
                  sx={{
                    borderRadius: 0,
                    backgroundColor:
                      delMode === 0 ? (mode === 0 ? "green" : "red") : "white",
                  }}
                  onClick={() => setDelMode(0)}
                >
                  DEL
                </Button>
              </div>
            </div>
            <div>
              <p>Qunatity</p>
              <input
                type="number"
                style={inputStyle}
                min={0}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
              <p style={{ fontSize: "0.8rem" }}>(Max QTY 0 Share)</p>
            </div>
            <div>
              <p>Price</p>
              <input
                type="text"
                name="price"
                id=""
                style={inputStyle}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled
              />
            </div>
          </div>
          <div className="price d-flex justify-content-between ps-3 ">
            <div className="d-flex gap-4">
              <div
                style={{
                  lineHeight: ".7rem",
                }}
              >
                <p>Available</p>
                <p>₹ {wallet.toFixed(2)}</p>
              </div>
              {qty != 0 ? (
                <div
                  style={{
                    lineHeight: ".7rem",
                  }}
                >
                  <p>Required</p>
                  <p>
                    ₹ {((Number(price) || 0) * (Number(qty) || 0))?.toFixed(2)}
                  </p>
                </div>
              ) : (
                " "
              )}
            </div>

            <div className="d-flex">
              <Button
                onClick={qty == 0 ? undefined : onOrder}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textTransform: "none",
                  backgroundColor: mode == 0 ? "green" : "red",
                  color: "white",

                  "&.Mui-disabled": {
                    cursor: "not-allowed",
                    pointerEvents: "auto",
                    backgroundColor: "hsla(0, 0%, 100%, 0.62)",
                    color: "hsl(0, 3%, 31%)",
                  },
                }}
                disabled={qty == 0 ? true : false}
              >
                <span>PLACE ORDER</span>
                <span style={{ fontSize: "12px" }}>
                  {" "}
                  ₹ {(Number(price) * Number(qty))?.toFixed(2)}{" "}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(model, document.body);
};
