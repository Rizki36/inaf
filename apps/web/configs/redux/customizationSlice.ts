import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultConfig } from "../themes";

const initialState = {
    isOpen: [], // for active default menu
    fontFamily: defaultConfig.fontFamily,
    borderRadius: defaultConfig.borderRadius,
    opened: true,
};

export const customizationSlice = createSlice({
    name: "customization",
    initialState,
    reducers: {
        MENU_OPEN(state, action: PayloadAction<{ id: string }>) {
            state.isOpen = [action.payload.id];
        },
        SET_MENU(state, action: PayloadAction<{ opened: boolean }>) {
            state.opened = action.payload.opened;
        },
        SET_FONT_FAMILY(state, action: PayloadAction<{ fontFamily: string }>) {
            state.fontFamily = action.payload.fontFamily;
        },
        SET_BORDER_RADIUS(
            state,
            action: PayloadAction<{ borderRadius: number }>
        ) {
            state.borderRadius = action.payload.borderRadius;
        },
    },
});

export const { MENU_OPEN, SET_MENU, SET_FONT_FAMILY, SET_BORDER_RADIUS } =
    customizationSlice.actions;
export default customizationSlice.reducer;
