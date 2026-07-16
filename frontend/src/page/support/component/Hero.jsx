import React from 'react'

export const Hero = () => {
  return (
    <div className='container text-center'>
        <div className="row">
            <div className="col">
                <div  className='d-flex justify-content-between'>
                    <span>Support Portal</span>
                    <button>My tickets</button>
                </div>
                <div className='mt-5'>
                    <form action="">
                        <input type="search" placeholder='to search' style={{width:"80%"}} className='p-3' />
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
