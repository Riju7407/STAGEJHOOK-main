import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    mobile: '',
    email: '',
    query: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Address Section */}
          <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-300">
            <div className="flex items-start mb-4">
              <div className="text-[#ee1d23] text-3xl mr-4">📍</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Address</h3>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold">Noida Head Office:</p>
                    <p className="text-sm">D-128, Sector 2, Noida, Noida, Gautam Buddha Nagar - 201301</p>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Submit A Query</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ee1d23]"
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ee1d23]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ee1d23]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ee1d23]"
                  required
                />
              </div>

              <textarea
                name="query"
                placeholder="Query"
                value={formData.query}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ee1d23] resize-none"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#ee1d23] text-white py-3 rounded-md font-bold text-lg hover:bg-[#c41519] transition-colors"
              >
                Submit Query
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
