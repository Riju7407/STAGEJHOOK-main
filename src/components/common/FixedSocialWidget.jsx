import { FaInstagram, FaLinkedinIn, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { useState, useEffect } from "react";

const FixedSocialWidget = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    // Find footer element
    const footer = document.querySelector("footer");
    
    if (!footer) return;

    // Create intersection observer to detect when footer is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of footer is visible
      }
    );

    observer.observe(footer);

    return () => {
      observer.unobserve(footer);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100px);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(227, 30, 36, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(227, 30, 36, 0);
          }
        }

        .social-widget {
          animation: slideInRight 0.5s ease-out forwards;
        }

        .social-widget.hidden {
          animation: slideOutRight 0.5s ease-out forwards;
        }

        .social-icon {
          animation: slideInRight 0.5s ease-out forwards, bounce 3s ease-in-out infinite;
        }

        .social-icon:nth-child(1) {
          animation-delay: 0s, 0s;
        }

        .social-icon:nth-child(2) {
          animation-delay: 0.1s, 0.3s;
        }

        .social-icon:nth-child(3) {
          animation-delay: 0.2s, 0.6s;
        }

        .social-icon:nth-child(4) {
          animation-delay: 0.3s, 0.9s;
        }

        .social-icon:hover {
          animation: pulse 1s ease-in-out;
        }
      `}</style>
      {!isFooterVisible && (
        <div className="social-widget fixed right-4 md:right-6 bottom-6 md:bottom-8 z-50 flex flex-col items-center gap-3">
        {/* Social Media Icons - Always Visible */}
        <div className="flex flex-col gap-2">
          <a
            href="https://www.instagram.com/stagehook.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E31E24] text-white flex items-center justify-center hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            aria-label="Instagram"
          >
            <FaInstagram className="text-lg md:text-xl" />
          </a>
          <a
            href="https://in.linkedin.com/company/stagehook-media-pvt-ltd?trk=public_post_follow-view-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E31E24] text-white flex items-center justify-center hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="text-lg md:text-xl" />
          </a>
          <a
            href="https://wa.me/919999982358"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E31E24] text-white flex items-center justify-center hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="text-lg md:text-xl" />
          </a>
          <a
            href="mailto:stagehook.india@gmail.com"
            className="social-icon w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E31E24] text-white flex items-center justify-center hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            aria-label="Email"
          >
            <FaEnvelope className="text-lg md:text-xl" />
          </a>
        </div>
        </div>
      )}
    </>
  );
};

export default FixedSocialWidget;
