import React from 'react';

const ExhibitionStallDesign = () => {
  const features = [
    'Custom Booth Design',
    '3D Visualization',
    'Modular & Custom Fabrication',
    'On-Site Installation',
    'Multi-City & Pan-India Execution',
    'Post-Event Support'
  ];

  return (
    <section id="exhibition-stall-design" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-[#c41e3a] mb-4">
              Exhibition Stall Design
            </h2>
            <div className="w-20 h-1 bg-[#c41e3a] mb-8"></div>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              We specialize in creating <strong>custom exhibition stalls</strong> that 
              captivate audiences and elevate your brand presence at trade shows and 
              exhibitions. From concept to execution, we handle every detail.
            </p>

            {/* Features List */}
            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-800 text-lg">
                  <svg className="w-6 h-6 text-[#c41e3a] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button className="bg-gradient-to-r from-[#c41e3a] to-[#8b0000] text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Get a Free Quote
            </button>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"
                alt="Exhibition Stall Design"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExhibitionStallDesign;
