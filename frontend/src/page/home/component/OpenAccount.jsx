import React from 'react'
import {Link} from 'react-router'

export const OpenAccount = () => {
  return (
    <div className='container-lg container-fluid mt-5'>
      <div className="row">
        <div className="col-12 text-center mt-4">
          <h2>Open a Zerodha account</h2>
          <p>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
          <button className="btn btn-primary p-2 fs-5" type="submit" style={{width:"25%",margin:"0 auto"}} > <Link to={'/signup'} style={{color:"white"}} >Sign up for free</Link> </button>
        </div>
      </div>
    </div>
  )
}
