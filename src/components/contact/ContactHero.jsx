import React from 'react';

const ContactHero = () => {
  return (
    <section className="relative mobile-hero-md bg-[#8B1520] overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/contact-hero.jpg" 
          alt="Contact" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>

    </section>
  );
};

export default ContactHero;
