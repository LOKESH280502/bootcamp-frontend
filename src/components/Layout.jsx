 
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Layout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-200 text-slate-800">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Page Content */}
        <main className="flex-1 p-3 md:p-6 overflow-y-auto">
          <div className="max-w-7xl h-full mx-auto bg-white rounded-2xl shadow-md border border-slate-200 p-4 md:p-6">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

export default Layout;