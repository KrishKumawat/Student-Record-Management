import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error404 from "../pages/common/error404";
import Home from "./HomeRoute";
import ForgotPassword_1 from "../pages/common/forgotPassword_1";
import ForgotPassword_2 from "../pages/common/forgotPassword_2";
import ForgotPassword_3 from "../pages/common/forgotPassword_3";
import ChangePassword from "../pages/common/changePassword";
import Support from "../pages/common/support";
import Logout from "../components/LogoutComp";
import AdminDashboard from "../pages/admin/dashboard"

const mainRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Common */}
                <Route path="/" element={<Home />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/forgotpassword/email" element={<ForgotPassword_1 />} />
                <Route path="/forgotpassword/otp" element={<ForgotPassword_2 />} />
                <Route path="/forgotpassword/reset" element={<ForgotPassword_3 />} />
                <Route path="/changepass" element={<ChangePassword />} />
                <Route path="/help" element={<Support />} />
                <Route path="*" element={<Error404 />} />

                {/* Admin Routes */}
                <Route path="admin/dashboard" element={<AdminDashboard />} />


                {/* Teacher Routes */}


                {/* Student Routes */}


            </Routes>
        </Router>
    )
}

export default mainRouter