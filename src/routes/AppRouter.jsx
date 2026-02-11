import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import Regis from "../pages/Regis";
import Login from "../pages/Login";
import Home from "../pages/Home";
import History from "../pages/History";
import CreateReport from "../pages/CreateReport";
import Notification from "../pages/Notification";
import Profile from "../pages/Profile";
import DetailReport from "../pages/DetailReport";
import Dashboard from "../Admin/pages/Dashboard";
import ManageReport from "../Admin/pages/ManageReport";
import ManageResource from "../Admin/pages/ManageResource";

import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import GuestRoute from "./GuestRoute";

export default function AppRouter () {
    return (
        <Routes>
            <Route path="/regis" element={
                <GuestRoute>
                    <Regis />
                </GuestRoute>
                } />
            <Route path="/login" element={
                <GuestRoute>
                    <Login/>
                </GuestRoute>
                }/>

            <Route element={<UserLayout/>}>
                <Route path="/" element={<Home/>}></Route>

                <Route path="/history" element={
                    <UserRoute>
                        <History/>
                    </UserRoute>
                    }/>

                <Route path="/report" element={
                    <UserRoute>
                        <CreateReport/>
                    </UserRoute>
                    }/>

                <Route path="/notifications" element={
                    <UserRoute>
                        <Notification/>
                    </UserRoute>
                    }/>

                <Route path="/profil" element={
                    <UserRoute>
                        <Profile/>
                    </UserRoute>
                    }/>

                <Route path="/history/:id" element={
                    <UserRoute>
                        <DetailReport/>
                    </UserRoute>
                    }/>
            </Route>

            <Route element={<AdminLayout/>}>
                <Route path="/admin/dashboard" element={
                    <AdminRoute>
                        <Dashboard/>
                    </AdminRoute>
                    }/>
                    
                <Route path="/admin/reports" element={
                    <AdminRoute>
                        <ManageReport/>
                    </AdminRoute>
                    }/>

                <Route path="/admin/resources" element={
                    <AdminRoute>
                        <ManageResource/>
                    </AdminRoute>
                    }/>
            </Route>
        </Routes>
    );
};

