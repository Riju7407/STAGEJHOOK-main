import React, { useEffect, useState } from 'react';
import { getStats, updateStats, deleteStats, createStats } from '../../services/statsAPI';

const StatsManagement = () => {
  const [stats, setStats] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    coveredArea: { value: 0, label: '' },
    clients: { value: 0, label: '' },
    exhibitionStands: { value: 0, label: '' },
    avenues: { value: 0, label: '' },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('adminToken');

  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getStats();
      setStats(data);
      setFormData({
        coveredArea: data.coveredArea || { value: 46000, label: 'sqm Covered Area' },
        clients: data.clients || { value: 650, label: 'Clients' },
        exhibitionStands: data.exhibitionStands || { value: 2700, label: 'Exhibition Stands' },
        avenues: data.avenues || { value: 95, label: 'Avenues' },
      });
      setError('');
    } catch (err) {
      setError('Failed to fetch stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [key, subKey] = name.split('.');

    setFormData({
      ...formData,
      [key]: {
        ...formData[key],
        [subKey]: subKey === 'value' ? parseInt(value) || 0 : value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');

      if (stats && stats._id) {
        await updateStats(stats._id, formData, token);
        setSuccess('Stats updated successfully!');
      } else {
        const newStats = await createStats(formData, token);
        setStats(newStats);
        setSuccess('Stats created successfully!');
      }

      setEditMode(false);
      await fetchStats();
    } catch (err) {
      setError('Failed to save stats: ' + err.message);
    }
  };

  const handleDelete = async () => {
    if (stats && stats._id && window.confirm('Are you sure you want to delete the stats?')) {
      try {
        await deleteStats(stats._id, token);
        setSuccess('Stats deleted successfully!');
        setStats(null);
        setFormData({
          coveredArea: { value: 46000, label: 'sqm Covered Area' },
          clients: { value: 650, label: 'Clients' },
          exhibitionStands: { value: 2700, label: 'Exhibition Stands' },
          avenues: { value: 95, label: 'Avenues' },
        });
      } catch (err) {
        setError('Failed to delete stats: ' + err.message);
      }
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Statistics Management</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {!editMode ? (
        <div>
          {stats ? (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border p-4 rounded">
                <p className="text-gray-600">Covered Area</p>
                <p className="text-2xl font-bold">{stats.coveredArea?.value || 46000}+</p>
                <p className="text-sm text-gray-500">{stats.coveredArea?.label}</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-gray-600">Clients</p>
                <p className="text-2xl font-bold">{stats.clients?.value || 650}+</p>
                <p className="text-sm text-gray-500">{stats.clients?.label}</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-gray-600">Exhibition Stands</p>
                <p className="text-2xl font-bold">{stats.exhibitionStands?.value || 2700}+</p>
                <p className="text-sm text-gray-500">{stats.exhibitionStands?.label}</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-gray-600">Avenues</p>
                <p className="text-2xl font-bold">{stats.avenues?.value || 95}+</p>
                <p className="text-sm text-gray-500">{stats.avenues?.label}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mb-6">No statistics found. Create new statistics.</p>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {stats ? 'Edit' : 'Create'}
            </button>
            {stats && (
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Covered Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Covered Area Value
            </label>
            <input
              type="number"
              name="coveredArea.value"
              value={formData.coveredArea.value}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            <label className="block text-sm font-medium text-gray-700 mt-2 mb-2">
              Covered Area Label
            </label>
            <input
              type="text"
              name="coveredArea.label"
              value={formData.coveredArea.label}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Clients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Clients Value
            </label>
            <input
              type="number"
              name="clients.value"
              value={formData.clients.value}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            <label className="block text-sm font-medium text-gray-700 mt-2 mb-2">
              Clients Label
            </label>
            <input
              type="text"
              name="clients.label"
              value={formData.clients.label}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Exhibition Stands */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exhibition Stands Value
            </label>
            <input
              type="number"
              name="exhibitionStands.value"
              value={formData.exhibitionStands.value}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            <label className="block text-sm font-medium text-gray-700 mt-2 mb-2">
              Exhibition Stands Label
            </label>
            <input
              type="text"
              name="exhibitionStands.label"
              value={formData.exhibitionStands.label}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Avenues */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avenues Value
            </label>
            <input
              type="number"
              name="avenues.value"
              value={formData.avenues.value}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            <label className="block text-sm font-medium text-gray-700 mt-2 mb-2">
              Avenues Label
            </label>
            <input
              type="text"
              name="avenues.label"
              value={formData.avenues.label}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StatsManagement;
