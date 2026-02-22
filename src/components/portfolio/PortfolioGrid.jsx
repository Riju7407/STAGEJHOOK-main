import React, { useState, useEffect } from 'react';
import { getAllPortfolios } from '../../services/portfolioAPI';
import PortfolioModal from './PortfolioModal';

const PortfolioGrid = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      console.log('📂 Fetching portfolios from API...');
      // Fetch only published portfolios
      const response = await getAllPortfolios({ isPublished: true });
      console.log('✅ Portfolios fetched:', response.data.length);
      setPortfolios(response.data || []);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching portfolios:', err);
      setError('Failed to load portfolios');
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">Loading portfolios...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (!portfolios || portfolios.length === 0) {
    return (
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">No portfolios available at this time.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelectedItem(item)}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-[4/3] bg-gray-200"
              >
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x300?text=Portfolio';
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {item.category?.charAt(0).toUpperCase() + item.category?.slice(1).toLowerCase()}
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
