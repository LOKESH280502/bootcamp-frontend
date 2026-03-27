// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { mycontext } from "./GlobalContext";

// const Sidebar = () => {
//   const { auth } = useContext(mycontext);

//   return (
//     <div className="w-50 min-h-screen text-white p-6 flex flex-col gap-6">

//       {/* Public */}
//       <Link
//         to="/dashboard"
//         className="p-3 rounded hover:bg-gray-800"
//       >
//         All Bootcamps
//       </Link>

//       {/* Publisher Only */}
//       {auth === "publisher" && (
//         <>
//           <Link
//             to="/dashboard/createBootcamp"
//             className="p-3 rounded hover:bg-gray-800"
//           >
//             Create Bootcamp
//           </Link>

//           <Link
//             to="/dashboard/updatebootcamp/:id"
//             className="p-3 rounded hover:bg-gray-800"
//           >
//             Update Bootcamp
//           </Link>

//           <Link
//             to="/dashboard/create-course"
//             className="p-3 rounded hover:bg-gray-800"
//           >
//             Create Course
//           </Link>

//           <Link
//             to="/dashboard/update-course"
//             className="p-3 rounded hover:bg-gray-800"
//           >
//             Update Course
//           </Link>
//         </>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { mycontext } from './GlobalContext'

const Sidebar = () => {
  let { auth } = useContext(mycontext)
  return (
    <>
      <div className="w-50 min-h-screen bg-slate-900 text-slate-200 p-6 flex flex-col">

        <Link className='p-3 rounded-lg hover:bg-slate-800 hover:text-white transition' to="">
          All bootcamps
        </Link>

        <br /><br />

        {auth == "publisher" ?
          <Link className='p-3 rounded-lg hover:bg-slate-800 hover:text-white transition' to="/dashboard/createBootcamp">
            Create bootcamps
          </Link> : ""
        }

        <br /><br />

        {auth == "publisher" ?
          <Link className='p-3 rounded-lg hover:bg-slate-800 hover:text-white transition' to="/dashboard/updatebootcamp/:id">
            Update Bootcamps
          </Link> : ""
        }

        <br /><br />

        {auth == "publisher" ?
          <Link className='p-3 rounded-lg hover:bg-slate-800 hover:text-white transition' to="/dashboard/createcourse">
            Create Courses
          </Link> : ""
        }

        <br /><br />

        {auth == "publisher" ?
          <Link className='p-3 rounded-lg hover:bg-slate-800 hover:text-white transition' to="/dashboard/updatecourse/:id">
            Update Course
          </Link> : ""
        }

      </div>
    </>
  )
}

export default Sidebar
