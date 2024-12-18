import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../Assets/logoweb.png";

export default function Navbar1() {
  return (
    <div>
     <Navbar className="fixed-top" style={{ backgroundColor: "#4C0000" }}>
        <Navbar.Brand
          href="#home"
          style={{
            color: "#f78f16",
            marginLeft: "40px",
            fontWeight: 900,
            fontSize: "1.3rem",
          }}
        >
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={{borderRadius:"50%" , overflow:"hidden"}}
          />{" "}
          CardioCare
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}
