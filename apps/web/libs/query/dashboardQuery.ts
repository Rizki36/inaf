import backendApi from "@/configs/api/backendApi";
import useSWR from "swr";

export const useDashboard = (projectId?: string) => {
    const { data, error, mutate } = useSWR(["/dashboard", projectId], (url) => {
        return backendApi
            .post(`${url}`, {
                projectId,
            })
            .then((res) => res.data);
    });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
