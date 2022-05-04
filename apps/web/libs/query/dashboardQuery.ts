import backendApi from "@/configs/api/backendApi";
import { GetDashboardResponse } from "server";
import useSWR from "swr";

export const useDashboard = (projectId?: string) => {
    const { data, error, mutate } = useSWR(["/dashboard", projectId], (url) => {
        return backendApi
            .get<GetDashboardResponse>(`${url}`, {
                params: {
                    projectId,
                },
            })
            .then((res) => res.data.data);
    });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
