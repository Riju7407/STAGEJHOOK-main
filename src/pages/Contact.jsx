import React from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
// import LocationMap from '../components/contact/LocationMap';

const Contact = () => {
  return (
    <div className="bg-white">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      {/* <LocationMap /> */}
    </div>
  );
};

export default Contact;
