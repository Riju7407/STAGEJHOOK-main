/**
 * Exhibition API Service
 * Handles all exhibition CRUD operations
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get all exhibitions with optional filters
 */
export async function getAllExhibitions(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.isPublished !== undefined) params.append('isPublished', filters.isPublished);
    if (filters.category) params.append('category', filters.category);

    const response = await fetch(`${API_BASE_URL}/exhibition?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) throw new Error('Failed to fetch exhibitions');
    return await response.json();
  } catch (error) {
    console.error('Get exhibitions error:', error);
    throw error;
  }
}

/**
 * Get single exhibition by ID
 */
export async function getExhibitionById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/exhibition/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) throw new Error('Exhibition not found');
    return await response.json();
  } catch (error) {
    console.error('Get exhibition error:', error);
    throw error;
  }
}

/**
 * Create new exhibition
 */
export async function createExhibition(exhibitionData, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/exhibition`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(exhibitionData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Create exhibition error:', error);
    throw error;
  }
}

/**
 * Update exhibition
 */
export async function updateExhibition(id, exhibitionData, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/exhibition/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(exhibitionData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Update exhibition error:', error);
    throw error;
  }
}

/**
 * Delete exhibition
 */
export async function deleteExhibition(id, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/exhibition/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Delete exhibition error:', error);
    throw error;
  }
}

/**
 * Publish/Unpublish exhibition
 */
export async function publishExhibition(id, isPublished, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/exhibition/${id}/publish`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({ isPublished })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Publish exhibition error:', error);
    throw error;
  }
}

/**
 * Register stall for exhibition
 */
export async function registerStall(id, stallSize) {
  try {
    const response = await fetch(`${API_BASE_URL}/exhibition/${id}/register-stall`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ stallSize })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Register stall error:', error);
    throw error;
  }
}

export default {
  getAllExhibitions,
  getExhibitionById,
  createExhibition,
  updateExhibition,
  deleteExhibition,
  publishExhibition,
  registerStall
};
