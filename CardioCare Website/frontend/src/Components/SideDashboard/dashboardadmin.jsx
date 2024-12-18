import React, { useState } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaStar, FaChartArea, FaFileAlt, FaEye, FaUserInjured  } from 'react-icons/fa'; 
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
                <NavLink to="/admin/dashboard" activeClassName="active-link" onClick={() => handleSubmenuClick('dashboard')}><FaChartArea /> Dashboard</NavLink> 
                
                <Link onClick={() => handleSubmenuClick('profile')}>
                    <FaUser /> Profile
                </Link>
                {openSubmenu === 'profile' && (
                    <div className="submenu">
                        <NavLink to="/admin/profileadd" activeClassName="active-link" ><FaFileAlt /> Add Personal Details</NavLink>
                        <NavLink to="/admin/profileview" activeClassName="active-link" ><FaEye /> View Profile</NavLink>   
                    </div>
                )}               
                <NavLink to="/admin/patientview" activeClassName="active-link" onClick={() => handleSubmenuClick('patientview')}><FaUserInjured /> Patients</NavLink>               
                <NavLink to="/admin/reviews" activeClassName="active-link" onClick={() => handleSubmenuClick('reviews')}><FaStar /> Reviews</NavLink>               
                <NavLink to="/auth" activeClassName="active-link"><FaSignOutAlt /> Logout</NavLink>
            </nav>
        </div>
    );
};


export default Dashboardadmin;


