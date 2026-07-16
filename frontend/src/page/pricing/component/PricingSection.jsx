import React from 'react'
import { Link } from 'react-router'

export const PricingSection = () => {
  return (
    <div className='container-lg container-fluid mt-5'>
        <div className="row">
            <div className="col-lg text-center">
                <Link>
                <img src="/images/pricingEquity.svg" alt="" style={{width:"40%"}} /></Link>
                <p className='fw-semibold fs-3'>Free equity delivery </p>
                <p>All equuity delivery investments {"("}NSE,BSE{")"}, are absolutely free <i class="fa-solid fa-minus"></i> <span> ₹ </span> 0 brokerage. </p>
            </div>
            <div className="col-lg text-center">
                <Link>
                <img src="/images/other-trades.svg" alt="" style={{width:"40%"}} /></Link>
                <p className='fw-semibold fs-3'> Intraday and F&O trades </p>
                <p> Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades. </p>
            </div>
            <div className="col-lg text-center">
                <Link>
                <img src="/images/pricingEquity.svg" alt="" style={{width:"40%"}} /></Link>
                <p className='fw-semibold fs-3'> Free direct MF </p>
                <p> All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges. </p>
            </div>
            
        </div>
    </div>
  )
}
