import { Route, Routes } from "react-router-dom";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import HomeScreen from "./pages/HomeScreen";
import NotFound from "./pages/NotFound";
import ProfileScreen from "./pages/ProfileScreen";
import Show from "./pages/Show";
import UserProfileScreen from "./pages/UserProfileScreen";
import SettingsScreen from "./pages/SettingsScreen";
import RequestsAccountsConfirmation from "./pages/Admin/RequestsAccountsConfirmation";
import Dashboard from "./pages/Admin/Dashboard";
import AddRole from "./pages/Admin/Roles/AddRole";
import ShowRoles from "./pages/Admin/Roles/ShowRoles";
import ShowUsers from "./pages/Admin/Roles/ShowUsers";
import ShowPosts from "./pages/Admin/ShowPosts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route index element={<HomeScreen />} />
          <Route path="posts/:id" element={<Show />} />
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="profile/:id" element={<UserProfileScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
        </Route>

        <Route path="/admin/">
          <Route index element={<Dashboard />} />
          <Route path="roles/addRole" element={<AddRole />} />
          {/* Update other paths as needed */}
          <Route path="roles" element={<ShowRoles />} />
          <Route path="users" element={<ShowUsers />} />
          <Route path="posts" element={<ShowPosts />} />
          <Route
            path="RequestsAccountsConfirmation"
            element={<RequestsAccountsConfirmation />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
