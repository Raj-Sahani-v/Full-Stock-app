import React from 'react'
import { Link } from 'react-router'

export const LeftShift = ({main_image, imageLink, title, description, a_title, a_link, b_title="", b_link="", arowwIconA="" ,arowwIconB}  ) => {
    
  return (
    <div className='container-lg container-fluid '>
        <div className="row">
            <div className="col-lg-7 text-center" >
                <Link to={imageLink} ><img src={main_image} alt="" style={{width:"70%"}} className='p-4' />
</Link>
            </div>
            <div className="col-lg-5 p-4 mt-5">
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="row">
                    <div className="col-lg-6 mt-3"><Link to={a_link} >{a_title} {arowwIconA==="a"?<i class="fa-solid fa-arrow-right"></i>:""} </Link></div>
                    <div className="col-lg-6 mt-3 mb-3"><Link to={b_link} >{b_title} {arowwIconB==="b"?<i class="fa-solid fa-arrow-right"></i>:""} </Link></div>
                </div>
                
              <div className="row">
                <div className="col">
                      <div className='ms-3 mt-2'>
                    <Link>
                    <img src="/images/googlePlayBadge.svg" alt="" />
                    </Link>
                    <Link>
                    <img src="/images/appstoreBadge.svg" alt="" />
                    </Link>
                </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
