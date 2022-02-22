import backendApi from "configs/api/backendApi";
import {
    deleteUserDTO,
    updateUserDetailsBody,
    updateUserDetailsSDTO,
} from "server";

interface PatchUserDetailsProps {
    id: string;
    body: updateUserDetailsBody;
}

export const patchUserDetails = (props: PatchUserDetailsProps) => {
    const { id, body } = props;
    return backendApi.patch<updateUserDetailsSDTO>(`/admin/users/${id}`, {
        body,
    });
};

export const deleteUser = (props: { id: string }) => {
    const { id } = props;
    return backendApi.delete<deleteUserDTO>(`/admin/users/${id}`);
};
