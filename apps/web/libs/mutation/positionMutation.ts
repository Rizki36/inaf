import backendApi from "configs/api/backendApi";
import {
    deletePositionDTO,
    updatePositionDetailsBody,
    updatePositionDetailsDTO,
} from "server";

interface PatchPositionDetailsProps {
    id: string;
    body: updatePositionDetailsBody;
}

export const patchPositionDetails = (props: PatchPositionDetailsProps) => {
    const { id, body } = props;
    return backendApi.patch<updatePositionDetailsDTO>(`/admin/users/${id}`, {
        body,
    });
};

export const deletePosition = (props: { id: string }) => {
    const { id } = props;
    return backendApi.delete<deletePositionDTO>(`/admin/users/${id}`);
};
