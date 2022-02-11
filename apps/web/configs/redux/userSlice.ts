import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../@types";

export interface UserState {
    account: IUser | null;
    token: string | null;
}

const initialState: UserState = {
    account: null,
    token: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.account = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        logout(state) {
            console.log("loggedOut");
            return initialState;
        },
    },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
