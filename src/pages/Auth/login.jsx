import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GuestLayout from "../../layouts/GuestLayout";

function Login() {
  const { user, handleLogin, loading, errors } = useAuth();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };

  return (
    <GuestLayout>
      <div className="flex w-full h-screen items-center justify-center bg-slate-900">
        <div className="w-96 p-4">
          <form onSubmit={handleSubmit}>
            <p className="pb-4 font-bold text-2xl text-white text-center">
              Login
            </p>
            {location.state?.message && (
              <p className="text-red-500 mb-4">{location.state.message}</p>
            )}
            {!loading && errors != null && (
              <p className="text-red-500 mb-4">{errors}</p>
            )}
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              className="w-full p-3 border rounded-lg mb-1"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full p-3 border rounded-lg mb-1"
            />
            {!loading ? (
              <button className="w-full p-3 border rounded-lg mt-5 text-white ">
                Login
              </button>
            ) : (
              <div className="flex items-center justify-center mt-6">
                <Loading />
              </div>
            )}
          </form>
          <div className="mt-6">
            <Link to={"/register"} className="text-blue-600">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}

export default Login;
