 
import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { mycontext } from './GlobalContext'

const Sidebar = () => {
  let { auth } = useContext(mycontext)

  return (
    <>
      <div className="w-full md:w-52 min-h-auto md:min-h-screen bg-slate-900 text-slate-200 p-4 md:p-6 flex flex-row md:flex-col gap-4 md:gap-6 overflow-x-auto md:overflow-visible">

        <Link className='p-2 md:p-3 rounded-lg hover:bg-slate-800 hover:text-white transition whitespace-nowrap' to="">
          All bootcamps
        </Link>

        {auth == "publisher" &&
          <Link className='p-2 md:p-3 rounded-lg hover:bg-slate-800 hover:text-white transition whitespace-nowrap' to="/dashboard/createBootcamp">
            Create bootcamps
          </Link>
        }

        {auth == "publisher" &&
          <Link className='p-2 md:p-3 rounded-lg hover:bg-slate-800 hover:text-white transition whitespace-nowrap' to="/dashboard/updatebootcamp/:id">
            Update Bootcamps
          </Link>
        }

        {auth == "publisher" &&
          <Link className='p-2 md:p-3 rounded-lg hover:bg-slate-800 hover:text-white transition whitespace-nowrap' to="/dashboard/createcourse">
            Create Courses
          </Link>
        }

        {auth == "publisher" &&
          <Link className='p-2 md:p-3 rounded-lg hover:bg-slate-800 hover:text-white transition whitespace-nowrap' to="/dashboard/updatecourse/:id">
            Update Course
          </Link>
        }

      </div>
    </>
  )
}

export default Sidebar