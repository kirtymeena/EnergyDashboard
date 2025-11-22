import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { attachInterceptors } from "../../api/axios";
import axios from "axios";

// Async thunk: login
export const login = createAsyncThunk("auth/login", async (formData) => {
    try {
        const res = await api.post("/login.php", formData);
        // if (res?.status === "success" && res.token) {
        // store token persistently
        localStorage.setItem("token", res.data.token);
        console.log("data", res)
        return { token: res.data.token };
        // }
        // return rejectWithValue(data);
    } catch (err) {
        return { message: err.message };
    }
}
);

// Async thunk: validate token / fetch protected data
export const validateToken = createAsyncThunk(
    "auth/validateToken",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/sems/api/protected.php");
            // data.message & data.data expected
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);

const initialState = {
    token: localStorage.getItem("token") || null,
    user: null,
    status: "idle",
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            localStorage.removeItem("token");
            state.status = "idle";
            state.error = null;
        },
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (s) => { s.status = "loading"; s.error = null; })
            .addCase(login.fulfilled, (s, action) => {
                s.status = "succeeded";
                s.token = action.payload.token;
                localStorage.setItem("token", s.token)
                s.error = null;
            })
            .addCase(login.rejected, (s, action) => {
                s.status = "failed";
                s.error = action.error;
            })
            //validate token    
            .addCase(validateToken.pending, (s) => { s.status = "loading"; s.error = null; })
            .addCase(validateToken.fulfilled, (s, action) => {
                s.status = "succeeded";
                s.user = action.payload.data || null;
                s.error = null;
            })
            .addCase(validateToken.rejected, (s, action) => {
                s.status = "failed";
                s.error = action.payload || action.error;
                // token invalid -> clear it
                s.token = null;
                localStorage.removeItem("token");
            });
    }
});

export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;