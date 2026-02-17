import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser, FaChartBar, FaCog } from 'react-icons/fa';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { adminAuthAPI } from '../services/adminAuthAPI';
import PortfolioManagement from '../components/admin/PortfolioManagement';
import ExhibitionManagement from '../components/admin/ExhibitionManagement';
import ExhibitionRegistrationsManagement from '../components/admin/ExhibitionRegistrationsManagement';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, admin, logout, isAuthChecking } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalVisitors: 1250,
    totalEnquiries: 48,
    activeProjects: 12,
    teamMembers: 8
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    // Wait for auth check to complete, then redirect if not authenticated
    if (!isAuthChecking && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, isAuthChecking]);

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    await logout();
    navigate('/');
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {admin.name}!</p>
          </div>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'portfolio'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              🎨 Portfolio
            </button>
            <button
              onClick={() => setActiveTab('exhibitions')}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'exhibitions'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              🖼️ Exhibitions
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'registrations'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 Registrations & Enquiries
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Admin Info Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{admin.name}</h2>
              <p className="text-gray-600">{admin.email}</p>
              <p className="text-sm text-red-600 font-semibold mt-1">Role: {admin.role?.toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Visitors */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Visitors</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalVisitors}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaChartBar className="text-blue-600 text-xl" />
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-4">+12% from last month</p>
          </div>

          {/* Total Enquiries */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Enquiries</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalEnquiries}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaChartBar className="text-green-600 text-xl" />
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-4">+8% from last month</p>
          </div>

          {/* Active Projects */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Projects</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeProjects}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FaChartBar className="text-purple-600 text-xl" />
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-4">3 in progress</p>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Team Members</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.teamMembers}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FaUser className="text-orange-600 text-xl" />
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-4">All active</p>
          </div>
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaCog /> Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                📊 View Analytics
              </button>
              <button className="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium">
                📝 Manage Enquiries
              </button>
              <button className="w-full text-left px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium">
                🎨 Edit Portfolio
              </button>
              <button className="w-full text-left px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors font-medium">
                🖼️ Manage Gallery
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">New Enquiry Received</p>
                  <p className="text-sm text-gray-600">From Acme Corporation - Exhibition Booth Design</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Project Completed</p>
                  <p className="text-sm text-gray-600">Successful delivery of Premium Exhibition Stand</p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Portfolio Updated</p>
                  <p className="text-sm text-gray-600">5 new projects added to the portfolio</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <PortfolioManagement />
        )}

        {activeTab === 'exhibitions' && (
          <ExhibitionManagement />
        )}

        {activeTab === 'registrations' && (
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <ExhibitionRegistrationsManagement />
          </div>
        )}
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout from your admin account?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
