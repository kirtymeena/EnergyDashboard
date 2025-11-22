import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        drawerOpen: false,
        selectedSiteId: null,
    },
    reducers: {
        setDrawerOpen(state, action) { state.drawerOpen = action.payload; },
        setSelectedSiteId(state, action) { state.selectedSiteId = action.payload; }
    }
});

export const { setDrawerOpen, setSelectedSiteId } = uiSlice.actions;
export default uiSlice.reducer;