const AboutHero = () => {
  return (
    <section className="relative h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px] bg-[#8B1520] overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/people-silhouettes.png" 
          alt="Team" 
          className="w-full h-full object-cover object-[center_80%]"
        />
      </div>

      {/* Dark gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>

      {/* About Us Text - Top Left */}
      <div className="absolute top-4 sm:top-5 left-4 sm:left-6 md:left-12 lg:left-16 xl:left-24">
      </div>

    </section>
  );
};

export default AboutHero;
