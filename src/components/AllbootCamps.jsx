
import React, { useEffect, useState, useContext } from 'react'
import { mycontext } from './GlobalContext'
import { Link } from "react-router-dom"
import Loader from './Loader'
import BASE_URL from '../config'

const AllbootCamps = () => {
  const [camps, setcamps] = useState([])
  const { auth, logtoken } = useContext(mycontext)

  // fetch all bootcamps
  const responce = async () => {
    try {
      let res = await fetch(`${BASE_URL}/api/v1/bootcamps`)

      if (!res.ok) {
        console.error("Failed:", res.status)
        return
      }

      let dataa = await res.json()
      setcamps(dataa.data)

    } catch (err) {
      console.error("Fetch error:", err)
    }
  }

  useEffect(() => {
    responce()
  }, [])

  // delete bootcamp by id
  const handlesubmit = async (id) => {
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

      setcamps((prev) => prev.filter((camp) => camp.id !== id))
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

  return (
    <>
      <h1 className='text-2xl md:text-3xl font-bold text-slate-800 text-center mt-8 md:mt-10 mb-6 md:mb-8'>
        All Bootcamps
      </h1>

      <section className='max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20 min-h-screen flex flex-wrap gap-6 md:gap-10 justify-center'>
        {camps ?
          camps.map((ele) => {
            let { id, name, photo } = ele
            return (
              <div
                key={id}
                className='w-full sm:w-[45%] lg:w-[22%] bg-white border-4 border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col overflow-hidden'
              >

                <img
                  className='h-40 md:h-48 lg:h-50 w-full object-cover'
                  src={photo}
                  alt={name}
                />

                <div className='p-3 md:p-4 flex flex-col gap-3 flex-grow'>
                  <h3 className='font-semibold text-center text-slate-800 text-base md:text-lg'>
                    {name}
                  </h3>

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