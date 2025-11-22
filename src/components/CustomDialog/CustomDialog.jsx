import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from "@mui/x-data-grid";

// import Typography from '@mui/material/Typography';
import { TextField, Box, CircularProgress, Typography } from "@mui/material";

import "./customDialog.scss"
import { Link } from 'react-router';
import { Divider } from '@mui/material';
import axios from 'axios';
import api from '../../api/axios';
function CustomDialog(props) {
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredRows, setFilteredRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");


    const handleClose = () => {
        props.setOpenDialog(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setErrorMsg("");

            try {
                const res = await api.get(
                    `/alarm_type_details.php?alarm=${encodeURIComponent(props.alarm)}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                console.log(res)
                if (Array.isArray(res.data)) {
                    const rowsWithId = res.data.map((item, index) => ({
                        id: index + 1,
                        ...item,
                    }));
                    setRows(rowsWithId);
                    setFilteredRows(rowsWithId);
                } else if (res.data.message) {
                    setRows([]);
                    setFilteredRows([]);
                    setErrorMsg(res.data.message);
                }
            } catch (err) {
                setErrorMsg("Error fetching data");
            }

            setLoading(false);
        };

        fetchData();
    }, [localStorage.getItem('token'), props.alarm]);

    // Search filter
    useEffect(() => {
        const result = rows.filter(
            (row) =>
                row.site_id.toLowerCase().includes(search.toLowerCase()) ||
                row.alarm_time.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredRows(result);
    }, [search, rows]);

    const columns = [
        {
            field: "site_id", headerName: "Site ID", flex: 1, renderCell: (params) => {
                const id = params.value;

                // skip linking if ID is N/A or empty
                if (id === "N/A" || !id) {
                    return <span style={{ color: "#999" }}>N/A</span>;
                }

                return (
                    <Link
                        to={`/sites/${id}`}
                        style={{ color: "#1976d2", textDecoration: "underline", fontWeight: 500 }}
                    >
                        {id}
                    </Link>
                );
            },
        },
        { field: "alarm_time", headerName: "Alarm Time", flex: 1.5 },
    ];
    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={props.open}
            maxWidth={false}
            slotProps={{
                paper: {
                    sx: {
                        width: "50%",
                        maxWidth: "70%",
                        height: "700px"
                    }
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Active Alarm: <span style={{ color: "#4682DA" }}>{props.alarm}</span> : List of Sites
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <TextField
                    label="Search Site / Time"
                    variant="outlined"
                    // fullWidth
                    sx={{ mb: 1, width: "300px" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : errorMsg ? (
                    <Typography color="error" sx={{ mt: 2, fontSize: "18px" }}>
                        {errorMsg}
                    </Typography>
                ) : (
                    <DataGrid
                        sx={{

                            "& .MuiDataGrid-columnSeparator": {
                                // height: "100% !important",
                                // maxHeight: "none !important",
                                display: "none !important"
                            },

                        }}
                        disableRowSelectionOnClick
                        rows={filteredRows}
                        columns={columns}
                        pageSize={10}
                    />
                )}
            </DialogContent>

        </Dialog >
    )
}

export default CustomDialog