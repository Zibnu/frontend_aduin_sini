import { Routes, Route } from "react-router-dom";
import Regis from "../pages/Regis";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/regis" element={<Regis />} />
        </Routes>
    );
};

export default AppRouter;
