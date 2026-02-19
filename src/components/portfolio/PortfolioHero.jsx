import React from 'react';

const PortfolioHero = () => {
  return (
    <section className="relative mobile-hero-md bg-[#ee1d23] flex items-center justify-center overflow-hidden">
  
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
            backgroundImage: "url('/portfolio-hero.jpg')",
            backgroundPosition: "center 30%",
        }}
      >

      </div>

      {/* Hero Text */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Portfolio</h1>
        <div className="w-24 h-1 bg-white mx-auto"></div>
      </div>

    </section>
  );
};

export default PortfolioHero;
