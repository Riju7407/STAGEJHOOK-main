import { Link } from "react-router-dom";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import AdminLoginModal from "./AdminLoginModal";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, admin, logout } = useAdminAuth();

  return (
    <nav className="bg-white relative z-10 sm:border-b sm:border-gray-200">
      <div className="max-w-[1300px] mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center relative z-20 flex-shrink-0 mr-auto sm:mr-0">
          <img 
            src="/logo.png" 
            alt="Stage J Hook Logo" 
            className="h-10 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto relative -mb-1 sm:-mb-4"
          />
        </Link>

        {/* MENU - Desktop & Mobile */}
        <ul className="flex items-center gap-1 sm:gap-2 lg:gap-3 xl:gap-4 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[15px] font-medium text-black overflow-x-auto flex-1 justify-end sm:justify-center px-1 sm:px-2 ml-2 sm:ml-0">
          <li className="hidden sm:block"><Link to="/" className="hover:text-[#E31E24] transition-colors whitespace-nowrap">Home</Link></li>
          <li className="hidden md:block border-l border-gray-400 h-4"></li>
          <li className="hidden sm:block"><Link to="/about" className="hover:text-[#E31E24] transition-colors whitespace-nowrap">About</Link></li>
          <li className="hidden md:block border-l border-gray-400 h-4"></li>
          <li className="hidden sm:block"><Link to="/services" className="hover:text-[#E31E24] transition-colors cursor-pointer whitespace-nowrap">Services</Link></li>
          <li className="hidden md:block border-l border-gray-400 h-4"></li>
          <li className="hidden sm:block"><Link to="/portfolio" className="hover:text-[#E31E24] transition-colors cursor-pointer whitespace-nowrap">Portfolio</Link></li>
          <li className="hidden lg:block border-l border-gray-400 h-4"></li>
          <li className="hidden lg:block"><Link to="/exhibition" className="hover:text-[#E31E24] transition-colors cursor-pointer whitespace-nowrap text-[9px] sm:text-[10px] md:text-[11px] lg:text-[13px]">Exhibition</Link></li>
          <li className="hidden lg:block border-l border-gray-400 h-4"></li>
          <li className="hidden sm:block"><Link to="/contact" className="hover:text-[#E31E24] transition-colors cursor-pointer whitespace-nowrap">Contact</Link></li>
          <li className="hidden lg:block border-l border-gray-400 h-4"></li>
          
          {/* Mobile Menu Button */}
          <li className="sm:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover:text-[#E31E24] transition-colors whitespace-nowrap font-medium"
            >
              Menu
            </button>
          </li>
          
          {/* Admin Auth Button */}
          {isAuthenticated ? (
            <li className="flex items-center gap-1 flex-shrink-0">
              <span className="text-[9px] text-gray-600 hidden sm:inline">{admin?.name}</span>
              <button
                onClick={logout}
                className="bg-[#E31E24] text-white px-2 py-1 rounded text-[9px] hover:bg-red-700 transition-colors flex-shrink-0"
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="flex-shrink-0">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1 bg-[#E31E24] text-white px-2 py-1 rounded text-[9px] sm:text-[10px] hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                <FaLock size={10} />
                <span className="hidden sm:inline">Login</span>
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 sm:hidden z-50 shadow-lg">
            <ul className="flex flex-col gap-2 py-3 px-4 text-[10px] font-medium text-black">
              <li onClick={() => setIsMobileMenuOpen(false)}><Link to="/" className="hover:text-[#E31E24] transition-colors block py-1">Home</Link></li>
              <li onClick={() => setIsMobileMenuOpen(false)}><Link to="/about" className="hover:text-[#E31E24] transition-colors block py-1">About</Link></li>
              <li onClick={() => setIsMobileMenuOpen(false)}><Link to="/services" className="hover:text-[#E31E24] transition-colors block py-1">Services</Link></li>
              <li onClick={() => setIsMobileMenuOpen(false)}><Link to="/portfolio" className="hover:text-[#E31E24] transition-colors block py-1">Portfolio</Link></li>
              <li onClick={() => setIsMobileMenuOpen(false)}><Link to="/exhibition" className="hover:text-[#E31E24] transition-colors block py-1">Exhibition</Link></li>
              <li onClick={() => setIsMobileMenuOpen(false)}><Link to="/contact" className="hover:text-[#E31E24] transition-colors block py-1">Contact</Link></li>
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
