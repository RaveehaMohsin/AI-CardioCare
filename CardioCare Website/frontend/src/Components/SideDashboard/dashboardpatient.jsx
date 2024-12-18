import React, { useState } from 'react';
import './dashboard.css';
import { Link , NavLink } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaFileAlt, FaHandshake, FaHeartbeat, FaMicroscope, FaStethoscope, FaComments, FaSignOutAlt, FaCalendarCheck, FaEye , FaFileArchive , FaGraduationCap , FaBook , FaBriefcase , FaStar, FaUserShield, FaChalkboardTeacher, FaCalendarAlt, FaBell, FaChartArea, FaPhone  } from 'react-icons/fa'; 

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
                    <NavLink to="/patient/recommendation" activeClassName="active-link"><FaUserShield /> Recommendations</NavLink>

                </div>
            )}
                              
                <NavLink to="/patient/chatbot" activeClassName="active-link" onClick={() => handleSubmenuClick('chatbot')}><FaComments /> Chatbot</NavLink>
                
                <NavLink to="/patient/report" activeClassName="active-link" onClick={() => handleSubmenuClick('report')}><FaComments /> Report Generator</NavLink>
                  
                <NavLink to="/patient/review" activeClassName="active-link" onClick={() => handleSubmenuClick('review')}><FaStar /> Review Us</NavLink>
                <NavLink to="/patient/resources" activeClassName="active-link" onClick={() => handleSubmenuClick('education')}><FaComments /> Education Resources</NavLink>
                <NavLink to="/patient/contact" activeClassName="active-link" onClick={() => handleSubmenuClick('contact')}><FaPhone /> Contact Us</NavLink>
                <Link to="/auth"><FaSignOutAlt /> Logout</Link>
            </nav>
        </div>
    );
};

export default Dashboard;
