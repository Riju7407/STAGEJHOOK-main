import { useState } from "react";
import Clients from "./Clients";

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      title: "60sqm",
      subtitle: "AAHAR 2025 (Delhi)",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=400&fit=crop",
      title: "60sqm",
      subtitle: "AAHAR 2025 (Delhi)",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop",
      title: "60sqm",
      subtitle: "AAHAR 2025 (Delhi)",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
      title: "60sqm",
      subtitle: "AAHAR 2025 (Delhi)",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&h=400&fit=crop",
      title: "60sqm",
      subtitle: "AAHAR 2025 (Delhi)",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 sm:py-16">
      <div className="max-w-[1300px]; mx-auto px-4 sm:px-6">
        {/* PORTFOLIO HEADER */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Portfolio
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
            <span className="font-semibold">STAGEHOOK</span> has worked with
            numerous clients who have placed their trust in us, contributing
            towards our notable contribution. Our work reflects excellence,
            unique performance and remarkable exhibition design solutions. Take a
            look at our portfolio to know quality of our work and our role in
            their successful journey.
          </p>
        </div>

        {/* PORTFOLIO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* RED OVERLAY WITH TEXT */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#A61C23] text-white text-center py-2.5 sm:py-3">
                <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
                <p className="text-xs sm:text-sm">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* OUR CLIENTELE SECTION */}
        <Clients />
      </div>
    </section>
  );
};

export default Portfolio;
