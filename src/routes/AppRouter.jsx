import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Regis from "../pages/Regis";
import Login from "../pages/Login";
import Home from "../pages/Home";

export default function AppRouter () {
    return (
        <Routes>
            <Route path="/regis" element={<Regis />} />
            <Route path="/login" element={<Login/>}/>
            <Route element={<UserLayout/>}>
                <Route path="/" element={<Home/>}></Route>
            </Route>
        </Routes>
    );
};

