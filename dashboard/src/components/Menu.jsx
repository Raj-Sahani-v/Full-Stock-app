import React, { useState } from "react";

import { Link } from "react-router";
import { LiveSerch } from "./UI/LiveSerch";
import Profile from "./UI/Profile";

const Menu = () => {
  const [selectMenu ,setSelectMenu] = useState(0);
  const [profileDrop , setProfileDrop] = useState(false);
  const handleMenuClick = (indx)=>{
    setSelectMenu(indx);
  }
  const handleProfileClick =  ()=>{
    setProfileDrop(!profileDrop)
  }
 
  const activeClass = "menu selected"
  const menuClass = "menu ";

  return(
    <div className="menu-container">
      <img src="logo.png" alt="logo" style={{width:"50px"}} />
      <div className="" ><LiveSerch/></div>
      <div className="menus">
        <ul>
          <li>
            <Link className="text-decoration-none" to={"/"} onClick={()=>handleMenuClick(0)} >
            <p className={selectMenu===0?activeClass:menuClass}  >Dashboard</p>
            </Link>
          </li>
          <li>
             <Link className="text-decoration-none" to={"/orders"} onClick={()=>handleMenuClick(1)} >
            <p className={selectMenu===1?activeClass:menuClass} >Orders</p>
            </Link>
          </li>
          <li>
             <Link className="text-decoration-none" to={"/holdings"} onClick={()=>handleMenuClick(2)} >
            <p className={selectMenu===2?activeClass:menuClass} >Holdings</p>
            </Link>
          </li>
          <li>
             <Link className="text-decoration-none" to={"/positions"} onClick={()=>handleMenuClick(3)} >
            <p className={selectMenu===3?activeClass:menuClass} >Postions</p>
            </Link>
          </li>
        </ul>
        <div className="profile">
         <Profile/>
        </div>
      </div>
    </div>
  )
}
export default Menu;
