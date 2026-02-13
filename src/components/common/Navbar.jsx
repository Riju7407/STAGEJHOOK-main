import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaLock } from "react-icons/fa";
import AdminLoginModal from "./AdminLoginModal";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, admin, logout } = useAdminAuth();

  return (
    <nav className="bg-white relative z-10">
      <div className="max-w-[1300px] mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center relative z-20">
          <img 
            src="/logo.png" 
            alt="Stage J Hook Logo" 
            className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto relative -mb-6 sm:-mb-8"
          />
        </Link>

        {/* HAMBURGER ICON - Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-xl sm:text-2xl text-gray-800 z-20"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* MENU - Desktop */}
        <ul className="hidden lg:flex items-center gap-3 xl:gap-4 text-[14px] xl:text-[15px] font-medium text-black">
          <li><Link to="/" className="hover:text-[#E31E24] transition-colors">Home</Link></li>
          <li className="border-l border-gray-400 h-4"></li>
          <li><Link to="/about" className="hover:text-[#E31E24] transition-colors">About Us</Link></li>
          <li className="border-l border-gray-400 h-4"></li>
          <li><Link to="/services" className="hover:text-[#E31E24] transition-colors cursor-pointer">Services</Link></li>
          <li className="border-l border-gray-400 h-4"></li>
          <li><Link to="/portfolio" className="hover:text-[#E31E24] transition-colors cursor-pointer">Portfolio</Link></li>
          <li className="border-l border-gray-400 h-4"></li>
          <li><Link to="/exhibition" className="hover:text-[#E31E24] transition-colors cursor-pointer">Exhibition Calendar</Link></li>
          <li className="border-l border-gray-400 h-4"></li>
          <li><Link to="/contact" className="hover:text-[#E31E24] transition-colors cursor-pointer">Contact</Link></li>
          <li className="border-l border-gray-400 h-4"></li>
          
          {/* Admin Auth Button */}
          {isAuthenticated ? (
            <li className="flex items-center gap-2">
              <span className="text-[13px] text-gray-600">{admin?.name}</span>
              <button
                onClick={logout}
                className="bg-[#E31E24] text-white px-3 py-1 rounded text-[12px] hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-2 bg-[#E31E24] text-white px-4 py-1 rounded hover:bg-red-700 transition-colors"
              >
                <FaLock size={14} />
                <span>Admin Login</span>
              </button>
            </li>
          )}
        </ul>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="fixed inset-0 bg-white z-10 lg:hidden pt-20 sm:pt-24">
            <ul className="flex flex-col items-center gap-5 sm:gap-6 text-base sm:text-lg font-medium text-black py-8">
              <li><Link to="/" onClick={() => setIsOpen(false)} className="hover:text-[#E31E24] transition-colors">Home</Link></li>
              <li><Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-[#E31E24] transition-colors">About Us</Link></li>
              <li><Link to="/services" onClick={() => setIsOpen(false)} className="hover:text-[#E31E24] transition-colors">Services</Link></li>
              <li><Link to="/portfolio" onClick={() => setIsOpen(false)} className="hover:text-[#E31E24] transition-colors">Portfolio</Link></li>
              <li><Link to="/exhibition" onClick={() => setIsOpen(false)} className="hover:text-[#E31E24] transition-colors">Exhibition Calendar</Link></li>
              <li><Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-[#E31E24] transition-colors">Contact</Link></li>
              <li className="border-t border-gray-300 w-full pt-4 mt-4">
                {isAuthenticated ? (
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-gray-600">{admin?.name}</span>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="bg-[#E31E24] text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 bg-[#E31E24] text-white px-6 py-2 rounded hover:bg-red-700 transition-colors w-full"
                  >
                    <FaLock />
                    <span>Admin Login</span>
                  </button>
                )}
              </li>
            </ul>
          </div>
        )}

        {/* Admin Login Modal */}
        <AdminLoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      </div>
    </nav>
  );
};

export default Navbar;
