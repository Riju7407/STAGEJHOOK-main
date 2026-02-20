const AboutHero = () => {
  return (
    <section className="relative mobile-hero-md bg-[#8B1520] overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/people-silhouettes.png" 
          alt="Team" 
          className="w-full h-full object-cover object-[center_80%] -translate-y-[65px] max-h-[calc(100% - 40px)]"
        />
      </div>

      {/* Dark gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>

      {/* About Us Text - Center */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide pb-3 sm:pb-4 border-b-4 sm:border-b-[5px] border-white inline-block">
          About Us
        </h1>
      </div>

    </section>
  );
};

export default AboutHero;
