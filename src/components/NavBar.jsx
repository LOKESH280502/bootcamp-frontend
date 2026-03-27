//  import { useContext } from "react";
//  import{mycontext} from "../components/GlobalContext"
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
 

// const NavBar = () => {
 
//   const location = useLocation();
//   const navigate = useNavigate();
//   let{logtoken,setlogtoken}=useContext(mycontext)
//   const handleLogout = () => {
//     setlogtoken(undefined)
//     navigate("/login");
//   };

//   return (
//     <div className="h-20 w-full flex items-center justify-between px-10 text-white bg-black">
//       <h1 className="text-2xl font-bold">CRUD</h1>

//       <div className="flex gap-10">
//         {/* {!isLoggedIn && location.pathname !== "/register" && ( */}
//           <NavLink
//             to="/register"
//             className={({ isActive }) =>
//               isActive ? " font-semibold" : "hover:text-gray-300"
//             }
//           >
//             Register
//           </NavLink>
//         {/* )} */}

//         {logtoken==undefined?(
//             <NavLink
//               to="/login"
//               // className={({ isActive }) =>
//               //   isActive
//               //     ? "text-yellow-400 font-semibold"
//               //     : "hover:text-gray-300"
//               // }
//             >
//               Login
//             </NavLink>
          
//         ) : (
//           <button onClick={handleLogout} className="hover:text-gray-300">
//             Logout
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NavBar;
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mycontext } from "./GlobalContext";

function NavBar() {
  const { auth, setauth, setlogtoken } = useContext(mycontext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 👇 Get user info from localStorage (saved during login)
  const userEmail = localStorage.getItem("userEmail");
  const userName = userEmail ? userEmail.split("@")[0] : "User";

  const logout = () => {
    setauth(null);
    setlogtoken(null);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white relative shadow-md">
      
      {/* LOGO */}
      <h1 className="text-xl font-bold tracking-wide">Bootcamp Portal</h1>

      {/* LOGIN BUTTON */}
      {!auth && (
        <><Link to="/login" className="hover:underline text-gray-300 pl-250">
          Login
        </Link><Link to="/register" className="hover:underline text-gray-300">
            Register
          </Link></>
      )}

      {/* PROFILE MENU */}
      {auth && (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${userName}&background=0D8ABC&color=fff`}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden sm:block">{userName}</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-56 bg-white text-black rounded-xl shadow-lg overflow-hidden z-50">

              {/* USER INFO */}
              <div className="px-4 py-3 border-b bg-gray-50">
                <p className="font-semibold">{userName}</p>
                <p className="text-sm text-gray-500">{userEmail}</p>
              </div>

              {/* MY COURSES */}
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
