const OurExperties = () => {
  return (
    <section className="bg-[#f5f5f5] py-12 sm:py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 sm:gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Experties Text */}
          <div className="pt-0 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-[#E63946] mb-6 sm:mb-8 md:mb-10 tracking-normal leading-tight">
              OUR EXPERTIES
            </h2>
            <p className="text-sm sm:text-base md:text-[1.05rem] text-gray-700 leading-[1.7] sm:leading-[1.85]">
              We specialize in brand-centric stall design, backed by high-quality modular and custom fabrication, with a strong focus on finishing and detailing excellence. Every project is executed with precision to ensure on-time delivery, exactly as proposed — because your brand deserves nothing less than perfection.
            </p>
          </div>

          {/* RIGHT: Experties Diagram */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 pr-10">
            <img 
              src="/experties-diagram.png" 
              alt="Our Experties Diagram" 
              className="w-full max-w-[450px] sm:max-w-[550px] md:max-w-[650px] h-auto"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default OurExperties;
