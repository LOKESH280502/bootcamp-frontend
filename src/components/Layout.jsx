//  import { Outlet } from "react-router-dom";
// // import Sidebar from "./Sidebar";
// import Sidebar from "../components/Sidebar"
// import Particles from "../animations/Particles";

// function Layout() {
//   return (
//     <div className="flex min-h-screen relative">
//       {/* Sidebar */}
//       <Sidebar/>

//       {/* Main content */}
//       <div className="flex-1 relative  min-h-screen overflow-hidden bg-black">
//         {/* Particles background */}
//         <div className="absolute inset-0 z-0">
//           {/* <Particles
//             backgroundColor="#000000"
//             particleColors={["#ffffff", "#e1e8e6ff", "#e9e2e4ff"]}
//             particleCount={950}
//             particleSpread={15}
//             speed={0.2}
//             particleBaseSize={120}
//             moveParticlesOnHover={true}
//             alphaParticles={false}
//             disableRotation={false}
//           /> */}
//         </div>

//         {/* Routed content on top */}
//         <div className="relative z-10 p-4 text-white">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Layout;

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Layout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-200 text-slate-800">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Header */}
        {/* <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 text-center shadow-sm flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold tracking-wide text-center text-slate-700 pl-130 ">
            Bootcamp Portal
          </h1>
        </header> */}

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl h-full mx-auto bg-white rounded-2xl shadow-md border border-slate-200 p-6">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

export default Layout;
