import React, { useState } from 'react';
import { portfolioData } from '../../assets/data/portfolioData';
import PortfolioModal from './PortfolioModal';

const PortfolioGrid = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-[4/3] bg-gray-200"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {item.category}
                  </p>
                </div>

                {/* Hover Icon */}
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg 
                    className="w-5 h-5 text-[#c41e3a]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <PortfolioModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};

export default PortfolioGrid;
