import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/store";

const Logout = () => {
    const navigate = useNavigate();
    const { setUser, setIsLoading: userLoading } = useUserStore();

    useEffect(() => {
        try {
            toast
                .promise(axios.get("/logout"), {
                    loading: "Logging out...",
                    success: "Logged out",
                    error: (error) => error.response.data,
                })
                .then(() => {
                    setUser(null);
                    userLoading(true);
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error.response);
                    navigate("/");
                });
        } catch (error) {
            console.log(error);
            navigate("/");
        }
    }, [navigate]);

    return <div></div>;
};

export default Logout;
