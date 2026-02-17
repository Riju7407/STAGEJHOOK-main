import React from 'react';
import ServicesHero from '../components/services/ServicesHero';
import ServicesGrid from '../components/services/ServicesGrid';
import ExhibitionStallDesign from '../components/services/ExhibitionStallDesign';

const Services = () => {
  return (
    <div className="bg-white">
      <ServicesHero />
      <ServicesGrid />
      <ExhibitionStallDesign />
    </div>
  );
};

export default Services;
