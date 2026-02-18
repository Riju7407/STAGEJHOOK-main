const OurPresence = () => {
  return (
    <section className="bg-[#f5f5f5] py-12 sm:py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 sm:gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Presence Text */}
          <div className="pt-0 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-[#E63946] mb-6 sm:mb-8 md:mb-10 tracking-normal leading-tight">
              OUR PRESENCE
            </h2>
            
            <p className="text-sm sm:text-base md:text-[1.05rem] text-gray-800 leading-[1.7] sm:leading-[1.85] mb-4 sm:mb-6">
              We specialize in Exhibition Stall Design, Graphic Designing, Event Management, Digital Marketing, ATL and BTL, and Web Development, delivering creative and impactful solutions across India and internationally.
            </p>

            <p className="text-sm sm:text-base md:text-[1.05rem] text-gray-800 leading-[1.7] sm:leading-[1.85] mb-4 sm:mb-6">
              With strategically located offices and operations in <span className="font-bold">Delhi, Mumbai, Bangalore, Pune, Goa, Kolkata, Gujarat, and Chandigarh</span>, we are well-positioned to serve a wide range of industries with speed, flexibility, and local expertise.
            </p>

            <p className="text-sm sm:text-base md:text-[1.05rem] text-gray-800 leading-[1.7] sm:leading-[1.85]">
              <span className="font-bold">Internationally</span>, we extend our expertise to global markets, delivering world-class exhibition stalls.
            </p>
          </div>

          {/* RIGHT: India Map with Locations */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 pr-10">
            <img 
              src="/india-map-presence.png" 
              alt="Our Presence Map - India" 
              className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[550px] h-auto"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default OurPresence;
