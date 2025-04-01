import forgotpass from "../../assets/illustrations/forgotpass.svg";
import forgotpass2 from "../../assets/illustrations/forgotpass2.svg";
import AuthUI from "../../components/AuthUI";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

const forgotPassForm_1 = () => {
    const methods = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        let { forgotpass3_new_password } = data;

        const requestObj = {
            newPassword: forgotpass3_new_password,
        };

        try {
            await toast.promise(axios.post("/reset-password", requestObj), {
                loading: "Loading...",
                success: "Successful",
                error: (error) =>
                    error.response.status === 422
                        ? "At least 1 alphabet, 1 digit, and minimum 8 characters are required"
                        : error.response.data,
            });
            navigate(`/`);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                className="flex flex-col space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                {/* Header */}
                <div>
                    <h1 className="font-lexend font-bold text-h36 sm:text-h32">
                        Forgot Password?
                    </h1>
                    <p className="text-[#667085] text-h16 sm:text-h14">
                        Reset your password
                    </p>
                </div>

                {/* Input Fields */}
                <InputField
                    label="New Password"
                    placeholder="New Password"
                    isPassword={true}
                    validationRules={{
                        required: { value: true, message: "Required" },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/,
                            message: "1 alphabet, 1 digit, and minimum 8 characters required",
                        },
                    }}
                />
                <InputField
                    label="Confirm New Password"
                    placeholder="Confirm Password"
                    isPassword={true}
                    validationRules={{
                        required: { value: true, message: "Required" },
                        validate: (val) => {
                            if (methods.watch("forgotpass3_new_password") !== val) {
                                return "Passwords do not match";
                            }
                        },
                    }}
                />

                {/* Footer */}
                <div className="flex flex-col items-center space-y-2">
                    <button className="text-white text-h16 bg-[#0EA5E9] w-full p-2 rounded-lg hover:bg-sky-400 transition font-semibold">
                        Submit
                    </button>
                    <Link
                        to="/"
                        className="text-[#0EA5E9] font-medium hover:text-sky-600 transition hover:underline underline-offset-1 text-p14"
                    >
                        Back to Login
                    </Link>
                </div>
            </form>
        </FormProvider>
    );
};

const forgotPassword_3 = () => {
    return (
        <AuthUI
            InputField={forgotPassForm_1}
            illustration_1={forgotpass}
            illustration_2={forgotpass2}
        />
    );
};

export default forgotPassword_3;