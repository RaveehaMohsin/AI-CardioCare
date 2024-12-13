import React, { useState } from 'react';
import './dashboard.css';
import { Link , NavLink } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaFileAlt, FaHandshake, FaHeartbeat, FaMicroscope, FaStethoscope, FaComments, FaSignOutAlt, FaCalendarCheck, FaEye , FaFileArchive , FaGraduationCap , FaBook , FaBriefcase , FaStar, FaUserShield, FaChalkboardTeacher, FaCalendarAlt, FaBell, FaChartArea  } from 'react-icons/fa'; 

const Dashboard = () => {
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
                <Link to='/student/dashboard'><FaChartArea /> Dashboard</Link> 
                <Link onClick={() => handleSubmenuClick('profile')}>
                    <FaUser /> Profile
                </Link>
                {openSubmenu === 'profile' && (
                    <div className="submenu">
                        <NavLink to="/patientprofile/patientadd" activeClassName="active-link" ><FaFileAlt /> Add Personal Details</NavLink>
                        <NavLink to="/patientprofile/patientview" activeClassName="active-link" ><FaEye /> View Profile</NavLink>

                    </div>
                )}
                <Link onClick={() => handleSubmenuClick('CardioCare')}>
                <FaStethoscope /> CardioCare Tools
            </Link>
            {openSubmenu === 'CardioCare' && (
                <div className="submenu">
                    <NavLink to="/patient/heartdisease" activeClassName="active-link"><FaHeartbeat /> Predict Heart Disease</NavLink>
                    <NavLink to="/patient/stemi" activeClassName="active-link"><FaMicroscope /> Predict STEMI</NavLink>
                    <NavLink to="/patient/narrowingarteries" activeClassName="active-link"><FaStethoscope /> Narrowing Arteries</NavLink>
                    <NavLink to="/patient/ecg" activeClassName="active-link"><FaHeartbeat /> ECG Normal/Abnormal</NavLink>
                </div>
            )}
                              
                <NavLink to="/patient/chatbot" activeClassName="active-link" onClick={() => handleSubmenuClick('chatbot')}><FaComments /> Chatbot</NavLink>
                
               
                <Link to="/auth"><FaSignOutAlt /> Logout</Link>
            </nav>
        </div>
    );
};

export default Dashboard;
