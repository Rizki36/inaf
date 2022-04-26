import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface DashboardState {
    currentProject?: string;
}
const initialState: DashboardState = {
    currentProject: null,
};
export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setProject(state, action: PayloadAction<string>) {
            state.currentProject = action.payload;
        },
    },
});

export const { setProject } = dashboardSlice.actions;
export default dashboardSlice.reducer;
