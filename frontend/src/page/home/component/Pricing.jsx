import React from "react";

export const Pricing = () => {
  return (
    <div className="container-lg container-fluid mt-5">
      <div className="row">
        <div className="col-lg-4">
          <h2 className="fs-4 mt-4 mb-4">Unbeatable pricing</h2>
          <p className="">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
        </div>
        {/* <div className="col-lg-2"></div> */}
        <div className="col-lg-8">
          <div className="row">
            <div className="col ">
              <div className="row">
                <div className="col">
                  <img
                    src="/images/pricingEquity.svg"
                    alt=""
                    style={{ width: "95%" }}
                  />
                </div>
                <div className="col">
                  <p className="mt-2">Free account opening</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col">
                  <img
                    src="/images/pricingEquity.svg"
                    alt=""
                    style={{ width: "95%" }}
                  />
                </div>
                <div className="col">
                  <p className="mt-2 ">Free equity delivery <br />
and direct mutual funds</p>
                </div>
              </div>
            </div>
            <div className="col">
             <div className="row">
                <div className="col"><img src="/images/other-trades.svg" alt=""  style={{width:"95%",}} /></div>
              <div className="col"><p className="mt-2">Intraday and
F&O</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="" style={{ textDecoration: "none" }}>
        See pricing <i class="fa-solid fa-arrow-right"></i>{" "}
      </a>
    </div>
  );
};
