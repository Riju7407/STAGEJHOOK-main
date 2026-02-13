import AboutHero from '../components/about/AboutHero';
import AboutIntro from '../components/about/AboutIntro';
import CoreValues from '../components/about/CoreValues';
import MissionVision from '../components/about/MissionVision';
import OurExperties from '../components/about/OurExpertise';
import OurPresence from '../components/about/OurPresence';

const About = () => {
  return (
    <div className="about-page">
      <AboutHero />
      <AboutIntro />
      <MissionVision />
      <OurExperties></OurExperties>
      <CoreValues />
      <OurPresence></OurPresence>
    </div>
  );
};

export default About;
