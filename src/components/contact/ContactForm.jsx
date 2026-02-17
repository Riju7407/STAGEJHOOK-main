import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    mobile: '',
    email: '',
    query: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.mobile,
          company: formData.company,
          subject: 'Contact Form Query',
          message: formData.query,
          enquiryType: 'contact_inquiry'
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit query');
      }

      setSuccess(true);
      setFormData({
        name: '',
        company: '',
        mobile: '',
        email: '',
        query: ''
      });

      // Show success message for 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to submit query. Please try again.');
    } finally {
      setLoading(false);
    }
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
            
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
                ✓ Your query has been submitted successfully! We'll get back to you soon.
              </div>
            )}

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
                  disabled={loading}
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ee1d23]"
                  disabled={loading}
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
                  disabled={loading}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ee1d23]"
                  required
                  disabled={loading}
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
                disabled={loading}
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ee1d23] text-white py-3 rounded-md font-bold text-lg hover:bg-[#c41519] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Query'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
