import { Route, Routes } from "react-router-dom";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import HomeScreen from "./pages/HomeScreen";
import NotFound from "./pages/NotFound";
import ProfileScreen from "./pages/ProfileScreen";
import Show from "./pages/Show";
import UserProfileScreen from "./pages/UserProfileScreen";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/posts/:id" element={<Show />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/profile/:id" element={<UserProfileScreen />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
