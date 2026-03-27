 
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mycontext } from "./GlobalContext";

function NavBar() {
  const { auth, setauth, setlogtoken } = useContext(mycontext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");
  const userName = userEmail ? userEmail.split("@")[0] : "User";

  const logout = () => {
    setauth(null);
    setlogtoken(null);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-4 md:px-8 py-4 bg-black border-b border-gray-600 text-white relative shadow-md">

      {/* LOGO */}
      <h1 className="text-lg md:text-xl font-bold tracking-wide">
        Bootcamp Portal
      </h1>

      {/* LOGIN / REGISTER */}
      {!auth && (
        <div className="flex gap-4 md:gap-6 items-center">
          <Link to="/login" className="hover:underline text-gray-300">
            Login
          </Link>

          <Link to="/register" className="hover:underline text-gray-300">
            Register
          </Link>
        </div>
      )}

      {/* PROFILE MENU */}
      {auth && (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-gray-800 px-3 md:px-4 py-2 rounded-full hover:bg-gray-700 transition"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${userName}&background=0D8ABC&color=fff`}
              alt="avatar"
              className="w-7 h-7 md:w-8 md:h-8 rounded-full"
            />
            <span className="hidden sm:block">{userName}</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-48 md:w-56 bg-white text-black rounded-xl shadow-lg overflow-hidden z-50">

              {/* USER INFO */}
              <div className="px-4 py-3 border-b bg-gray-50">
                <p className="font-semibold">{userName}</p>
                <p className="text-sm text-gray-500 break-words">{userEmail}</p>
              </div>

              {/* USER LINK */}
              {auth === "user" && (
                <Link
                  to="/dashboard/mycourses"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 hover:bg-gray-100 transition"
                >
                  🎓 My profile
                </Link>
              )}

              {/* LOGOUT */}
              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-600 font-medium transition"
              >
                🚪 Logout
              </button>

            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;