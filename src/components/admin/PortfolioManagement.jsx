import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getAllPortfolios, createPortfolio, updatePortfolio, deletePortfolio, publishPortfolio } from '../../services/portfolioAPI';
import { uploadImage, deleteImage } from '../../services/imageUploadAPI';
import { FiEdit2, FiTrash2, FiEye, FiEyeOff, FiPlus, FiX } from 'react-icons/fi';

export default function PortfolioManagement() {
  const { token } = useAdminAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'exhibition',
    imageUrl: '',
    imageName: '',
    client: '',
    location: '',
    status: 'draft',
    tags: [],
    galleryUrls: []
  });

  // Fetch portfolios on mount
  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await getAllPortfolios();
      setPortfolios(response.data || []);
    } catch (err) {
      setError('Failed to fetch portfolios');
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
        imageUrl,
        imageName: file.name
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

  const handleAddTag = () => {
    const tag = prompt('Enter tag name:');
    if (tag) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      if (editingId) {
        await updatePortfolio(editingId, formData, token);
        setSuccess('Portfolio updated successfully');
      } else {
        await createPortfolio(formData, token);
        setSuccess('Portfolio created successfully');
      }
      
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchPortfolios();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (portfolio) => {
    setFormData(portfolio);
    setEditingId(portfolio._id);
    setShowForm(true);
  };

  const handleDelete = async (id, imageName) => {
    if (!window.confirm('Are you sure you want to delete this portfolio?')) return;

    try {
      setLoading(true);
      await deletePortfolio(id, token);
      if (imageName) {
        await deleteImage(imageName, token);
      }
      setSuccess('Portfolio deleted successfully');
      fetchPortfolios();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (id, currentStatus) => {
    try {
      await publishPortfolio(id, !currentStatus, token);
      setSuccess(`Portfolio ${!currentStatus ? 'published' : 'unpublished'}`);
      fetchPortfolios();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'exhibition',
      imageUrl: '',
      imageName: '',
      client: '',
      location: '',
      status: 'draft',
      tags: [],
      galleryUrls: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
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
            <FiPlus /> {showForm ? 'Cancel' : 'Add New'}
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
                  placeholder="Title"
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
                  <option value="exhibition">Exhibition</option>
                  <option value="design">Design</option>
                  <option value="event">Event</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="border rounded px-3 py-2 w-full"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="client"
                  placeholder="Client Name"
                  value={formData.client}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              {/* Image Upload */}
              <div className="border-2 border-dashed rounded p-4">
                <label className="block text-sm font-medium mb-2">Portfolio Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="block w-full text-sm text-gray-500"
                />
                {uploadingImage && <p className="text-blue-600 mt-2">Uploading...</p>}
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img src={formData.imageUrl} alt="Preview" className="h-32 w-32 object-cover rounded" />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(idx)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
                >
                  Add Tag
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || !formData.title || !formData.description || !formData.imageUrl}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Portfolio List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map(portfolio => (
            <div key={portfolio._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img src={portfolio.imageUrl} alt={portfolio.title} className="w-full h-48 object-cover" />
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{portfolio.title}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{portfolio.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {portfolio.tags?.map((tag, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handlePublish(portfolio._id, portfolio.isPublished)}
                    className="text-gray-600 hover:text-blue-600 p-2"
                    title={portfolio.isPublished ? 'Unpublish' : 'Publish'}
                  >
                    {portfolio.isPublished ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => handleEdit(portfolio)}
                    className="text-gray-600 hover:text-green-600 p-2"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(portfolio._id, portfolio.imageName)}
                    className="text-gray-600 hover:text-red-600 p-2"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {portfolios.length === 0 && !showForm && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No portfolios yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create First Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
