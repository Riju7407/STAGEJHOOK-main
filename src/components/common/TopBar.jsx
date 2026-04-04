import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  const handleEnquireClick = () => {
    navigate("/contact");
  };

  return (
    <div className="bg-[#E31E24] text-white text-xs sm:text-sm">
      <div className="max-w-[1300px] mx-auto px-3 sm:px-4 h-9 sm:h-10 flex items-center justify-end">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Phone number */}
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="hidden sm:inline font-medium text-xs sm:text-sm">Call us</span>
            <span className="font-semibold text-[11px] sm:text-xs md:text-sm">+91 999 998 2358</span>
          </div>

          {/* Divider */}
          <div className="h-5 sm:h-6 w-[1px] bg-white/40"></div>

          {/* Enquire Now Button */}
          <button
            onClick={handleEnquireClick}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-[#E31E24] font-semibold text-[11px] sm:text-xs md:text-sm rounded hover:bg-gray-100 transition-all duration-300 whitespace-nowrap"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
