const MissionVision = () => {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 sm:gap-12 lg:gap-20 items-start">
          
          {/* LEFT: Mission Text */}
          <div className="pt-4 sm:pt-6 md:pt-8 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-[#E63946] mb-6 sm:mb-8 md:mb-10 tracking-normal leading-tight">
              MISSION AND GOALS
            </h2>
            <p className="text-sm sm:text-base md:text-[1.05rem] text-gray-700 leading-[1.7] sm:leading-[1.85]">
              Our mission is to empower brands by delivering innovative and impactful design, digital, and experiential solutions. We strive to be a one-stop creative hub that transforms ideas into memorable experiences—through stunning exhibition stalls, compelling graphic design, seamless event execution, cutting-edge digital marketing, and high-performance web development. Our goal is to exceed client expectations, build long-term partnerships, and drive measurable success for every brand we work with.
            </p>
          </div>

          {/* RIGHT: Goals Tree Diagram */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <img 
              src="/mission-goals-diagram.png" 
              alt="Mission and Goals Diagram" 
              className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[580px] h-auto"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default MissionVision;
