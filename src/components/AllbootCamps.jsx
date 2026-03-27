import React, { useEffect, useState, useContext } from 'react'
import { mycontext } from './GlobalContext'
import{Link} from "react-router-dom"
import Loader from './Loader'
import BASE_URL from '../config'
const AllbootCamps = () => {
  const [camps, setcamps] = useState([])
  const { auth, logtoken } = useContext(mycontext)


  // fetch all bootcamps
   const responce = async () => {
  try {
    let res = await fetch(`${BASE_URL}/api/v1/bootcamps`);


    if (!res.ok) {
      console.error("Failed:", res.status);
      return;
    }

    let dataa = await res.json();
    setcamps(dataa.data);

  } catch (err) {
    console.error("Fetch error:", err);
  }
};


  useEffect(() => {
    responce()
  }, [])

  // delete bootcamp by id
  const handlesubmit = async (id) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this bootcamp?");
  // if (!confirmDelete) return;
    try {
      let res = await fetch(`${BASE_URL}/api/v1/bootcamps/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${logtoken}`
        },
      })

      let daa = await res.json()
      console.log("Deleted:", daa)

      // update UI after delete
      setcamps((prev) => prev.filter((camp) => camp.id !== id))
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

  return (
    // <>
    //   <h1 className='pl-140 pt-10 font-bold text-white'>ALL BOOTCAMPS</h1>
    //   <section className='w-300 p-15 pl-30   min-h-screen pb-20  rounded flex flex-wrap gap-18 items-center justify-center '>
    //    { camps?
    //     camps.map((ele) => {
    //       let { id, name, photo,housing,jobAssistance,jobGuarantee, website,email,description } = ele
    //       return (
    //         <div key={id} className='h-80 w-80 bg-gray-400 border- rounded flex flex-col gap-4 items-center justify-center'>
    //           <h3 className='font-bold text-black rounded p-3'>{name}</h3>
    //           <img className='rounded  text-black h-40 w-50' src={photo} alt={name} />
    //           <Link to="/dashboard/bootcampdetails" state={ele} className='border-2 rounded bg-gray-800 text-white p-2'>
    //             Learn More
    //           </Link>
    //           {auth === "publisher" && (
    //             <div> 
    //             <button
    //               onClick={() => handlesubmit(id)}
    //               className='border-2 rounded bg-red-600 text-white p-1'
    //             >
    //               Delete
    //             </button>
    //             {/* <Link
    //               to="/dashboard/updatebootcamp"
    //               className='border-2 rounded bg-yellow-600 text-white p-1'
    //             >
    //               edit
    //             </Link> */}
    //             </div>
    //           )}
    //         </div>
    //       )
    //     }): <Loader/> 

    //   }
    //   </section>
    // </>
    <><h1 className='text-3xl font-bold text-slate-800 text-center mt-10 mb-8'>
  All Bootcamps
</h1>

<section className='max-w-7xl mx-auto px-6 pb-20 min-h-screen flex flex-wrap gap-10 justify-center'>
  {camps ?
    camps.map((ele) => {
      let { id, name, photo } = ele
      return (
        <div key={id} className='w-80 h-100 bg-white border-4 border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col overflow-hidden'>

          <img className='h-50 w-full object-cover' src={photo} alt={name} />

          <div className='p-4 flex flex-col gap-3 flex-grow'>
            <h3 className='font-semibold text-center text-slate-800 text-lg'>{name}</h3>

            <Link
              to={`/dashboard/bootcampdetails/${id}`}
               
              className='mt-auto text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition'
            >
              Learn More
            </Link>

            {auth === "publisher" && (
              <button
                onClick={() => handlesubmit(id)}
                className='bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg text-sm transition'
              >
                Delete
              </button>
            )}
          </div>

        </div>
      )
    }) : <Loader />
  }
</section>
</>
  )
}

export default AllbootCamps
