import backendApi from "configs/api/backendApi";
import {
    createPositionBody,
    createPositionDTO,
    deletePositionDTO,
    updatePositionDetailsBody,
    updatePositionDetailsDTO,
} from "server";

interface CreatePositionProps {
    body: createPositionBody;
}
export const createPosition = (props: CreatePositionProps) => {
    const { body } = props;
    return backendApi.post<createPositionDTO>(`/admin/positions`, {
        body,
    });
};

interface PatchPositionDetailsProps {
    id: string;
    body: updatePositionDetailsBody;
}
export const patchPositionDetails = (props: PatchPositionDetailsProps) => {
    const { id, body } = props;
    return backendApi.patch<updatePositionDetailsDTO>(
        `/admin/positions/${id}`,
        {
            body,
        }
    );
};

export const deletePosition = (props: { id: string }) => {
    const { id } = props;
    return backendApi.delete<deletePositionDTO>(`/admin/positions/${id}`);
};
