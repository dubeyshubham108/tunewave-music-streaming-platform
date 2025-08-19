import { useState } from "react";

const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

  return (
    <div className="flex items-center justify-center h-screen max-h-screen">
      <div className="bg-black text-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Login to tunewave
        </h2>
        <form className="mt-8">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email or username
            </label>
            <input
              type="email"
              placeholder="Email or username"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
