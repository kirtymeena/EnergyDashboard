import { useState, useMemo, useEffect } from "react";
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    CircularProgress,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getAlarmData } from "../../store/slices/AlarmSlice";
import { Link } from "react-router";
import CustomDialog from "../CustomDialog/CustomDialog";



function CustomDataTable() {
    const dispatch = useDispatch()
    const alarms = useSelector((state) => state.alarms.alarmData);
    const [open, setOpen] = useState(false)
    // const alarmData = useSelector(state=>state.)
    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("All");
    const [cardData, setCardData] = useState([])
    /** React Query */

    const { data, isLoading, isError } = useQuery({
        queryKey: ["alarms-table"],
        queryFn: () => dispatch(getAlarmData()).unwrap(),
        refetchInterval: 900000,
        refetchIntervalInBackground: true,
        refetchOnReconnect: true,
        // Refetch when window is refocused (optional)
        refetchOnWindowFocus: true,
    });

    /** Column definitions for MUI DataGrid */
    const columns = [
        {
            field: "alarm", headerName: "Alarm", flex: 1, align: "left", renderCell: (params) => {
                const count = params.row.count;
                return count > 0 ? (
                    <Link style={{ textDecoration: "underline", color: "#1976d2" }} onClick={() => setOpen(true)}>
                        {params.row.alarm}
                    </Link>
                ) : (
                    <span>{params.row.alarm}</span>
                );
            },
        },
        { field: "count", headerName: "Count", width: 120, },
        { field: "severity", headerName: "Severity", width: 150, },
    ];
    /** Apply filters */
    const filteredRows = useMemo(() => {
        if (!data) return [];

        return (data || alarms)?.filter(item =>
            item.alarm.toLowerCase().includes(search.toLowerCase())
        )
            .filter(item =>
                severity === "All" ? true : item.severity === severity
            )
            .map((item, index) => ({
                id: index,
                ...item,
            }));
    }, [data, search, severity]);


    useEffect(() => {
        // total alarm counts
        dispatch(getAlarmData())
    }, [dispatch])
    return (
        <div style={{ height: "370px" }}>

            {/* Filters */}


            {/* Data Grid section */}
            {isLoading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <Typography color="error">Failed to load data</Typography>
            ) : Array.isArray(data) ? (
                <DataGrid
                    sx={{

                        "& .MuiDataGrid-columnSeparator": {
                            // height: "100% !important",
                            // maxHeight: "none !important",
                            display: "none !important"
                        },

                    }}
                    pagination
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 5, page: 0 }
                        }
                    }}
                    rows={filteredRows}
                    columns={columns}
                    // autoHeight
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 10, 20]}
                />
            ) : (
                <Typography>No readings found</Typography>
            )}
            <CustomDialog open={open} setOpenDialog={setOpen} />

        </div>
    )
}

export default CustomDataTable