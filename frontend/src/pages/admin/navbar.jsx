import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileLogo from "./../../assets/icons/logo.png";

function Navbar() {
    const location = useLocation();
    const [showProfile, setShowProfile] = useState(false);
    const [activeSection, setActiveSection] = useState("Dashboard");

    // Map paths to section names
    useEffect(() => {
        const sectionNames = {
            "/admin/dashboard": "Dashboard",
            "/admin/profile": "Profile",
            "/admin/students": "Students",
            "/admin/teachers": "Teachers",
            "/admin/attendance": "Attendance",
            "/admin/payment": "School Payments",
            "/admin/class_management": "Class Management",
            "/admin/documents": "Documents",
            "/admin/grades": "Grades and Result",
            "/admin/announcements": "Announcements",
            "/admin/support": "Support",
            "/admin/setting": "Setting"
        };

        setActiveSection(sectionNames[location.pathname] || "Dashboard");
        setShowProfile(false); // Hide dropdown when route changes
    }, [location.pathname]);

    // Toggle profile dropdown
    const toggleProfile = () => {
        setShowProfile((prev) => !prev);
    };

    // Hide dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest("#profile-menu")) {
                setShowProfile(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Function to handle button clicks and close the dropdown
    const handleMenuClick = () => {
        setShowProfile(false);
    };

    return (
        <nav className="bg-white border-b border-purple-100 shadow-lg shadow-cyan-100/50 h-20 md:h-16 md:w-full px-4 md:px-6 relative z-50">
            <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
                <div className="w-full md:flex-1 flex justify-center md:justify-start">
                    <div className="flex items-center cursor-pointer rounded-lg p-2 transition-all duration-300">
                        <span className="text-cyan-500 font-bold text-3xl md:text-2xl hover:opacity-80 transition-opacity duration-200">
                            {activeSection}
                        </span>
                    </div>
                </div>

                {/* Profile Button */}
                <div className="absolute md:relative right-4 md:right-0">
                    <button
                        id="profile-menu"
                        onClick={toggleProfile}
                        className="w-12.5 h-12.5 md:w-10 md:h-10 cursor-pointer rounded-full bg-cyan-100 flex items-center justify-center hover:bg-cyan-200 transition-all duration-300 shadow-md hover:shadow-lg border border-cyan-200"
                        aria-label="Profile Menu"
                    >
                        <img alt="Profile" className="w-11 h-11 md:w-10 md:h-10 rounded-full object-cover" src={ProfileLogo} />
                    </button>
                </div>

                {/* Account Dropdown (Toggled) */}
                {showProfile && (
                    <div className="absolute right-4 top-12 mt-3 w-56 md:w-48 bg-white rounded-xl shadow-2xl py-2 z-[100] border border-cyan-100" id="profile-menu">
                        <div className="px-4 py-2 border-b border-purple-50">
                            <p className="text-sm font-medium text-cyan-600">Account</p>
                        </div>
                        <Link to="/admin/profile">
                            <button onClick={handleMenuClick} className="flex items-center cursor-pointer w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                Profile
                            </button>
                        </Link>
                        <Link to="/admin/setting">
                            <button onClick={handleMenuClick} className="flex items-center cursor-pointer w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                </svg>
                                Setting
                            </button>
                        </Link>
                        <Link to="/login">
                            <button onClick={handleMenuClick} className="flex items-center cursor-pointer w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg>
                                Logout
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
