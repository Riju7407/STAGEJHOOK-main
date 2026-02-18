const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get all stats
export const getStats = async () => {
  try {
    const response = await fetch(`${API_URL}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

// Get single stat
export const getStatById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/stats/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch stat');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stat:', error);
    throw error;
  }
};

// Create stats (admin only)
export const createStats = async (statsData, token) => {
  try {
    const response = await fetch(`${API_URL}/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(statsData),
    });
    if (!response.ok) {
      throw new Error('Failed to create stats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating stats:', error);
    throw error;
  }
};

// Update stats (admin only)
export const updateStats = async (id, statsData, token) => {
  try {
    const response = await fetch(`${API_URL}/stats/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(statsData),
    });
    if (!response.ok) {
      throw new Error('Failed to update stats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating stats:', error);
    throw error;
  }
};

// Delete stats (admin only)
export const deleteStats = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/stats/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete stats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting stats:', error);
    throw error;
  }
};
