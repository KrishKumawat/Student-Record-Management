import login from "../../assets/illustrations/login.svg";
import login2 from "../../assets/illustrations/login2.svg";
import AuthUI from "../../components/AuthUI";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";

const LoginForm = () => {
    const methods = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true);
        const login_username = "admin@school.com"
        const login_password = "admin123"
        const login_remember_me = data;

        // Log for debugging
        console.log("Form Data:", data);

        // Hardcoded authentication logic from handleLogin
        if (login_username === "admin@school.com" && login_password === "admin123") {
            toast.success("Welcome Admin!");
            setTimeout(() => {
                // Assuming setIsLoggedIn is passed as a prop or managed elsewhere
                navigate("/admin/dashboard");
                setIsLoading(false);
            }, 1000); // Delay for toast visibility
        } else if (
            login_username === "teacher@school.com" &&
            login_password === "teacher123"
        ) {
            toast.success("Welcome Teacher!");
            setTimeout(() => {
                navigate("/teacher/dashboard");
                setIsLoading(false);
            }, 1000);
        } else if (
            login_username === "student@school.com" &&
            login_password === "student123"
        ) {
            toast.success("Welcome Student!");
            setTimeout(() => {
                navigate("/student/dashboard");
                setIsLoading(false);
            }, 1000);
        } else {
            toast.error("Invalid credentials. Please try again.");
            setIsLoading(false);
        }

        // Handle "Remember me" functionality
        if (login_remember_me) {
            localStorage.setItem("remembered_username", login_username);
            localStorage.setItem("remember_me", "true");
        } else {
            localStorage.removeItem("remembered_username");
            localStorage.setItem("remember_me", "false");
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                className="flex flex-col space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                {/* Header */}
                <div className="space-y-1">
                    <span className="font-lexend font-bold text-h36 sm:text-h32">
                        Login
                    </span>
                    <p className="text-[#667085] text-h16 sm:text-h14">
                        Please fill your detail to access your account.
                    </p>
                </div>

                {/* Input Fields */}
                <InputField
                    label="Username"
                    placeholder="e.g. admin@school.com"
                    isPassword={false}
                    validationRules={{ required: { value: true, message: "Required" } }}
                />

                <InputField
                    label="Password"
                    placeholder="Password"
                    isPassword={true}
                    validationRules={{ required: { value: true, message: "Required" } }}
                />

                {/* Remember Me */}
                <div className="text-h14 flex lg:space-x-24 md:space-x-16 sm:space-x-12">
                    <div className="flex flex-row items-center justify-between w-screen py-1">
                        <label
                            className="flex space-x-1.5 text-slate-500 font-semibold cursor-pointer"
                            htmlFor="login_remember_me"
                        >
                            <input
                                className="w-[16px] cursor-pointer accent-sky-600"
                                type="checkbox"
                                defaultChecked
                                id="login_remember_me"
                                {...methods.register("login_remember_me")}
                            />
                            <span className="hover:text-slate-600 transition text-p14">
                                Remember me
                            </span>
                        </label>

                        <Link
                            to="/forgotpassword/email"
                            className="text-[#0EA5E9] transition font-medium hover:text-sky-700 text-p14"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center space-y-3">
                    <button
                        disabled={isLoading}
                        className="text-white text-h16 bg-[#0EA5E9] w-full p-2 rounded-lg hover:bg-sky-400 transition-all font-semibold disabled:bg-slate-300"
                    >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>
                    <Link
                        to="/register/email"
                        className="text-[#0EA5E9] font-medium hover:text-sky-600 transition hover:underline underline-offset-1 text-p14"
                    >
                        Create new account
                    </Link>
                </div>
            </form>
        </FormProvider>
    );
};

const LoginScreen = () => {
    return (
        <AuthUI
            InputField={LoginForm}
            illustration_1={login}
            illustration_2={login2}
        />
    );
};

export default LoginScreen;