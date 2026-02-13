// import React from 'react';

// const LocationMap = () => {
//   const locations = [
//     {
//       title: 'Our Services',
//       items: ['Services1', 'Services2', 'Services3', 'Services4', 'Services5', 'Services 6']
//     },
//     {
//       title: 'Our Location',
//       items: [
//         'Noida Head Office: D-128, Sector 2, Noida Sector 15 Metro Station - 201301',
        
//       ]
//     },
//     {
//       title: 'Contact',
//       items: [
//         '📞 99599 82358',
//         '📧 demo@stagehook.co.in',
//         '📧 demo@stagehook.co.in',
//         '📧 demo@stagehook.co.in',
//         '📱 +91234567890'
//       ]
//     }
//   ];

//   return (
//     <section className="bg-[#ee1d23] py-12">
//       <div className="container mx-auto px-6">
//         {/* Submit A Query Section */}
//         <div className="mb-8">
//           <h3 className="text-2xl font-bold text-white mb-4">Submit A Query</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Name"
//               className="px-4 py-2 rounded-md focus:outline-none"
//             />
//             <input
//               type="text"
//               placeholder="Company"
//               className="px-4 py-2 rounded-md focus:outline-none"
//             />
//           </div>
//         </div>

//         {/* Footer Info Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
//           {locations.map((location, index) => (
//             <div key={index}>
//               <h4 className="text-xl font-bold mb-4 border-b-2 border-white pb-2">
//                 {location.title}
//               </h4>
//               <ul className="space-y-2 text-sm">
//                 {location.items.map((item, idx) => (
//                   <li key={idx}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Social & Contact */}
//         <div className="mt-8 text-center">
//           <h4 className="text-xl font-bold text-white mb-4">Social Connect</h4>
//           <div className="flex justify-center space-x-4">
//             <a href="#" className="bg-white text-[#ee1d23] w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
//               <span>f</span>
//             </a>
//             <a href="#" className="bg-white text-[#ee1d23] w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
//               <span>in</span>
//             </a>
//             <a href="#" className="bg-white text-[#ee1d23] w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
//               <span>yt</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LocationMap;
