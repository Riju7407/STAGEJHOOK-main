import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  const services = [
    { name: "Custom Stall Design", href: "/services#custom-stall-design" },
    { name: "Fabrication & Branding", href: "/services#fabrication-branding" },
    { name: "Pan-India Execution", href: "/services#pan-india-execution" },
    { name: "AV & Technology", href: "/services#av-technology" },
    { name: "Event Manpower", href: "/services#event-manpower" },
    { name: "Corporate Events", href: "/services#corporate-events" },
  ];

  const locations = [
    "B-32 GF, Sector 2, Near Sector 15 Metro Station - 201301",
  ];

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Exhibition Calendar", href: "#calendar" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-[#ee1d23] relative overflow-hidden">

      {/* BACKGROUND IMAGE (More Visible Now) */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: "url('/footer-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* OPTIONAL DARK OVERLAY (Only for Text Readability) */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* MAIN FOOTER SECTION */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-white">

          {/* COLUMN 1: SUBMIT A QUERY */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Submit A Query</h3>

            <form className="space-y-2.5 sm:space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded border-2 border-white bg-transparent text-white placeholder-white focus:outline-none"
              />

              <input
                type="text"
                placeholder="Company"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded border-2 border-white bg-transparent text-white placeholder-white focus:outline-none"
              />

              <input
                type="tel"
                placeholder="Mobile"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded border-2 border-white bg-transparent text-white placeholder-white focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded border-2 border-white bg-transparent text-white placeholder-white focus:outline-none"
              />

              <input
                type="text"
                placeholder="Query"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded border-2 border-white bg-transparent text-white placeholder-white focus:outline-none"
              />
            </form>
          </div>

          {/* COLUMN 2: OUR SERVICES */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Our Services</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="hover:underline text-xs sm:text-sm">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: OUR LOCATION */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Our Location</h3>
            <ul className="space-y-2">
              {locations.map((location, index) => (
                <li key={index} className="text-xs leading-relaxed">
                  <span className="font-semibold">Noida Head Office:</span>{" "}
                  {location}
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: CONTACT */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact</h3>

            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            
              <p className="flex flex-wrap items-center gap-2">
                <span className="font-bold">99999 82358</span>
                <span>|</span>
                <a
                  href="mailto:info@stagehook.co.in"
                  className="hover:underline break-all"
                >
                  info@stagehook.co.in
                </a>
              </p>
            </div>

            {/* SOCIAL CONNECT */}
            <div className="mt-6 sm:mt-8">
              <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Social Connect</h4>

              <div className="flex gap-2.5 sm:gap-3">
                <a
                  href="https://www.instagram.com/stagehook.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-[#ee1d23] hover:bg-gray-100 transition-colors border-2 border-white"
                >
                  <FaInstagram size={18} className="sm:w-5 sm:h-5" />
                </a>

                <a
                  href="https://www.facebook.com/stagehook.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-[#ee1d23] hover:bg-gray-100 transition-colors border-2 border-white"
                >
                  <FaFacebookF size={18} className="sm:w-5 sm:h-5" />
                </a>

                <a
                  href="https://wa.me/919999982358"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-[#ee1d23] hover:bg-gray-100 transition-colors border-2 border-white"
                >
                  <FaWhatsapp size={18} className="sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* NAVIGATION LINKS */}
      <div className="border-t border-white/30 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-white text-xs sm:text-sm">
            {navLinks.map((link, index) => (
              <a key={index} href={link.href} className="hover:underline">
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="bg-[#c91a1f] py-3 sm:py-3.5 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <p className="text-center text-white text-[10px] sm:text-xs">
            ©Copyright 2025, Stage Hook Pvt. Ltd. All Rights Reserved.
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
