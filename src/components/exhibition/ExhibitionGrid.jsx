import React from 'react';
import ExhibitionCard from './ExhibitionCard';
import { exhibitions } from '../../assets/data/exhibitions';

const ExhibitionGrid = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exhibitions.map((exhibition) => (
          <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
        ))}
      </div>
    </section>
  );
};

export default ExhibitionGrid;
