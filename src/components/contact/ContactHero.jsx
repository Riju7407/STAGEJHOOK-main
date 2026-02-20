import React from 'react';

const ContactHero = () => {
  return (
    <section className="relative mobile-hero-md bg-[#8B1520] overflow-hidden flex items-center justify-center">
      
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

      {/* Hero Text */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Contact Us</h1>
        <div className="w-24 h-1 bg-white mx-auto"></div>
      </div>

    </section>
  );
};

export default ContactHero;
