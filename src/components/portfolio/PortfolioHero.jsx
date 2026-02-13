import React from 'react';

const PortfolioHero = () => {
  return (
    <section className="relative h-[60vh] bg-[#ee1d23] flex items-start overflow-hidden">
  
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
            backgroundImage: "url('/portfolio-hero.jpg')",
            backgroundPosition: "center 30%",
        }}
      >

      </div>

    </section>
  );
};

export default PortfolioHero;
