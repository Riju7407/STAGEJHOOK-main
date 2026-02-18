import React from 'react';

const ServicesHero = () => {
  return (
    <section className="relative mobile-hero-lg overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/sh.jpg" 
          alt="Services Hero" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white mobile-section-container flex items-center justify-center min-h-[400px]">
        <div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 uppercase tracking-wider">
            Our Services
          </h1>
          <div className="w-32 sm:w-40 h-1 bg-white mx-auto mb-4 sm:mb-8"></div>
          <p className="text-xs sm:text-lg md:text-2xl text-white/90 leading-relaxed px-2">
            Comprehensive solutions from exhibition design to digital marketing
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
