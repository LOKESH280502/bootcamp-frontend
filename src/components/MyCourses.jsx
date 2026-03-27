import { useEffect, useState, useContext } from "react";
import { mycontext } from "./GlobalContext";
import BASE_URL from "../config";

function MyCourses() {
  const { logtoken } = useContext(mycontext);
  const [courses, setCourses] = useState([]);
  const { user, setUser } = useContext(mycontext);
  //  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!logtoken) return;

    // fetch("http://localhost:8080/auth/me"
    fetch(`${BASE_URL}/auth/me`
      , {
        headers: { Authorization: `Bearer ${logtoken}` }
      })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, [logtoken]);
  useEffect(() => {

    if (!logtoken) return; // ⛔ stop if token missing


    // fetch("http://localhost:8080/enrollments/my-courses"
    fetch(`${BASE_URL}/enrollments/my-courses`
      , {
        headers: {
          Authorization: `Bearer ${logtoken}`,
        },
      })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          setCourses([]);
        }
      })
      .catch(() => setCourses([]));
  }, [logtoken]);

  return (
    <div className="p-10 min-h-screen bg-slate-100">
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6 mb-8">
        <img
          src={user?.avatar || "https://i.pravatar.cc/100"}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full mt-1 inline-block capitalize">
            {user?.role}
          </span>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-6">🎓 My Enrolled Courses</h1>

      {courses.length === 0 ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        courses.map(course => (
          <div key={course.id} className="p-4 bg-white shadow mb-3 rounded">
            <h2 className="font-semibold">{course.title}</h2>
            <p>Duration: {course.duration}</p>
            <p>Price: ₹{course.price}</p>
          </div>
        ))
      )}
      <button className="bg-indigo-500 text-white  px-4 py-2 rounded hover:bg-indigo-600" onClick={() => window.history.back()}>
        back
      </button>
    </div>

  );
}

export default MyCourses;
