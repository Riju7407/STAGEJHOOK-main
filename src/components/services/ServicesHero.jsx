import React from 'react';

const ServicesHero = () => {
  return (
    <section className="relative h-[60vh] bg-gradient-to-br from-[#c41e3a] to-[#8b0000] flex items-center justify-center mt-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="#ffffff" 
            fillOpacity="0.3" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl px-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 uppercase tracking-wider">
          Our Services
        </h1>
        <div className="w-40 h-1 bg-white mx-auto mb-8"></div>
        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
          Comprehensive solutions from exhibition design to digital marketing
        </p>
      </div>
    </section>
  );
};

export default ServicesHero;
