import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Fname, setFname] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(email, password, userName);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className=" p-7 overflow-hidden flex items-center justify-center dark:bg-gray-900">
      <div className="bg-white rounded-3xl shadow-md flex w-full max-w-4xl m-4 overflow-hidden">
        {/* Left: Login Form */}
        <div className="flex-1 p-10 flex flex-col justify-center dark:bg-gray-800">
          <div className="mb-8">
            <div className="font-bold text-xs text-violet-600 mb-2">
              TrackSub.
            </div>
            <h2 className="text-3xl font-bold mb-2 text-black">
              Hey, <br />
              Welcome Back
            </h2>
            <p className="text-black">
              Log in to manage your subscriptions
            </p>
            {error && (
              <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
            )}
          </div>
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400 text-black"
                value={Fname}
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400 text-black"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400 text-black"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                // autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className="bg-violet-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-violet-700 transition"
            >
              Sign Up
            </button>
          </form>
          {/* <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account? <a href="#" className="text-violet-600 font-semibold hover:underline">Sign Up</a>
          </p> */}
        </div>
        {/* Right: Illustration */}
        <div className="hidden md:flex flex-1 bg-gradient-to-tr from-violet-500 to-purple-400">
          <img
            src="/login.jpg"
            alt="Login illustration"
            className="w-full h-full object-cover dark:opacity-90 transition-opacity"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSignup}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Sign Up
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          value={Fname}
          onChange={(e) => setFname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
