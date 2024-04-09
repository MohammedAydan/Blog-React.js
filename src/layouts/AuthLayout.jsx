import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Splash from "../components/Splash";
import NotificationBar from "../components/NotificationBar";
import SearchBar from "../components/SearchBar";

function AuthLayout({ children }) {
  const { loading, user, token, handleLogout, isAuthenticated } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  if (loading === true) {
    return <Splash />;
  }

  if (
    !loading &&
    user === null &&
    token === null &&
    isAuthenticated === false
  ) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="w-full h-16  flex items-center justify-between p-4 shadow-lg fixed top-0 left-0 right-0 bg-slate-900 border-b border-b-slate-800 z-10">
        <Link to="/">
          <div className="flex items-center">
            <img src="./public/logo-1.png" alt="" className="w-12 h-12"/>
            <div className="font-bold text-white text-2xl ml-3">Blog</div>
          </div>
        </Link>
        {/* // search bar and result */}
        <SearchBar />
        <div className="flex">
          <NotificationBar />

          <div className="menu flex items-center justify-center">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="text-white"
            >
              <div className="w-11 h-11 rounded-full overflow-hidden border">
                <img
                  loading="lazy"
                  src="http://picsum.photos/200"
                  width="100%"
                  alt=""
                />
              </div>
            </button>
            {openMenu && (
              <div className="absolute top-16 right-4 bg-slate-800 p-2 rounded-lg shadow-lg">
                <ul>
                  <Link to={`/profile`} onClick={() => setOpenMenu(!openMenu)}>
                    <li className="text-white px-6 rounded-lg cursor-pointer py-2 hover:bg-slate-700">
                      Profile
                    </li>
                  </Link>
                  <Link to="/settings" onClick={() => setOpenMenu(!openMenu)}>
                    <li className="text-white px-6 rounded-lg cursor-pointer py-2 hover:bg-slate-700">
                      Settings
                    </li>
                  </Link>
                  <Link
                    onClick={() => {
                      handleLogout({ defaultNavigate: true });
                      setOpenMenu(!openMenu);
                    }}
                  >
                    <li className="text-red-700 px-6 rounded-lg cursor-pointer py-2 hover:bg-slate-700">
                      Logout
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="body pt-16">{children}</div>
    </div>
  );
}

export default AuthLayout;
