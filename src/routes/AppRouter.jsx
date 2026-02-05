import { Routes, Route } from "react-router-dom";
import Regis from "../pages/Regis";
import Login from "../pages/Login";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/regis" element={<Regis />} />
            <Route path="/login" element={<Login/>}/>
        </Routes>
    );
};

export default AppRouter;
