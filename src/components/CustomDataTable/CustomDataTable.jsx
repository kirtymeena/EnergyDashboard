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




function CustomDataTable() {
    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("All");
    const [cardData, setCardData] = useState([])
    /** React Query */
    const fetchAlarms = async () => {
        const token = sessionStorage.getItem("token");

        const res = await axios.get("/sems/api/alarms_table.php", {
            headers: { Authorization: `Bearer ${token}` },
        });


        if (res.data?.length > 0) {
            const fiberCuts = res.data?.filter(ele => ele.alarm === "Fiber Cut")
            sessionStorage.setItem("totalAlarms", res.data.length)
            sessionStorage.setItem("totalFiberCuts", fiberCuts[0].count)
            console.log("alarms", res.data)
        }
        return res.data;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["alarms-table"],
        queryFn: fetchAlarms,
        refetchInterval: 30 * 60 * 1000, // 🔁 auto-refresh every 30 minutes
        refetchOnWindowFocus: false,
    });

    /** Column definitions for MUI DataGrid */
    const columns = [
        { field: "alarm", headerName: "Alarm", flex: 1, align: "left" },
        { field: "count", headerName: "Count", width: 120, },
        { field: "severity", headerName: "Severity", width: 150, },
    ];
    /** Apply filters */
    const filteredRows = useMemo(() => {
        if (!data) return [];

        return data
            .filter(item =>
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

    }, [data])
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
        </div>
    )
}

export default CustomDataTable