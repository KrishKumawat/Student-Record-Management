import axios from "axios";
import { useEffect } from "react";
import { useUserStore } from "../store/store";

const useFetchProfile = (query) => {
    const { user, setUser, isLoading, setIsLoading } = useUserStore();

    useEffect(() => {
        if (!query) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(query);

                if (response.data.role === "student") {
                    const outStatus = await axios.get("/student/outing-status");
                    setUser({
                        ...response.data,
                        isOutside: outStatus.data === "outside"
                    });
                } else {
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [query, setUser, setIsLoading]);

    return { user, isLoading };
};

export default useFetchProfile;
