//  import { useAuth } from "./AuthContext";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import { mycontext } from "./GlobalContext";
import BASE_URL from "../config";
function Login() {

  //   const { login } = useAuth();
  let { logtoken, setlogtoken, setauth, setUser } = useContext(mycontext)
  const navigate = useNavigate();
  let [fdata, setfdata] = useState({ email: "", password: "" })
  let { email, password } = fdata

  let handlechange = (e) => {
    let { name, value } = e.target
    setfdata({ ...fdata, [name]: value })
  }


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // const res = await fetch("http://localhost:8080/auth/login"
     const res = await fetch(`${BASE_URL}/auth/login`
      , {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fdata),
    });

    // 🔥 If backend says login failed
    if (!res.ok) {
      throw new Error("Invalid email or password");
    }

    const result = await res.json();

    console.log(result);

    // ✅ Save token & role
    setlogtoken(result.token);
    setauth(result.role);
setUser({                     // ✅ store user details
    name: result.name,
    email: result.email,
    avatar: result.avatar,
    role: result.role
  });
    localStorage.setItem("token", result.token);
    localStorage.setItem("role", result.role);

    toast.success("Login successful 🎉");

    // ✅ Navigate properly
    navigate("/dashboard");

  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};


  return (
    <div className=" w-100 mx-150 mt-20 bg-black text-white p-6 rounded-xl shadow-md mt-6 absolute ">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" onChange={handlechange} name="email" value={email} placeholder="Enter email" className="w-full p-2 border rounded bg-gray-800" />
        <input type="password" onChange={handlechange} name="password" value={password} placeholder="Enter password" className="w-full p-2 border rounded bg-gray-800" />
        <input type="submit" value="login" className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gradient-to-r from-black via-gray-700 to-white hover:text-white" />


      </form>
      <p className="text-center mt-4">
        Don’t have an account? <Link to="/register" className="text-red-400 cursor-pointer">Register</Link>
      </p>
    </div>
  );
}

export default Login;
