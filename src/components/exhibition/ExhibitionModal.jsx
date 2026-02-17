import React, { useEffect, useCallback } from 'react';

const ExhibitionModal = ({ exhibition, onClose }) => {
  // Close on ESC key
  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleEsc]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Format date
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

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

        {/* Cover Image */}
        <div className="w-full h-[400px] overflow-hidden rounded-t-2xl">
          <img
            src={exhibition.coverImageUrl || exhibition.image}
            alt={exhibition.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://placehold.co/1200x400?text=Exhibition';
            }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Title and Category */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {exhibition.title}
              </h1>
              <span className="inline-block px-4 py-2 bg-[#71a3c1] text-white rounded-full text-sm font-semibold">
                {exhibition.category || 'Exhibition'}
              </span>
            </div>
          </div>

          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            {/* Dates */}
            {exhibition.startDate && exhibition.endDate && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-[#ee1d23]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-600 font-semibold">Exhibition Dates</p>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
                </p>
              </div>
            )}

            {/* Location */}
            {exhibition.location && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-[#ee1d23]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-600 font-semibold">Location</p>
                </div>
                <p className="text-lg font-semibold text-gray-900">{exhibition.location}</p>
              </div>
            )}

            {/* Status */}
            {(exhibition.status) && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-[#ee1d23]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A11.985 11.985 0 001.02 10m18.96 0a13.985 13.985 0 01-19.979 0m15.556-5.555a9.966 9.966 0 00-5.25-1.549c-5.007 0-9.388 3.645-10.358 8.379m0 0H2.581m17.86 0h-2.581m-10.995-7.466A5.971 5.971 0 0110 6a5.971 5.971 0 014.95 2.372m-9.9 0a8.966 8.966 0 1117.332 0" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-600 font-semibold">Status</p>
                </div>
                <p className="text-lg font-semibold text-gray-900 capitalize">{exhibition.status}</p>
              </div>
            )}

            {/* Capacity */}
            {exhibition.capacity && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-[#ee1d23]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <p className="text-sm text-gray-600 font-semibold">Expected Visitors</p>
                </div>
                <p className="text-lg font-semibold text-gray-900">{exhibition.capacity} people</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Exhibition</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {exhibition.description}
            </p>
          </div>

          {/* Pricing Section */}
          {exhibition.pricing && Object.keys(exhibition.pricing).length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Stall Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {exhibition.pricing.small > 0 && (
                  <div className="p-4 border border-gray-200 rounded-lg bg-white">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Small Stall</h3>
                    <p className="text-2xl font-bold text-[#c41e3a]">
                      ${exhibition.pricing.small}
                    </p>
                  </div>
                )}
                {exhibition.pricing.medium > 0 && (
                  <div className="p-4 border border-gray-200 rounded-lg bg-white">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Medium Stall</h3>
                    <p className="text-2xl font-bold text-[#c41e3a]">
                      ${exhibition.pricing.medium}
                    </p>
                  </div>
                )}
                {exhibition.pricing.large > 0 && (
                  <div className="p-4 border border-gray-200 rounded-lg bg-white">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Large Stall</h3>
                    <p className="text-2xl font-bold text-[#c41e3a]">
                      ${exhibition.pricing.large}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Amenities Section */}
          {exhibition.amenities && exhibition.amenities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities & Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exhibition.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 text-[#c41e3a] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Registration CTA */}
          <div className="mt-8">
            <button className="w-full bg-gradient-to-r from-[#c41e3a] to-[#8b0000] text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
              Register for Exhibition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionModal;
