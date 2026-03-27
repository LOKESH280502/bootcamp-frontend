 import React, { useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { mycontext } from "./GlobalContext";
import { toast } from "react-toastify";
import BASE_URL from "../config";

const UpdateCourse = () => {
  const { logtoken } = useContext(mycontext);
  const { id } = useParams();            // course id from URL
  const loc = useLocation();             // existing course details
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    title: loc?.state?.title || "",
    description: loc?.state?.description || "",
    duration: loc?.state?.duration || "",
    price: loc?.state?.price || "",
    minimumSkill: loc?.state?.minimumSkill || "Beginner",
    scholarshipAvailable: loc?.state?.scholarshipAvailable || false,
    image: loc?.state?.image || ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // let res = await fetch(`http://localhost:8080/api/v1/bootcamps/{bootcampId}/courses/${id}`, {
      let res = await fetch(`${BASE_URL}/api/v1/bootcamps/{bootcampId}/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${logtoken}`,
        },
        body: JSON.stringify(formData),
      });

      let data = await res.json();
      if (data.success) {
        toast.success("Course updated successfully ✅");
        nav(-1); // go back to BootcampDetails
      } else {
        toast.error(data.error || "Update failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl shadow-md mt-6 text-white bg-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Course</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full p-2 border rounded bg-gray-800"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded bg-gray-800"
        ></textarea>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration"
          className="w-full p-2 border rounded bg-gray-800"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded bg-gray-800"
        />
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded bg-gray-800"
        />
        <select
          name="minimumSkill"
          value={formData.minimumSkill}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-800"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="scholarshipAvailable"
            checked={formData.scholarshipAvailable}
            onChange={handleChange}
          />
          <span>Scholarship Available</span>
        </label>

        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gradient-to-r from-black via-gray-700 to-white hover:text-white"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
