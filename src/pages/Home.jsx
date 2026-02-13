import Hero from "../components/landing/Hero";
import WhoAreWe from "../components/landing/WhoAreWe";
import Services from "../components/landing/Services";
import QuoteCTA from "../components/landing/QuoteCTA";
import WhyChooseUs from "../components/landing/WhyChooseUs";
import Stats from "../components/landing/Stats";
import Portfolio from "../components/landing/Portfolio";
import WhyBest from "../components/landing/WhyBest"; 

const Home = () => {
  return (
    <>
      <Hero />
      <WhoAreWe />
      <Services />
      <QuoteCTA />
      <WhyChooseUs />
      <Stats />
      <Portfolio />
      <WhyBest />   
    </>
  );
};

export default Home;
