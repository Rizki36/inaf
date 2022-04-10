import backendApi from "configs/api/backendApi";
import {
    getPaginationPositionsDTO,
    getPositionDetailsDTO,
    IResponse,
} from "server";
import { PaginationProps } from "../../@types/index";
import useSWR from "swr";

interface getPositionsProps extends PaginationProps {}
export const usePositions = (props: getPositionsProps) => {
    const {
        page = 1,
        perPage = 40,
        sortPage = { sort: null, field: null },
        search,
    } = props;

    const { sort, field } = sortPage;

    const { data, error, mutate } = useSWR(
        ["admin/positions", page, perPage, sort, search],
        (url, page, perPage, sort, search) => {
            return backendApi
                .get<getPaginationPositionsDTO>(url, {
                    params: {
                        page,
                        perPage,
                        sort,
                        field,
                        search,
                    },
                })
                .then((res) => res.data);
        }
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};

interface GetPositionDetailsProps {
    id: string;
}

export const usePositionDetails = (props: GetPositionDetailsProps) => {
    const { id } = props;
    const { data, error, mutate } = useSWR(id, (id) => {
        return backendApi
            .get<IResponse<getPositionDetailsDTO>>(`admin/positions/${id}`)
            .then((res) => res.data);
    });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
