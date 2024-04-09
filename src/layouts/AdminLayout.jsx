import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Splash from "../components/Splash";
import NotificationBar from "../components/NotificationBar";
import SearchBar from "../components/SearchBar";
import { MediaAccountsPath } from "../MyMethods/MyMethods";
import Forbidden from "../pages/Forbidden";

function AdminLayout({ children }) {
  const { loading, user, token, handleLogout, isAuthenticated } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user != null && user.deleted) {
      handleLogout({ defaultNavigate: false });
      navigate("/login", {
        replace: true,
        state: {
          message: "Your account has been deleted or temporarily suspended",
        },
      });
      return;
    }
  }, [loading, user, token]);

  if (loading === true) {
    return <Splash />;
  }

  if (!loading && user === null && token === null && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!loading && user != null && user.deleted) {
    handleLogout({ defaultNavigate: false });
    navigate("/login", {
      replace: true,
      state: {
        message: "Your account has been deleted or temporarily suspended",
      },
    });
    return;
  }

  if (!user.premissions.includes("admin")) {
    return <Forbidden />;
  }

  return (
    <div>
      <div className="w-full h-16  flex items-center justify-between p-4 shadow-lg fixed top-0 left-0 right-0 bg-slate-900 border-b border-b-slate-800 z-10">
        <Link to="/admin/">
          <div className="font-bold text-white text-2xl">Blog</div>
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
              <div className="w-11 h-11 rounded-full overflow-hidden border flex items-center justify-center">
                <img
                  loading="lazy"
                  src={user.img_url ? MediaAccountsPath + user.img_url : ""}
                  className="w-full"
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

export default AdminLayout;
