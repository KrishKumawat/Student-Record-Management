import forgotpass from "../../assets/illustrations/forgotpass.svg";
import forgotpass2 from "../../assets/illustrations/forgotpass2.svg";
import AuthUI from "../../components/AuthUI";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

const ForgotPassForm = () => {
    const methods = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        let { forgotpass_email } = data;

        const requestObj = {
            email: forgotpass_email,
        };

        try {
            toast.loading("Checking Email...", { id: "check_email" });
            const result = await axios.post("/is-registered", requestObj);
            toast.dismiss("check_email");

            if (result.data) {
                await toast.promise(axios.post("/send-otp", requestObj), {
                    loading: "Sending OTP...",
                    success: "OTP sent successfully!",
                    error: (error) => {
                        if (error.response?.data === "OTP not expired") {
                            return "Wait before sending OTP...";
                        } else if (error.response?.status === 422) {
                            return "Invalid email";
                        } else {
                            return "Server Error";
                        }
                    },
                });
                navigate("/forgotpassword/otp");
                return;
            }

            return toast.error("Email not registered", { id: "email_DNE", duration: 2000 });
        } catch (error) {
            toast.dismiss("check_email");
            toast.error(
                error.response?.status === 422 ? "Invalid email" : error.response?.data,
                { id: "login_error", duration: 2000 }
            );
            console.log(error.response);
        }
    };

    return (
        <FormProvider {...methods}>
            <form className="flex flex-col space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
                {/* Header */}
                <div>
                    <span className="font-lexend font-bold text-h36 sm:text-h32">Forgot Password?</span>
                    <p className="text-[#667085] text-h16 sm:text-h14">Enter your Institute email to continue</p>
                </div>

                {/* Input Fields */}
                <InputField
                    label="Email"
                    placeholder="e.g. student@example.com"
                    isPassword={false}
                    validationRules={{ required: { value: true, message: "Required" } }}
                />

                {/* Submit */}
                <div className="flex flex-col items-center">
                    <button className="text-white text-h16 bg-[#0EA5E9] w-full p-2 rounded-lg hover:bg-sky-400 transition font-semibold">
                        Continue
                    </button>
                    <Link to="/" className="text-[#0EA5E9] font-medium hover:text-sky-600 transition hover:underline underline-offset-1 text-p14 mt-2">
                        Back to Login
                    </Link>
                    <Link to="/forgotpassword/otp" className="text-[#0EA5E9] text-p14 transition font-medium hover:text-sky-700 mt-1">
                        Already have an OTP?
                    </Link>
                </div>
            </form>
        </FormProvider>
    );
};

const ForgotPassword = () => {
    return <AuthUI InputField={ForgotPassForm} illustration_1={forgotpass} illustration_2={forgotpass2} />;
};

export default ForgotPassword;