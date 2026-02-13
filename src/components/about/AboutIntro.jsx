const AboutIntro = () => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

        {/* Intro Text */}
        <div className="max-w-6xl mx-auto">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            <span className="font-bold text-[#C41E3A]">
              Since 2015, STAGEHOOK
            </span>{" "}
            has been a trusted partner for brands looking to make a bold impact
            at trade shows, exhibitions, and corporate events. Based in Noida we
            specialize in{" "}
            <span className="font-semibold">
              exhibition stall design, Graphic Designing, Event Management,
              Digital Marketing, ATL & BTL Advertising and Web Development
            </span>
            , offering end-to-end creative and technical solutions that bring
            brands to life.
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            From concept to execution, we handle every aspect of your brand's
            presence—whether it's a custom-built exhibition booth, a full-scale
            event setup. Our 10-years' feedback and experienced project managers
            ensure complete control over quality and timelines, we redefine the
            art of storytelling off the project.
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            We don't just design and build—we create immersive brand
            experiences. From cutting-edge technology, installations, live
            events, audio/video, and digital manufacturing. Whether you're
            exhibiting locally or internationally, we're here to help you stand
            out, engage your audience, and drive measurable results.
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
            With a presence across India and international experience.
          </p>

          <p className="text-base sm:text-lg font-bold text-gray-800">
            Let's create something extraordinary together.
          </p>

          {/* Image Section */}
          <div className="mt-8 sm:mt-12">
            <img
              src="/about-intro-image.jpg"
              alt="Exhibition Stall Design - Sketch to Reality"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutIntro;
