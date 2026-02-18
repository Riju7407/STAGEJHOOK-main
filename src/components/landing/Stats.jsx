import React, { useEffect, useState } from 'react';
import { FaBuilding, FaUsers, FaStore, FaRoad } from 'react-icons/fa';
import { getStats } from '../../services/statsAPI';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Fallback to default stats
        setStats({
          coveredArea: { value: 46000, label: 'sqm Covered Area' },
          clients: { value: 650, label: 'Clients' },
          exhibitionStands: { value: 2700, label: 'Exhibition Stands' },
          avenues: { value: 95, label: 'Avenues' },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="w-full h-auto bg-gray-200">Loading...</div>;
  }

  if (!stats) {
    return null;
  }

  return (
    <section className="relative w-full">
      {/* STATS IMAGE SECTION */}
      <div className="relative w-full">
        <img 
          src="/stats-banner.jpg" 
          alt="Company Statistics Background"
          className="w-full h-auto object-cover block"
        />
        
        {/* STATS OVERLAY */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl mx-auto px-4 md:px-8">
            {/* Covered Area */}
            <div className="text-center">
              <FaBuilding className="text-4xl md:text-5xl text-white mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stats.coveredArea?.value || 46000}+
              </div>
              <p className="text-sm md:text-base font-semibold text-white">
                {stats.coveredArea?.label || 'sqm Covered Area'}
              </p>
            </div>

            {/* Clients */}
            <div className="text-center">
              <FaUsers className="text-4xl md:text-5xl text-white mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stats.clients?.value || 650}+
              </div>
              <p className="text-sm md:text-base font-semibold text-white">
                {stats.clients?.label || 'Clients'}
              </p>
            </div>

            {/* Exhibition Stands */}
            <div className="text-center">
              <FaStore className="text-4xl md:text-5xl text-white mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stats.exhibitionStands?.value || 2700}+
              </div>
              <p className="text-sm md:text-base font-semibold text-white">
                {stats.exhibitionStands?.label || 'Exhibition Stands'}
              </p>
            </div>

            {/* Avenues */}
            <div className="text-center">
              <FaRoad className="text-4xl md:text-5xl text-white mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stats.avenues?.value || 95}+
              </div>
              <p className="text-sm md:text-base font-semibold text-white">
                {stats.avenues?.label || 'Avenues'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
