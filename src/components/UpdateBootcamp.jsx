 import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { mycontext } from "./GlobalContext";
import { toast } from "react-toastify";
import BASE_URL from "../config";

const UpdateBootcamp = () => {
  const { logtoken } = useContext(mycontext);
  const loc = useLocation();
  const nav = useNavigate();
  const { id } = useParams(); // 👈 get id from route

  // Pre-fill form with bootcamp details from location state
  const [formData, setFormData] = useState({
    name: loc?.state?.name || "",
    email: loc?.state?.email || "",
    description: loc?.state?.description || "",
    website: loc?.state?.website || "",
    address: loc?.state?.address || "",
 careers: Array.isArray(loc?.state?.careers)
  ? loc.state.careers
  : loc?.state?.careers
  ? loc.state.careers.split(",").map(c => c.trim())
  : [],

    photo: loc?.state?.photo || "",
    housing: loc?.state?.housing || false,
    jobAssistance: loc?.state?.jobAssistance || false,
    jobGuarantee: loc?.state?.jobGuarantee || false,
    acceptGi: loc?.state?.acceptGi || false,
  });

  // 👇 fetch latest data if loc.state is missing (page refresh case)
  useEffect(() => {
    const fetchBootcamp = async () => {
      if (!loc.state) {
        try {
          // const res = await fetch(`http://localhost:8080/api/v1/bootcamps/${id}`);
          const res = await fetch(`${BASE_URL}/api/v1/bootcamps/${id}`);
          const data = await res.json();
          if (data.success) {
             setFormData({
  name: data.data.name,
  email: data.data.email,
  description: data.data.description,
  website: data.data.website,
  address: data.data.address,
   careers: Array.isArray(data.data.careers)
  ? data.data.careers
  : data.data.careers
  ? data.data.careers.split(",").map(c => c.trim())
  : [],

  photo: data.data.photo,
  housing: data.data.housing,
  jobAssistance: data.data.jobAssistance,
  jobGuarantee: data.data.jobGuarantee,
  acceptGi: data.data.acceptGi,
});

          }
        } catch (err) {
          console.error("Fetch bootcamp failed:", err);
        }
      }
    };
    fetchBootcamp();
  }, [id, loc.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "careers") {
      setFormData({
        ...formData,
        careers: [...new Set([...formData.careers, value])], // avoid duplicates
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };
// console.log(logtoken);

    const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
  ...formData,
  careers: Array.isArray(formData.careers)
    ? formData.careers
    : [],
};


  try {
    const res = await fetch(
      // `http://localhost:8080/api/v1/bootcamps/${id}`,
      `${BASE_URL}/api/v1/bootcamps/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${logtoken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      toast.error("You are not authorized to update this bootcamp");
      return;
    }

    const data = await res.json();
    toast.success("Bootcamp updated successfully ✅");
    nav(`/dashboard/bootcampdetails/${id}`);

  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};



  return (
    <div className="max-w-md mx-auto p-6 rounded-xl text-white shadow-md mt-6 bg-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Update BootCamp</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border text-white bg-gray-800 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-800"
        />
        <textarea
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-800"
        ></textarea>
        <input
          type="url"
          placeholder="Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-800"
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-800"
        />

        <select
          name="careers"
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-800"
        >
          <option value="">Select Career</option>
          <option value="web development">Web Development</option>
          <option value="react development">React Development</option>
          <option value="fullstack development">Fullstack Development</option>
          <option value="java development">Java Development</option>
          <option value="python development">Python Development</option>
          <option value="android development">Android Development</option>
          <option value="ux/ui development">UX/UI Development</option>
          <option value="business">Business</option>
          <option value="others">Others</option>
        </select>

        <input
          type="url"
          placeholder="Image URL"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-800"
        />

        {/* Boolean fields */}
        {["housing", "jobAssistance", "jobGuarantee", "acceptGi"].map((field) => (
          <label key={field} className="flex items-center">
            <input
              type="checkbox"
              name={field}
              checked={formData[field]}
              onChange={handleChange}
            />
            <span className="ml-2 capitalize">{field}</span>
          </label>
        ))}

        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gradient-to-r from-black via-gray-700 to-white hover:text-white"
        >
          Update BootCamp
        </button>
      </form>
    </div>
  );
};

export default UpdateBootcamp;
