import React, { useState } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaSignOutAlt, FaStar, FaUserShield, FaChalkboardTeacher, FaChartArea, FaFileAlt, FaEye  } from 'react-icons/fa'; 
import { IoSchool } from "react-icons/io5";
import { GiSchoolBag } from "react-icons/gi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';


const Dashboardadmin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null); 

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmenuClick = (menu) => {
        setOpenSubmenu(openSubmenu === menu ? null : menu); 
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="hamburger" onClick={toggleSidebar}>
                &#9776;
            </button>
            <nav className="nav">
                <NavLink to="/admin/dashboard" activeClassName="active-link"><FaChartArea /> Dashboard</NavLink> 
                
                <Link onClick={() => handleSubmenuClick('profile')}>
                    <FaUser /> Profile
                </Link>
                {openSubmenu === 'profile' && (
                    <div className="submenu">
                        <NavLink to="/admin/profileadd" activeClassName="active-link" ><FaFileAlt /> Add Personal Details</NavLink>
                        <NavLink to="/admin/profileview" activeClassName="active-link" ><FaEye /> View Profile</NavLink>
    
                    </div>
                )}

                <NavLink to="/admin/counsellorview" activeClassName="active-link"><IoSchool /> Counsellor</NavLink>
                <NavLink to="/admin/studentview" activeClassName="active-link"><GiSchoolBag /> Student</NavLink>
                <NavLink to="/admin/meetview" activeClassName="active-link"> <FaTachometerAlt /> Meetings </NavLink>
                <NavLink to="/admin/invoiceview"> <FaFileInvoiceDollar /> Invoice </NavLink>
                <Link onClick={() => handleSubmenuClick('review')}> <FaStar /> Reviews</Link>
                {openSubmenu === 'review' && (
                    <div className="submenu">
                        <NavLink to="/admin/counsellorreview" activeClassName="active-link"><IoSchool /> Counsellors</NavLink>
                        <NavLink to="/admin/studentreview" activeClassName="active-link"><FaUserShield /> Student</NavLink>
                        <NavLink to="/admin/systemreview" activeClassName="active-link"><FaChalkboardTeacher/> System</NavLink>
                    </div>
                )}
                <NavLink to="/auth" activeClassName="active-link"><FaSignOutAlt /> Logout</NavLink>
            </nav>
        </div>
    );
};


export default Dashboardadmin;


