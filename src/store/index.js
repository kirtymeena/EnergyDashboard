import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// import uiReducer from "./slices/uiSlice";
import alarmReducer from "./slices/AlarmSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        // ui: uiReducer,
        alarms: alarmReducer,
        // graphGraph:
    },
});

export default store;