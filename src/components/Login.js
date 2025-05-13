import React, { useState } from "react";
import axios from "axios";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../contexts/authContext";


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {login} =useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const { token, user } = res.data;
  
      login(user, token); // ✅ This updates the AuthContext
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      if (err.response?.status === 404) {
        setError("User not found. Please sign up first.");
      } else {
        setError(err.response?.data?.message || "Login failed");
      }
    }
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-box">
        <h2 className="login-heading">Login to Your Account</h2>

        {error && (
          <div className="login-error">
            {error}{" "}
            {error.includes("sign up") && (
              <Link to="/signup" className="text-blue-600 underline ml-1">
                Sign up here
              </Link>
            )}
          </div>
        )}

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="login-input"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Log In
        </button>

        <p className="login-footer">
          Don’t have an account?
          <Link to="/Signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
// pages/Login.js (for regular users)

// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../contexts/authContext";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       const token = res.data.token;
//       const userData = res.data.user;
//       console.log(token);
//       login(userData, token);
//       alert("Login successful!");
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-box">
//         <h2 className="login-heading">Login to Your Account</h2>

//         {error && (
//           <div className="login-error">
//             {error}{" "}
//             {error.includes("sign up") && (
//               <Link to="/signup" className="text-blue-600 underline ml-1">
//                 Sign up here
//               </Link>
//             )}
//           </div>
//         )}

//         <input
//           name="email"
//           placeholder="Email"
//           type="email"
//           value={form.email}
//           onChange={handleChange}
//           className="login-input"
//           required
//         />
//         <input
//           name="password"
//           placeholder="Password"
//           type="password"
//           value={form.password}
//           onChange={handleChange}
//           className="login-input"
//           required
//         />
//         <button type="submit" className="login-button">
//           Log In
//         </button>

//         <p className="login-footer">
//           Don’t have an account?
//           <Link to="/Signup">Sign up</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
