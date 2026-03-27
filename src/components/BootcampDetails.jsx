import React from 'react'
import { useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { mycontext } from './GlobalContext'
import { useEffect } from 'react'
import { useState } from 'react'
import Threads from '../animations/Threads'
import BASE_URL from '../config'


const BootcampDetails = () => {
  let { auth, logtoken } = useContext(mycontext)
  // let loc = useLocation()
  const { id } = useParams()
  let [bootcamp, setBootcamp] = useState(null)


  let [courses, setcourses] = useState()


  const [enrolledCourses, setEnrolledCourses] = useState({});
  useEffect(() => {
    // if (!courses) return;
    if (!logtoken || !courses) return;
    courses.forEach(course => {
      // fetch(`http://localhost:8080/enrollments/check/${course.id}`
        fetch(`${BASE_URL}/enrollments/check/${course.id}`
        , {
        headers: { Authorization: `Bearer ${logtoken}` }
      })
        .then(res => res.json())
        .then(isEnrolled => {
          setEnrolledCourses(prev => ({
            ...prev,
            [course.id]: isEnrolled
          }));
        });
    });

  }, [courses, logtoken]);




  console.log("BOOTCAMP STATE:", bootcamp?.state);
  console.log(bootcamp?.id);

  let fetchBootcamp = async () => {
    // let res = await fetch(`http://localhost:8080/api/v1/bootcamps/${id}`)
     let res = await fetch(`${BASE_URL}/api/v1/bootcamps/${id}`)
    let data = await res.json()
    setBootcamp(data?.data)
  }


  let response = async () => {
    // let res = await fetch(`http://localhost:8080/api/v1/bootcamps/${id}/courses`)
     let res = await fetch(`${BASE_URL}/api/v1/bootcamps/${id}/courses`)
    let dataa = await res.json()
    console.log(dataa);
    setcourses(dataa?.data)
  }


  useEffect(() => {
    if (id) {
      fetchBootcamp()
      response()
    }
  }, [id])
  const enrollCourse = async (courseId, price) => {
    try {
      // const res = await fetch(`http://localhost:8080/payment/create-order/${courseId}`
        const res = await fetch(`${BASE_URL}/payment/create-order/${courseId}`
        , {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${logtoken}`
        }
      });

      const order = await res.json();

      const options = {
        key: "rzp_test_SBf4t4NhPxWXz3",
        amount: order.amount,
        currency: order.currency,
        name: "Bootcamp Course",
        description: "Course Enrollment",
        order_id: order.id,
        handler: async function (response) {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          // await fetch("http://localhost:8080/payment/verify"
            fetch(`${BASE_URL}/payment/verify`
            , {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${logtoken}`
            },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              courseId: courseId
            })
          });

          // 🔥 STEP 3 — UPDATE UI IMMEDIATELY
          setEnrolledCourses(prev => ({
            ...prev,
            [courseId]: true
          }));

          alert("Enrollment Successful 🎉");
        },
        theme: { color: "#6366f1" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };


  const handleDelete = async (courseId) => {


    try {
      const res = await fetch(`${BASE_URL}/api/v1/bootcamps/${id}/courses/${courseId}`
        
        , {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${logtoken}`, // if your backend requires auth
        },
      });

      if (res.ok) {

        // Option 1: refresh course list from backend
        //   fetchBootcampDetails();
        // Option 2: remove it from UI directly
        setcourses(prev => prev.filter(courses => courses.id !== courseId));
      } else {
        alert("Failed to delete course");
      }
    } catch (err) {
      console.error(err);
    }
  };




  return (


    <>
      <section className='min-h-screen bg-slate-100 py-10'>

        <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-4'>

          <h1 className='text-3xl font-bold text-slate-800'>
            {bootcamp?.name}
          </h1>

          <img
            className='rounded-xl h-65 w-100 object-cover'
            src={bootcamp?.photo}
          />

          <div className='w-full text-center space-y-2 text-slate-700'>
            <p><span className='font-semibold'>Website:</span> {bootcamp?.website}</p>
            <p><span className='font-semibold'>Email:</span> {bootcamp?.email}</p>
            <p><span className='font-semibold'>Description:</span> {bootcamp?.description}</p>
            <p><span className='font-semibold'>Job Assistance:</span> {bootcamp?.jobAssistance ? "Yes" : "No"}</p>
            <p><span className='font-semibold'>Job Guarantee:</span> {bootcamp?.jobGuarantee ? "Yes" : "No"}</p>
            <p><span className='font-semibold'>Housing:</span> {bootcamp?.housing ? "Yes" : "No"}</p>
          </div>

          {auth == "publisher" &&
            <div className='flex gap-4 mt-4'>
              <Link className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition' to="/dashboard/createcourse">
                Create Course
              </Link>

              <Link className='px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition'
                to={`/dashboard/updatebootcamp/${bootcamp?.id}`}>
                Update Bootcamp
              </Link>
            </div>
          }
        </div>

        {/* COURSES SECTION */}
        <h1 className='text-2xl font-bold text-center mt-14 mb-8 text-slate-800'>
          Available Courses
        </h1>

        <div className='max-w-7xl mx-auto px-6 flex flex-wrap gap-8 justify-center'>
          {courses?.map((ele) => {
            let { title, description, duration, price, minimumSkill, scholarshipAvailable, image } = ele

            return (
              <div className='w-80 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition p-4 flex flex-col gap-3'>

                <img className='h-40 w-full rounded-lg object-cover' src={image} alt={title} />

                <h2 className='font-semibold text-lg text-slate-800'>{title}</h2>

                <p className='text-sm text-slate-600'>{description}</p>

                <p className='text-sm'><span className='font-semibold'>Duration:</span> {duration}</p>
                <p className='text-sm'><span className='font-semibold'>Price:</span> ₹{price}</p>
                <p className='text-sm'><span className='font-semibold'>Skill:</span> {minimumSkill}</p>
                <p className='text-sm'><span className='font-semibold'>Scholarship:</span> {scholarshipAvailable ? "Yes" : "No"}</p>

                {/* {auth == "user" &&
            <button onClick={() => enrollCourse(ele.id, ele.price)} className='mt-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition'>
              Enroll Now
            </button>
          } */}
                {auth === "user" && (
                  enrolledCourses[ele.id] ? (
                    <button
                      disabled
                      className="mt-2 bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
                    >
                      Already Enrolled
                    </button>
                  ) : (
                    <button
                      onClick={() => enrollCourse(ele.id)}
                      className="mt-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      Enroll Now
                    </button>
                  )
                )}



                {auth == "publisher" &&
                  <>
                    <Link
                      to={`/dashboard/updatecourse/${ele.id}`}
                      state={ele}
                      className='bg-orange-600 text-white py-2 rounded-lg text-center hover:bg-orange-700 transition'
                    >
                      Update Course
                    </Link>

                    <button
                      onClick={() => handleDelete(ele.id)}
                      className='bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition'
                    >
                      Delete
                    </button>
                  </>
                }

              </div>
            )
          })}
        </div>
        <div className='flex justify-center mt-10'>
        <button className='bg-indigo-500 text-white px-4 py-2 flex justify-content items-center  rounded hover:bg-indigo-600' onClick={() => window.history.back()}>
          back
        </button>
      </div>
      </section>

    </>
  )
}

export default BootcampDetails
