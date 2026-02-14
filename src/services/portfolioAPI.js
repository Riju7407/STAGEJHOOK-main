/**
 * Portfolio API Service
 * Handles all portfolio CRUD operations
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get all portfolios with optional filters
 */
export async function getAllPortfolios(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.isPublished !== undefined) params.append('isPublished', filters.isPublished);
    if (filters.category) params.append('category', filters.category);

    const response = await fetch(`${API_BASE_URL}/portfolio?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Failed to fetch portfolios');
    return await response.json();
  } catch (error) {
    console.error('Get portfolios error:', error);
    throw error;
  }
}

/**
 * Get single portfolio by ID
 */
export async function getPortfolioById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Portfolio not found');
    return await response.json();
  } catch (error) {
    console.error('Get portfolio error:', error);
    throw error;
  }
}

/**
 * Create new portfolio
 */
export async function createPortfolio(portfolioData, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(portfolioData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Create portfolio error:', error);
    throw error;
  }
}

/**
 * Update portfolio
 */
export async function updatePortfolio(id, portfolioData, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(portfolioData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Update portfolio error:', error);
    throw error;
  }
}

/**
 * Delete portfolio
 */
export async function deletePortfolio(id, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Delete portfolio error:', error);
    throw error;
  }
}

/**
 * Publish/Unpublish portfolio
 */
export async function publishPortfolio(id, isPublished, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/${id}/publish`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ isPublished })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Publish portfolio error:', error);
    throw error;
  }
}

export default {
  getAllPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  publishPortfolio
};
