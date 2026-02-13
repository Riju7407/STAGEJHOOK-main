import { FaArrowRight } from "react-icons/fa";

const Clients = () => {
  const clients = [
    { id: 1, logo: "/clients/r.png", name: "r" },
    { id: 2, logo: "/clients/1.png", name: "1" },
    { id: 3, logo: "/clients/2.png", name: "2" },
    { id: 4, logo: "/clients/3.png", name: "3" },
    { id: 5, logo: "/clients/4.png", name: "4" },
    { id: 6, logo: "/clients/5.png", name: "5" },
  ];

  return (
    <div className="bg-white py-8 sm:py-12 px-4 sm:px-6 rounded-lg shadow-md">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
        Our Clientele
      </h2>

      {/* CLIENT LOGOS GRID */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
        {clients.map((client) => (
          <div
            key={client.id}
            className="flex items-center justify-center w-20 h-16 sm:w-24 sm:h-20 hover:scale-110 transition-all duration-300"
          >
            <img
              src={client.logo}
              alt={client.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* VIEW ALL BRANDS BUTTON */}
      <div className="text-center">
        <button className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-800 font-semibold hover:text-[#A61C23] transition-colors duration-300">
          View All Brands
          <FaArrowRight className="text-xs sm:text-sm" />
        </button>
      </div>
    </div>
  );
};

export default Clients;
