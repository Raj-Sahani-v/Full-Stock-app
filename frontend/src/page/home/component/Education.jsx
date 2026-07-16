import React from 'react'
export function Education(){
    return(<div className='container-lg container-fluid mt-5'>

            <div className="row">
                <div className="col-lg-6 text-center mt-5 mb-4">
                    <a href=""><img src="/images/index-education.svg" alt="" style={{width:"20%"}} /></a>
                </div>
                <div className="col-lg-6">
                    <h2 className='mt-5'>Free and open market education</h2>
                    <div className='mt-4'>
                        <p className='text-muted' >Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                        <a href="#" style={{textDecoration:"none"}} >Varsity <i class="fa-solid fa-arrow-right"></i> </a>
                    </div>
                    <div className='mt-4'>
                        <p className='text-muted' >TradingQ&A, the most active trading and investment community in India for all your market related queries.

                        </p>
                        <a href="#" style={{textDecoration:"none"}} >TradingQ&A <i class="fa-solid fa-arrow-right"></i> </a>
                    </div>
                </div>
            </div>
    </div>)
}