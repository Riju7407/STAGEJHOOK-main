import React from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: FaWhatsapp,
      title: 'Whatsapp',
      color: 'text-green-500',
      contacts: [
        { number: '99599 82358', link: 'https://wa.me/919959982358' },
      ]
    },
    {
      icon: FaPhone,
      title: 'Phone',
      color: 'text-[#ee1d23]',
      contacts: [
        { number: '99599 82358', link: 'tel:+919959982358' },
      ]
    },
    {
      icon: FaEnvelope,
      title: 'Mail',
      color: 'text-blue-600',
      contacts: [
        { number: 'info@stagehook.co.in', link: 'mailto:info@stagehook.co.in' },
      ]
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
              <method.icon className={`text-5xl ${method.color} mx-auto mb-4`} />
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{method.title}</h3>
              <div className="space-y-3">
                {method.contacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={contact.link}
                    className="block text-[#ee1d23] hover:text-[#c41519] font-semibold transition-colors"
                  >
                    {contact.number}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
