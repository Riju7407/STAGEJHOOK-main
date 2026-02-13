import React from 'react';

const ExhibitionHero = () => {
  return (
    <section className="relative h-[60vh] bg-[#ee1d23] flex items-start overflow-hidden">
      
      <div 
          className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('exhibition-hero.png')",
          backgroundPosition: "center 30%",
        }}
      >
      </div>

    </section>
  );
};

export default ExhibitionHero;
