import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { attachInterceptors } from "../../api/axios";
import axios from "axios";

// Async thunk: login
export const getAlarmData = createAsyncThunk("get/alarms", async () => {
    try {
        const res = await api.get("/alarms_table.php");
        // if (res?.status === "success" && res.token) {
        // store token persistently
        console.log("dataAlarm", res)
        return res.data
        // }
        // return rejectWithValue(data);
    } catch (err) {
        return { message: err.message };
    }
}
);

export const getSites = createAsyncThunk("get/sites", async () => {
    try {
        const res = await api.get(`/get_sites.php`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        // if (res?.status === "success" && res.token) {
        // store token persistently
        console.log("sites", res)
        return {
            sites: res.data.sites,
            count: res.data.count
        }
    } catch (err) {
        return { message: err.message };
    }

})

const initialState = {
    alarmData: [],
    totalAlarms: 0,
    sitesMap: [],
    totalSite: 0,
    status: "idle",
    error: null,
    totalFibercuts: 0
};

const alarmSlice = createSlice({
    name: "alarms",
    initialState,
    reducers: {
        getFiberCuts(state) {
            if (state.alarmData.length > 0) {
                const fiberCuts = state?.alarmData?.filter(ele => ele.alarm === "Fiber Cut")
                console.log(fiberCuts)
                state.totalFibercuts = fiberCuts[0]?.count;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAlarmData.pending, (s) => { s.status = "loading"; s.error = null; })
            .addCase(getAlarmData.fulfilled, (s, action) => {
                s.status = "succeeded";
                s.alarmData = action.payload;
                s.error = null;
                s.totalAlarms = action.payload.length
            })
            .addCase(getAlarmData.rejected, (s, action) => {
                s.status = "failed";
                s.error = action.error;
            })

            //sites 
            .addCase(getSites.pending, (s) => {
                s.status = "loading";
                s.error = null
            })
            .addCase(getSites.fulfilled, (s, action) => {
                s.status = "succeeded";
                s.sitesMap = action.payload.sites;
                // s.totalSite = action.payload.count
                s.totalSite = action.payload.count
                s.error = null;
            })
            .addCase(getSites.rejected, (s, action) => {
                s.status = "failed";
                s.error = action.error;
            })

    }
});

export const { getFiberCuts } = alarmSlice.actions;

export default alarmSlice.reducer;