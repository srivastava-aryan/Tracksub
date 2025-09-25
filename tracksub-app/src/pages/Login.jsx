import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      toast.success("Login successful!", {
        description: "Welcome back! Redirecting to dashboard..."
      });
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login failed", {
        description: err.message
      });
      setError(err.message);
    }
  };

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
  //     <div className="bg-white rounded-3xl shadow-md flex w-full max-w-4xl overflow-hidden">
  //       {/* Form Section */}
  //       <div className="w-full md:w-1/2">
  //         <form
  //           onSubmit={handleLogin}
  //           className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full"
  //         >
  //           <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
  //             Welcome Back
  //           </h2>
  //           <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
  //             Log in to manage your subscriptions
  //           </p>
  //           {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
  //           <input
  //             type="email"
  //             placeholder="Email"
  //             className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             required
  //           />
  //           <input
  //             type="password"
  //             placeholder="Password"
  //             className="w-full mb-6 p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             required
  //           />
  //           <button
  //             type="submit"
  //             className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
  //           >
  //             Log In
  //           </button>
  //         </form>
  //       </div>
  //       <div className="hidden md:flex md:w-1/2 justify-center items-center">
  //         <img
  //           src="/login.jpg"
  //           alt="Login illustration"
  //           className="w-full max-w-md dark:opacity-90 transition-opacity"
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className=" p-7 overflow-hidden flex items-center justify-center dark:bg-gray-900">
      <div className="bg-white rounded-3xl shadow-md flex w-full max-w-4xl m-4 overflow-hidden">
        {/* Left: Login Form */}
        <div className="flex-1 p-10 flex flex-col justify-center dark:bg-gray-800">
          <div className="mb-8">
            <div className="font-bold text-xs text-violet-600 mb-2">TrackSub.</div>
            <h2 className="text-3xl font-bold mb-2 text-black">Hey, <br />Welcome Back</h2>
            <p className="text-black">Log in to manage your subscriptions</p>
            {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-800"
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
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-800"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                // autoComplete="current-password"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2 accent-violet-600" />
                Remember me
              </label>
              {/* <a href="#" className="text-sm text-gray-500 hover:underline">
                Forgot Password?
              </a> */}
            </div>
            <button
              type="submit"
              className="bg-violet-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-violet-700 transition"
            >
              Log In
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
            loading="lazy"
            className="w-full h-full object-cover dark:opacity-90 transition-opacity" 
          />
        </div>
      </div>
    </div>
  );
}







// return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white rounded-3xl shadow-md flex w-full max-w-4xl overflow-hidden">
//         {/* Left: Login Form */}
//         <div className="flex-1 p-10 flex flex-col justify-center">
//           <div className="mb-8">
//             <div className="font-bold text-xs text-violet-600 mb-2">Fingpr</div>
//             <h2 className="text-3xl font-bold mb-2">Holla, <br />Welcome Back</h2>
//             <p className="text-gray-600">Hey, welcome back to your special place</p>
//           </div>
//           <form>
//             <div className="mb-4">
//               <input
//                 className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400"
//                 type="email"
//                 placeholder="example@gmail.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 autoComplete="username"
//               />
//             </div>
//             <div className="mb-4">
//               <input
//                 className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400"
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 // autoComplete="current-password"
//               />
//             </div>
//             <div className="flex items-center justify-between mb-6">
//               <label className="flex items-center text-sm">
//                 <input type="checkbox" className="mr-2 accent-violet-600" />
//                 Remember me
//               </label>
//               {/* <a href="#" className="text-sm text-gray-500 hover:underline">
//                 Forgot Password?
//               </a> */}
//             </div>
//             <button
//               type="submit"
//               className="bg-violet-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-violet-700 transition"
//             >
//               Sign In
//             </button>
//           </form>
//           {/* <p className="mt-6 text-sm text-gray-600 text-center">
//             Don’t have an account? <a href="#" className="text-violet-600 font-semibold hover:underline">Sign Up</a>
//           </p> */}
//         </div>
//         {/* Right: Illustration */}
//         <div className="flex-1 bg-gradient-to-tr from-violet-500 to-purple-400 flex items-center justify-center">
//           <img src="/login.jpg" alt="Login illustration" className="w-full max-w-md dark:opacity-90 transition-opacity" />
//         </div>
//       </div>
//     </div>
//   );