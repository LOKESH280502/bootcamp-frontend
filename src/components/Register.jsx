import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mycontext } from "./GlobalContext";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import BASE_URL from "../config";

function Register() {
  const { setauth } = useContext(mycontext);
  const navigate = useNavigate();

  const [fdata, setfdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    avatar: "",
    publisherCode: ""
  });

  const [codeError, setCodeError] = useState("");

  const { name, email, password, role, avatar, publisherCode } = fdata;

  const handlechange = (e) => {
    const { name, value } = e.target;
    setfdata({ ...fdata, [name]: value });
    if (name === "role") setCodeError(""); // ✅ clear error on role change
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ Validate publisher code on frontend before sending
    if (role === "publisher" && !publisherCode.trim()) {
      setCodeError("❌ Publisher code is required");
      return;
    }

    try {
      // const res = await fetch("http://localhost:8080/auth/register"
      const res = await  fetch(`${BASE_URL}/auth/register`
        , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          avatar,
          publisherCode: role === "publisher" ? publisherCode : null // ✅ only send if publisher
        })
      });

      if (!res.ok) {
        const text = await res.text();
        if (text.includes("Invalid publisher code")) {
          setCodeError("❌ Invalid publisher code");
        } else {
          toast.error("Registration failed: " + text);
        }
        return;
      }

      const result = await res.json();
      setauth(result?.role);
      toast.success("Registered successfully!");
      navigate("/login"); // ✅ navigate AFTER success, not before

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-100 mx-150 text-white p-6 mt-10 rounded-xl shadow-md bg-black absolute">
      <h2 className="text-2xl font-bold mb-4 text-center">REGISTER</h2>
      <form onSubmit={handleRegister} className="space-y-4">

        <input type="text" onChange={handlechange} value={name}
          name="name" placeholder="Enter name" required
          className="w-full p-2 border rounded bg-gray-500" />

        <input type="email" onChange={handlechange} value={email}
          name="email" placeholder="Enter email" required
          className="w-full p-2 border rounded bg-gray-500" />

        <input type="password" onChange={handlechange} value={password}
          name="password" placeholder="Enter password" required
          className="w-full p-2 border rounded bg-gray-500" />

        {/* ✅ Role dropdown — uses handlechange so fdata.role updates */}
        <select name="role" value={role} onChange={handlechange}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600">
          <option value="user">User</option>
          <option value="publisher">Publisher</option>
        </select>

        {/* ✅ Publisher code — only shown when publisher selected */}
        {role === "publisher" && (
          <div>
            <input
              type="password"
              name="publisherCode"           
              placeholder="Enter publisher invite code"
              value={publisherCode}
              onChange={handlechange}        
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 mt-2"
            />
            {codeError && <p className="text-red-400 text-sm mt-1">{codeError}</p>}
          </div>
        )}

        <input type="text" onChange={handlechange} value={avatar}
          name="avatar" placeholder="Enter avatar image URL"
          className="w-full p-2 border rounded bg-gray-500" />

        <input type="submit" value="Register"
          className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gradient-to-r from-black via-gray-700 to-white hover:text-white" />

      </form>
      <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-red-200 cursor-pointer">Login</Link>
      </p>
    </div>
  );
}

export default Register;