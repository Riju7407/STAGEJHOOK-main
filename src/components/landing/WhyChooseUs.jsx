const WhyChooseUs = () => {
  return (
    <section className="bg-white">
      
      {/* Main Content Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* LEFT - Text Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              Why Choose Us
            </h2>
            
            <div className="text-gray-700 leading-relaxed space-y-3 sm:space-y-4 text-sm sm:text-[15px] text-justify">
              <p>
                We are more than just a service provider — we are your creative and strategic partner. From 
                corporate events to international expos, we bring your vision to life with precision and 
                professionalism. Our event and project managers ensure that every detail is taken care of, so you 
                can focus on what matters. With a diverse portfolio that spans <span className="font-semibold">Exhibition Stall Design, 
                Graphic Designing, Event Management, Digital Marketing, ATL & BTL Campaigns, and Web Development</span>, we 
                offer end-to-end solutions that help your brand stand out, engage, and grow. No need to juggle 
                multiple vendors. From conceptualizing a stunning exhibition stall to executing powerful digital 
                campaigns, we bring all your marketing needs under one roof with seamless integration and 
                consistency. We believe in originality. Our design team crafts unique visual experiences tailored to 
                your brand, whether it's a custom-built stall, a dynamic graphic campaign, or an engaging website.
              </p>
              
              <p>
                Whether it's ATL, BTL, or digital marketing, we don't just execute — we plan with purpose. Our team 
                blends creativity with strategy to deliver measurable results that align with your business goals. We 
                understand the digital landscape. Our experts use data-driven strategies across SEO, PPC, social 
                media, and content marketing to drive visibility, engagement, and conversions. Our 
                multi-disciplinary team brings years of experience and <span className="font-semibold">fresh thinking</span> to every project. We are 
                passionate about innovation, quality, and delivering value to our clients. Your satisfaction is our 
                success. We prioritize communication, transparency, and collaboration throughout every stage of 
                the project, ensuring that you're always in the loop.
              </p>
            </div>
          </div>

          {/* RIGHT - 3D Question Mark Image */}
          <div className="flex items-center justify-center mt-6 lg:mt-0">
            <img 
              src="/question-mark-3d.png" 
              alt="Why Choose Us" 
              className="w-full max-w-[350px] sm:max-w-[500px] h-auto"
            />
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default WhyChooseUs;
