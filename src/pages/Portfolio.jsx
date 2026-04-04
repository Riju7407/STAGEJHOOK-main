import { useEffect } from 'react';
import PortfolioHero from '../components/portfolio/PortfolioHero';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';

const Portfolio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="portfolio-page">
      <PortfolioHero />
      <PortfolioGrid />
    </div>
  );
};

export default Portfolio;
