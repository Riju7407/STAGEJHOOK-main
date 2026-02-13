import React from 'react';
import ExhibitionHero from '../components/exhibition/ExhibitionHero';
import ExhibitionGrid from '../components/exhibition/ExhibitionGrid';

const ExhibitionCalendar = () => {
  return (
    <div className="min-h-screen bg-white">
      <ExhibitionHero />
      <ExhibitionGrid />
    </div>
  );
};

export default ExhibitionCalendar;
