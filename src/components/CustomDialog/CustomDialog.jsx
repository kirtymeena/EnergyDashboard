import React from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import "./customDialog.scss"
import { Link } from 'react-router';
import { Divider } from '@mui/material';
function CustomDialog(props) {
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
            width: "100%",
            border: "1px solid red"
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    const handleClose = () => {
        props.setOpenDialog(false);
    };
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
                        maxWidth: "70%"
                    }
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Sites
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
                <div className="dialogContent__wrapper">
                    <div>Site</div>
                    <div>Date</div>
                </div>
                <Divider />
                <div className="dialogContent__wrapper">
                    <div>alarm</div>
                    <div>Date</div>
                </div>
            </DialogContent>
            <DialogActions>
                {/* <Button autoFocus onClick={handleClose}>
                    Save changes
                </Button> */}
            </DialogActions>
        </Dialog>
    )
}

export default CustomDialog