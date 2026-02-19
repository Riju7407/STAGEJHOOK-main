import { useState, useEffect } from 'react';
import { FaTrash, FaCheck, FaClock, FaSearch } from 'react-icons/fa';

export default function ExhibitionRegistrationsManagement() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch all enquiries
  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${API_URL}/enquiry`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch enquiries');
      }

      const data = await response.json();
      
      // Display all enquiries (exhibition registrations and contact queries)
      setRegistrations(data.data);
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setError(err.message || 'Failed to load registrations');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/enquiry/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local state
      setRegistrations(registrations.map(reg => 
        reg._id === id ? { ...reg, status: newStatus } : reg
      ));
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update registration status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/enquiry/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete registration');
      }

      setRegistrations(registrations.filter(reg => reg._id !== id));
    } catch (err) {
      console.error('Error deleting registration:', err);
      alert('Failed to delete registration');
    }
  };

  // Filter registrations based on search, status, and type
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (reg.company || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    const matchesType = typeFilter === 'all' || reg.enquiryType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'resolved':
        return 'bg-teal-100 text-teal-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'new':
        return <FaClock className="inline mr-1" />;
      case 'confirmed':
        return <FaCheck className="inline mr-1" />;
      default:
        return null;
    }
  };

  const getEnquiryTypeLabel = (type) => {
    const labels = {
      'exhibition_stall': 'Exhibition Registration',
      'portfolio_project': 'Portfolio Project Request',
      'contact_inquiry': 'Contact Query',
      'sponsorship': 'Sponsorship Inquiry',
      'bulk_order': 'Bulk Order',
      'general_inquiry': 'General Inquiry',
      'other': 'Other'
    };
    return labels[type] || type;
  };

  const getEnquiryTypeColor = (type) => {
    const colors = {
      'exhibition_stall': 'bg-blue-100 text-blue-800',
      'portfolio_project': 'bg-pink-100 text-pink-800',
      'contact_inquiry': 'bg-purple-100 text-purple-800',
      'sponsorship': 'bg-green-100 text-green-800',
      'bulk_order': 'bg-orange-100 text-orange-800',
      'general_inquiry': 'bg-gray-100 text-gray-800',
      'other': 'bg-yellow-100 text-yellow-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Registrations & Enquiries</h2>

      {/* Search and Filter */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="confirmed">Confirmed</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="exhibition_stall">Exhibition Registration</option>
          <option value="portfolio_project">Portfolio Project Request</option>
          <option value="contact_inquiry">Contact Query</option>
          <option value="sponsorship">Sponsorship</option>
          <option value="general_inquiry">General Inquiry</option>
          <option value="bulk_order">Bulk Order</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading registrations...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {/* Registrations Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          {filteredRegistrations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No registrations found
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Company</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((reg) => (
                  <tr key={reg._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800 font-medium">{reg.name}</td>
                    <td className="px-4 py-3 text-gray-700">{reg.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEnquiryTypeColor(reg.enquiryType)}`}>
                        {getEnquiryTypeLabel(reg.enquiryType)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{reg.company || '-'}</td>
                    <td className="px-4 py-3">
                      <select
                        value={reg.status}
                        onChange={(e) => handleStatusChange(reg._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-semibold border-0 cursor-pointer ${getStatusColor(reg.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setSelectedRegistration(reg)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(reg._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Total Count */}
      {!loading && !error && (
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredRegistrations.length} of {registrations.length} enquiries
        </div>
      )}

      {/* Detail Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
            <h3 className="text-xl font-bold mb-4">Registration Details</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-semibold text-gray-700">Name:</label>
                <p className="text-gray-800">{selectedRegistration.name}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Email:</label>
                <p className="text-gray-800">{selectedRegistration.email}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Phone:</label>
                <p className="text-gray-800">{selectedRegistration.phone || '-'}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Company:</label>
                <p className="text-gray-800">{selectedRegistration.company || '-'}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Status:</label>
                <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedRegistration.status)}`}>
                  {getStatusIcon(selectedRegistration.status)}
                  {selectedRegistration.status}
                </p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Date:</label>
                <p className="text-gray-800">{new Date(selectedRegistration.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Enquiry Type Info */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <label className="font-semibold text-gray-700 block mb-2">Enquiry Type:</label>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getEnquiryTypeColor(selectedRegistration.enquiryType)}`}>
                {getEnquiryTypeLabel(selectedRegistration.enquiryType)}
              </span>
            </div>

            {/* Exhibition Info - Only show if exhibition_stall */}
            {selectedRegistration.enquiryType === 'exhibition_stall' && selectedRegistration.exhibitionId && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <label className="font-semibold text-gray-700">Exhibition:</label>
                <p className="text-gray-800">
                  {selectedRegistration.exhibitionId?.title || 'Exhibition'}
                </p>
              </div>
            )}

            {/* Portfolio Info - Only show if portfolio_project */}
            {selectedRegistration.enquiryType === 'portfolio_project' && selectedRegistration.portfolioId && (
              <div className="mb-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
                <label className="font-semibold text-gray-700">Portfolio Project:</label>
                <p className="text-gray-800">
                  {selectedRegistration.portfolioId?.title || 'Portfolio Project'}
                </p>
              </div>
            )}

            <div>
              <label className="font-semibold text-gray-700">Subject:</label>
              <p className="text-gray-800 mb-4">{selectedRegistration.subject}</p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Message:</label>
              <p className="text-gray-800 bg-gray-50 p-3 rounded mb-4 whitespace-pre-wrap">{selectedRegistration.message}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedRegistration(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedRegistration._id);
                  setSelectedRegistration(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
