import React from "react";
import logo from "../pictures/logo2-removebg.png";
import "../SCSSfiles/navbar.scss";
function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar--left">
        <img src={logo} className="navbar--logo"></img>
        <span className="navbar--webname">Simpl Calender</span>
      </div>
      <div className="navbar--right">
        {/* <div className="navbar--right--text">Home</div>
        <div className="navbar--right--text">Appointments</div>
        <div className="navbar--right--text">Profile</div>
        <div className="navbar--right--text">About</div> */}
      </div>
    </div>
  );
}

export default Navbar;
