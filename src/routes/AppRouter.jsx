import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Regis from "../pages/Regis";
import Login from "../pages/Login";
import Home from "../pages/Home";
import History from "../pages/History";
import CreateReport from "../pages/CreateReport";
import Notification from "../pages/Notification";
import Profile from "../pages/Profile";
import DetailReport from "../pages/DetailReport";

export default function AppRouter () {
    return (
        <Routes>
            <Route path="/regis" element={<Regis />} />
            <Route path="/login" element={<Login/>}/>
            <Route element={<UserLayout/>}>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/history" element={<History/>}></Route>
                <Route path="/report" element={<CreateReport/>}></Route>
                <Route path="/notifications" element={<Notification/>}></Route>
                <Route path="/profil" element={<Profile/>}></Route>
                <Route path="/history/:id" element={<DetailReport/>}></Route>
            </Route>
        </Routes>
    );
};

