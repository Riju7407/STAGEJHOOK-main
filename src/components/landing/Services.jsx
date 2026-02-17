const services = [
  {
    title: "Custom Stall Design",
    img: "/services/custom-exhibition.jpg",
  },
  {
    title: "Fabrication & Branding",
    img: "/services/custom-booth.jpg",
  },
  {
    title: "Pan-India Execution",
    img: "/services/custom-built-stands.jpg",
  },
  {
    title: "AV & Technology",
    img: "/services/expert-graphic.jpg",
  },
  {
    title: "Event Manpower",
    img: "/services/event-services.jpg",
  },
  {
    title: "Corporate Events",
    img: "/services/digital-marketing.jpg",
  },
];

const Services = () => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {services.map((item, index) => (
            <div 
              key={index} 
              className="border-2 border-gray-300 overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
            >
              
              {/* IMAGE */}
              <div className="h-[240px] sm:h-[280px] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x280?text=' + encodeURIComponent(item.title);
                  }}
                />
              </div>

              {/* RED TITLE BAR */}
              <div className="bg-[#E31E24] text-white text-center py-3 sm:py-4 font-semibold text-sm sm:text-base px-2">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 text-sm sm:text-base text-gray-800 font-semibold hover:text-[#E31E24] transition-colors duration-300 group">
            View All Services
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
