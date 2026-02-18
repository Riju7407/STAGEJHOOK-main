import React from 'react';
import { servicesData } from '../../assets/data/servicesData';

const ServicesGrid = () => {
  return (
    <section className="mobile-section-padding bg-white">
      <div className="mobile-section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mobile-grid-gap">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#c41e3a] hover:-translate-y-3 m-[7px]"
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#c41e3a] to-[#8b0000] rounded-full flex items-center justify-center">
                <svg 
                  className="w-10 h-10 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={service.iconPath}
                  />
                </svg>
              </div>

              {/* Title */}
              <h3 className="mobile-heading-3 text-gray-800 mb-4 text-center">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mobile-body-text text-gray-600 leading-relaxed mb-6 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
