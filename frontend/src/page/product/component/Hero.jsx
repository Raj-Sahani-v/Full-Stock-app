import React from 'react'
import { Link } from 'react-router'

export const Hero = () => {
  return (
    <div className='container-lg container-fluid mt-5 mb-4'>
        <div className="row">
            <div className="col text-center mt-5 mb-5">
                <h2>Zerodha Product</h2>
                <h3 className='text-muted'>Sleek, modern, and intuitive trading platforms</h3>
                <h6 className='text-muted'>Check out our <Link>investment offerings <i class="fa-solid fa-arrow-right"></i> </Link> </h6>
            </div>
        </div>
        <hr />
    </div>
  )
}
