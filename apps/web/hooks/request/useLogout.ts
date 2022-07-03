import backendApi from "configs/api/backendApi";
import useSWR from "swr";

const useLogout = () => {
    const { data, error, mutate, isValidating } = useSWR("logout", (url) =>
        backendApi.get(url)
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
        isValidating,
    };
};

export default useLogout;
