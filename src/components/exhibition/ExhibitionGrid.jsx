import React, { useState, useEffect } from 'react';
import ExhibitionCard from './ExhibitionCard';
import ExhibitionModal from './ExhibitionModal';
import { getAllExhibitions } from '../../services/exhibitionAPI';

const ExhibitionGrid = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExhibition, setSelectedExhibition] = useState(null);

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      setLoading(true);
      console.log('📂 Fetching exhibitions from API...');
      // Fetch only published exhibitions
      const response = await getAllExhibitions({ isPublished: true });
      console.log('✅ Exhibitions fetched:', response.data.length);
      setExhibitions(response.data || []);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching exhibitions:', err);
      setError('Failed to load exhibitions');
      setExhibitions([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-gray-500">Loading exhibitions...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (!exhibitions || exhibitions.length === 0) {
    return (
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-gray-500">No exhibitions available at this time.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exhibitions.map((exhibition) => (
            <ExhibitionCard 
              key={exhibition._id} 
              exhibition={exhibition}
              onReadMore={setSelectedExhibition}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedExhibition && (
        <ExhibitionModal
          exhibition={selectedExhibition}
          onClose={() => setSelectedExhibition(null)}
        />
      )}
    </>
  );
};

export default ExhibitionGrid;
