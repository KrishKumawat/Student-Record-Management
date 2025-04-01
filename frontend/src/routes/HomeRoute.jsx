import useFetchProfile from "../helpers/fetchUserHook";
import AdminDashboard from "../pages/admin/dashboard";
import TeacherDashboard from "../pages/teacher/dashboard";
import StudentDashboard from "../pages/student/dashboard";
import LoginScreen from "../pages/common/login";

const HomeRoute = () => {
    const { user, isLoading } = useFetchProfile("/profile");

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <div style={{ width: `100px`, height: `100px` }} className="animate-spin">
                    <div className="h-full w-full border-4 border-t-sky-500 border-b-sky-500 rounded-[50%]"></div>
                </div>
            </div>
        );
    }

    if (user?.role === "admin") {
        return <AdminDashboard />;
    }

    if (user?.role === "security") {
        return <TeacherDashboard />;
    }

    if (user?.role === "student") {
        return <StudentDashboard />;
    }

    return <LoginScreen />;
};

export default HomeRoute;
