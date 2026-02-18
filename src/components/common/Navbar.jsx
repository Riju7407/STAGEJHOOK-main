import { Link } from "react-router-dom";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import AdminLoginModal from "./AdminLoginModal";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, admin, logout } = useAdminAuth();

  return (
    <nav className="bg-white relative z-10">
      <div className="max-w-[1300px] mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center relative z-20 flex-shrink-0">
          <img 
            src="/logo.png" 
            alt="Stage J Hook Logo" 
            className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto relative -mb-4 sm:-mb-6"
          />
        </Link>

        {/* MENU - Desktop & Mobile */}
        <ul className="flex items-center gap-1 sm:gap-2 lg:gap-3 xl:gap-4 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[15px] font-medium text-black overflow-x-auto flex-1 justify-center px-2">
          <li><Link to="/" className="hover:text-[#E31E24] transition-colors whitespace-nowrap">Home</Link></li>
          <li className="hidden md:block border-l border-gray-400 h-4"></li>
          <li><Link to="/about" className="hover:text-[#E31E24] transition-colors whitespace-nowrap">About</Link></li>
          <li className="hidden md:block border-l border-gray-400 h-4"></li>
          <li><Link to="/services" className="hover:text-[#E31E24] transition-colors cursor-pointer whitespace-nowrap">Services</Link></li>
          <li className="hidden md:block border-l border-gray-400 h-4"></li>
          <li><Link to="/portfolio" className="hover:text-[#E31E24] transition-colors cursor-pointer whitespace-nowrap">Portfolio</Link></li>
          <li className="hidden lg:block border-l border-gray-400 h-4"></li>
          <li><Link to="/exhibition" className="hover:text-[#E31E24] transition-colors cursor-pointer whitespace-nowrap text-[9px] sm:text-[10px] md:text-[11px] lg:text-[13px]">Exhibition</Link></li>
          <li className="hidden lg:block border-l border-gray-400 h-4"></li>
          <li><Link to="/contact" className="hover:text-[#E31E24] transition-colors cursor-pointer whitespace-nowrap">Contact</Link></li>
          <li className="hidden lg:block border-l border-gray-400 h-4"></li>
          
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


        {/* Mobile menu removed - full navigation is always visible */}

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
