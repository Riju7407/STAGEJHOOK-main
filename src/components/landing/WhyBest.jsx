const WhyBest = () => {
  return (
    <section className="bg-gray-100 py-12 sm:py-16">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        <div className="bg-gray-300 rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
          
          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 leading-tight">
            What makes STAGEHOOK the best exhibition stall designer in India?
          </h2>

          {/* CONTENT GRID */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            
            {/* LEFT TEXT CONTENT */}
            <div className="space-y-4 sm:space-y-6">
              
              {/* PARAGRAPH 1 */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="font-semibold text-[#A61C23]">STAGEHOOK</span> represents a spectrum of services offered to its client under one roof. Our brand vision is to serve our customers with services worldwide. Our team backs up every project with its core strength i.e. designing, building, fabricating and installation of exhibition stall. With a mission to redefine the aesthetics of exhibition design company, <span className="font-semibold">STAGEHOOK</span> has incorporated the ideas of clients creatively. The worldwide presence and retention of happy customers have altogether made us a renowned exhibit service provider.
              </p>

              {/* PARAGRAPH 2 */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                We believe in driving our key force of transparency and experience to attain the goal of exhibitor. <span className="font-semibold text-[#A61C23]">STAGEHOOK</span> is a fully-equipped <span className="font-semibold">exhibition stall design company in India</span> which focuses on cutting edge technology, precision and timely deliverables. Our holistic approach of robust design & build and fabrication & installation of <span className="font-semibold">exhibition booths'</span> makes us one stop solution for exhibit solutions.
              </p>

            </div>

            {/* RIGHT ILLUSTRATION */}
            <div className="flex justify-center items-center mt-6 md:mt-0">
              <img 
                src="/illustrations/target-money.png" 
                alt="Target and Money Illustration" 
                className="w-full max-w-[280px] sm:max-w-md h-auto object-contain"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyBest;
