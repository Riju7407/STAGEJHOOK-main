const CoreValues = () => {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 sm:gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Core Values Text */}
          <div className="pt-0 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-[#E63946] mb-6 sm:mb-8 md:mb-10 tracking-normal leading-tight">
              CORE VALUES
            </h2>
            <p className="text-sm sm:text-base md:text-[1.05rem] text-gray-800 leading-[1.7] sm:leading-[1.85]">
              We believe in innovative thinking that not only turns heads but drives results. Whether it's stall design or digital campaigns, our creativity is always rooted in strategy. From booth setup to social media campaigns, we don't settle for "just done." We aim for flawless, timely, and effective execution in every project. Our clients are at the heart of everything we do. We listen, adapt, and collaborate to bring their vision to life — both online and on the exhibition floor.
            </p>
          </div>

          {/* RIGHT: Core Values Diagram */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <img 
              src="/core-values-diagram.png" 
              alt="Core Values Diagram" 
              className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[580px] h-auto"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default CoreValues;
