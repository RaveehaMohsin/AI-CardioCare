import React from 'react'
import { FaSignOutAlt, FaBell } from "react-icons/fa";

export default function upperheader(props) {
  return (
    <div>
       <div className="upperheader">
        <div className="left-section">
          <div className="section-title">{props.title}</div>
        </div>
        <div className="right-section">
          <div className="user-name">{props.name}</div>
          <img src="https://cdn-icons-png.flaticon.com/512/5850/5850276.png" alt="Profile" />
          <button className="icon-btn">
            <FaSignOutAlt />
          </button>
          <button className="icon-btn">
            <FaBell />
          </button>
        </div>
      </div>
    </div>
  )
}
