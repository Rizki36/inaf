import backendApi from "configs/api/backendApi";
import {
    createUserBody,
    createUserDTO,
    deleteUserDTO,
    updateUserDetailsBody,
    updateUserDetailsSDTO,
} from "server";

interface CreateUserProps {
    body: createUserBody;
}
export const createUser = (props: CreateUserProps) => {
    const { body } = props;
    return backendApi.post<createUserDTO>(`/admin/users`, body);
};

interface PatchUserDetailsProps {
    id: string;
    body: updateUserDetailsBody;
}
export const patchUserDetails = (props: PatchUserDetailsProps) => {
    const { id, body } = props;
    return backendApi.patch<updateUserDetailsSDTO>(`/admin/users/${id}`, body);
};

export const deleteUser = (props: { id: string }) => {
    const { id } = props;
    return backendApi.delete<deleteUserDTO>(`/admin/users/${id}`);
};
