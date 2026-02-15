import React, { useEffect } from 'react';

const PortfolioModal = ({ item, onClose }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 group"
        >
          <svg
            className="w-6 h-6 text-gray-800 group-hover:text-[#c41e3a] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="w-full h-[400px] overflow-hidden rounded-t-2xl">
          <img
            src={item.imageUrl || item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400?text=Portfolio';
            }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1 bg-[#c41e3a]/10 text-[#c41e3a] rounded-full text-sm font-semibold">
              {item.category}
            </span>
            {item.location && (
              <span className="flex items-center gap-1 text-gray-600 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {item.location}
              </span>
            )}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {item.title}
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            {item.description}
          </p>

          {/* Details */}
          {item.details && (
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              {item.details.client && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Client</p>
                  <p className="font-semibold text-gray-900">{item.details.client}</p>
                </div>
              )}
              {item.details.year && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Year</p>
                  <p className="font-semibold text-gray-900">{item.details.year}</p>
                </div>
              )}
              {item.details.size && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Size</p>
                  <p className="font-semibold text-gray-900">{item.details.size}</p>
                </div>
              )}
              {item.details.duration && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duration</p>
                  <p className="font-semibold text-gray-900">{item.details.duration}</p>
                </div>
              )}
            </div>
          )}

          {/* CTA Button */}
          <div className="mt-8">
            <button className="w-full bg-gradient-to-r from-[#c41e3a] to-[#8b0000] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              Request Similar Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
