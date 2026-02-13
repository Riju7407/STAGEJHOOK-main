import { FaInstagram, FaLinkedinIn, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const TopBar = () => {
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

          {/* Social icons */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <a 
              href="https://www.instagram.com/stagehook.co.in/" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#E31E24] transition-all duration-300 cursor-pointer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-[12px] sm:text-[14px]" />
            </a>
            <a 
              href="https://in.linkedin.com/company/stagehook-media-pvt-ltd?trk=public_post_follow-view-profile" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#E31E24] transition-all duration-300 cursor-pointer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-[12px] sm:text-[14px]" />
            </a>
            <a 
              href="https://wa.me/919999982358" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#E31E24] transition-all duration-300 cursor-pointer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-[12px] sm:text-[14px]" />
            </a>
            <a 
              href="mailto:stagehook.india@gmail.com" 
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#E31E24] transition-all duration-300 cursor-pointer"
              aria-label="Email"
            >
              <FaEnvelope className="text-[12px] sm:text-[14px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
