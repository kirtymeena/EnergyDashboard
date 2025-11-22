import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
function CustomAlert() {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Site Data for the given Id is not present
        </Alert>
    )
}

export default CustomAlert