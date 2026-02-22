import React from 'react';

const ExhibitionCard = ({ exhibition, onReadMore }) => {
  // Format date from API
  const formatDate = (startDate, endDate) => {
    try {
      const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `${start} - ${end}`;
    } catch (e) {
      return 'TBD';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={exhibition.coverImageUrl || exhibition.image} 
          alt={exhibition.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x300?text=Exhibition';
          }}
        />
        {/* Badge */}
        {(exhibition.category || exhibition.badge) && (
          <div className="absolute top-4 right-4 bg-[#71a3c1] text-white px-3 py-1 rounded-full text-sm font-semibold">
            {exhibition.category || exhibition.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {exhibition.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {exhibition.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          {(exhibition.startDate || exhibition.date) && (
            <div className="flex items-center text-sm text-gray-700">
              <svg className="w-5 h-5 mr-2 text-[#ee1d23]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">
                {exhibition.date || formatDate(exhibition.startDate, exhibition.endDate)}
              </span>
            </div>
          )}
          {(exhibition.location) && (
            <div className="flex items-center text-sm text-gray-700">
              <svg className="w-5 h-5 mr-2 text-[#ee1d23]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{exhibition.location}</span>
            </div>
          )}
        </div>

        {/* Read More Link */}
        <button 
          onClick={() => onReadMore && onReadMore(exhibition)}
          className="text-[#ee1d23] font-semibold text-sm hover:underline flex items-center group transition-all duration-300 cursor-pointer"
        >
          Read More
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ExhibitionCard;
