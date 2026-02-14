import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getAllExhibitions, createExhibition, updateExhibition, deleteExhibition, publishExhibition } from '../../services/exhibitionAPI';
import { uploadImage, deleteImage } from '../../services/imageUploadAPI';
import { FiEdit2, FiTrash2, FiEye, FiEyeOff, FiPlus, FiX } from 'react-icons/fi';

export default function ExhibitionManagement() {
  const { token } = useAdminAuth();
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    coverImageUrl: '',
    coverImageName: '',
    category: 'expo',
    capacity: 100,
    stallSize: { small: 10, medium: 5, large: 3 },
    pricing: { small: 1000, medium: 1500, large: 2000, currency: 'USD' },
    amenities: []
  });

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      setLoading(true);
      const response = await getAllExhibitions();
      setExhibitions(response.data || []);
    } catch (err) {
      setError('Failed to fetch exhibitions');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const imageUrl = await uploadImage(file, token);
      setFormData(prev => ({
        ...prev,
        coverImageUrl: imageUrl,
        coverImageName: file.name
      }));
      setSuccess('Image uploaded successfully');
    } catch (err) {
      setError('Failed to upload image: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStallSizeChange = (stallType, value) => {
    setFormData(prev => ({
      ...prev,
      stallSize: {
        ...prev.stallSize,
        [stallType]: parseInt(value)
      }
    }));
  };

  const handlePricingChange = (stallType, value) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [stallType]: parseInt(value)
      }
    }));
  };

  const handleAddAmenity = () => {
    const amenity = prompt('Enter amenity name:');
    if (amenity) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity]
      }));
    }
  };

  const handleRemoveAmenity = (index) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (editingId) {
        await updateExhibition(editingId, formData, token);
        setSuccess('Exhibition updated successfully');
      } else {
        await createExhibition(formData, token);
        setSuccess('Exhibition created successfully');
      }

      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchExhibitions();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (exhibition) => {
    setFormData(exhibition);
    setEditingId(exhibition._id);
    setShowForm(true);
  };

  const handleDelete = async (id, imageName) => {
    if (!window.confirm('Are you sure you want to delete this exhibition?')) return;

    try {
      setLoading(true);
      await deleteExhibition(id, token);
      if (imageName) {
        await deleteImage(imageName, token);
      }
      setSuccess('Exhibition deleted successfully');
      fetchExhibitions();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (id, currentStatus) => {
    try {
      await publishExhibition(id, !currentStatus, token);
      setSuccess(`Exhibition ${!currentStatus ? 'published' : 'unpublished'}`);
      fetchExhibitions();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      coverImageUrl: '',
      coverImageName: '',
      category: 'expo',
      capacity: 100,
      stallSize: { small: 10, medium: 5, large: 3 },
      pricing: { small: 1000, medium: 1500, large: 2000, currency: 'USD' },
      amenities: []
    });
  };

  const getStatusBadge = (status) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.upcoming;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Exhibition Calendar</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (editingId) {
                setEditingId(null);
                resetForm();
              }
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <FiPlus /> {showForm ? 'Cancel' : 'Add Exhibition'}
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button onClick={() => setError(null)} className="float-right">×</button>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
            <button onClick={() => setSuccess(null)} className="float-right">×</button>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Exhibition Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="border rounded px-3 py-2 w-full"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                >
                  <option value="trade_show">Trade Show</option>
                  <option value="art_exhibition">Art Exhibition</option>
                  <option value="product_launch">Product Launch</option>
                  <option value="conference">Conference</option>
                  <option value="expo">Expo</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="3"
                className="border rounded px-3 py-2 w-full"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              {/* Image Upload */}
              <div className="border-2 border-dashed rounded p-4">
                <label className="block text-sm font-medium mb-2">Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="block w-full text-sm text-gray-500"
                />
                {uploadingImage && <p className="text-blue-600 mt-2">Uploading...</p>}
                {formData.coverImageUrl && (
                  <img src={formData.coverImageUrl} alt="Preview" className="h-32 w-32 object-cover rounded mt-2" />
                )}
              </div>

              {/* Stall Sizes */}
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold mb-3">Stall Availability</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Small Stalls</label>
                    <input
                      type="number"
                      value={formData.stallSize.small}
                      onChange={(e) => handleStallSizeChange('small', e.target.value)}
                      className="border rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Medium Stalls</label>
                    <input
                      type="number"
                      value={formData.stallSize.medium}
                      onChange={(e) => handleStallSizeChange('medium', e.target.value)}
                      className="border rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Large Stalls</label>
                    <input
                      type="number"
                      value={formData.stallSize.large}
                      onChange={(e) => handleStallSizeChange('large', e.target.value)}
                      className="border rounded px-3 py-2 w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold mb-3">Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Small Stall Price</label>
                    <input
                      type="number"
                      value={formData.pricing.small}
                      onChange={(e) => handlePricingChange('small', e.target.value)}
                      className="border rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Medium Stall Price</label>
                    <input
                      type="number"
                      value={formData.pricing.medium}
                      onChange={(e) => handlePricingChange('medium', e.target.value)}
                      className="border rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Large Stall Price</label>
                    <input
                      type="number"
                      value={formData.pricing.large}
                      onChange={(e) => handlePricingChange('large', e.target.value)}
                      className="border rounded px-3 py-2 w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.amenities.map((amenity, idx) => (
                    <span key={idx} className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2">
                      {amenity}
                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(idx)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddAmenity}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
                >
                  Add Amenity
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || !formData.title || !formData.description || !formData.coverImageUrl}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Exhibition List */}
        <div className="grid grid-cols-1 gap-6">
          {exhibitions.map(exhibition => (
            <div key={exhibition._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="flex">
                <img src={exhibition.coverImageUrl} alt={exhibition.title} className="w-48 h-48 object-cover" />
                
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{exhibition.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(exhibition.status)}`}>
                        {exhibition.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">{exhibition.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                      <div>
                        <span className="text-gray-500">Location:</span>
                        <p className="font-medium">{exhibition.location}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Capacity:</span>
                        <p className="font-medium">{exhibition.capacity}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Registered:</span>
                        <p className="font-medium">{exhibition.registeredCount}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Category:</span>
                        <p className="font-medium capitalize">{exhibition.category}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end mt-4">
                    <button
                      onClick={() => handlePublish(exhibition._id, exhibition.isPublished)}
                      className="text-gray-600 hover:text-blue-600 p-2"
                      title={exhibition.isPublished ? 'Unpublish' : 'Publish'}
                    >
                      {exhibition.isPublished ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                    </button>
                    <button
                      onClick={() => handleEdit(exhibition)}
                      className="text-gray-600 hover:text-green-600 p-2"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(exhibition._id, exhibition.coverImageName)}
                      className="text-gray-600 hover:text-red-600 p-2"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {exhibitions.length === 0 && !showForm && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No exhibitions yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create First Exhibition
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
