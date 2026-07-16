import React from 'react'
import { Link } from 'react-router'

export const RightShift = ({mainImage, imageLink,aLink,aTitle, desc,title}) => {
  return (
    <div className='container-lg container-fluid mt-5'>
        <div className="row">
            <div className="col-lg-5 p-3 d-flex flex-column justify-content-center order-2 order-lg-1 ">
                <h2 className=''>{title}</h2>
                <p className='pe-5' >{desc}</p>
                <Link to={aLink}>{aTitle} <i class="fa-solid fa-arrow-right"></i></Link>
            </div>
            <div className="col-lg-7 order-lg-2 order-1 text-center">
                <Link to={imageLink}>
                <img src={mainImage} alt="," style={{width:"85%"}} />
                </Link>
            </div>
        </div>

    </div>
  )
}
