import "./Clients.css";

const Clients = () => {
  const clients = [
    { id: 1, logo: "/clients/r.png", name: "r" },
    { id: 2, logo: "/clients/1.png", name: "1" },
    { id: 3, logo: "/clients/2.png", name: "2" },
    { id: 4, logo: "/clients/3.png", name: "3" },
    { id: 5, logo: "/clients/4.png", name: "4" },
    { id: 6, logo: "/clients/5.png", name: "5" },
  ];

  // Duplicate clients for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <div className="bg-white mobile-section-padding-compact mobile-container rounded-lg shadow-md">
      <h2 className="mobile-heading-2 text-gray-800 text-center mb-6 sm:mb-8">
        Our Clientele
      </h2>

      {/* CLIENT LOGOS CAROUSEL */}
      <div className="carousel-container mb-6 sm:mb-8">
        <div className="carousel-track">
          {duplicatedClients.map((client, index) => (
            <div
              key={index}
              className="carousel-item flex items-center justify-center w-20 h-16 sm:w-24 sm:h-20 flex-shrink-0"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain hover:scale-110 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
