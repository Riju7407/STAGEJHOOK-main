import React from 'react';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ServicesHero from '../components/services/ServicesHero';
import ServicesGrid from '../components/services/ServicesGrid';
import ExhibitionStallDesign from '../components/services/ExhibitionStallDesign';
import GraphicDesigning from '../components/services/GraphicDesigning';
import EventManagement from '../components/services/EventManagement';
import DigitalMarketing from '../components/services/DigitalMarketing';
import ATLBTLServices from '../components/services/ATLBTLServices';
import WebDevelopment from '../components/services/WebDevelopment';
import ProcessTimeline from '../components/services/ProcessTimeline';

const Services = () => {
  return (
    <div className="bg-white">
      <TopBar />
      <Navbar />
      <ServicesHero />
      <ServicesGrid />
      <ExhibitionStallDesign />
      <GraphicDesigning />
      <EventManagement />
      <DigitalMarketing />
      <ATLBTLServices />
      <WebDevelopment />
      <ProcessTimeline />
      <Footer />
    </div>
  );
};

export default Services;
