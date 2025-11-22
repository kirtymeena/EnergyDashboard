import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { IoMdInformationCircleOutline } from "react-icons/io";

import "./reportContainer.scss"
import { Button } from '@mui/material';
import api from '../../api/axios';
function Reports() {
    const [to, setTo] = useState(null);
    const [from, setFrom] = useState(null);
    const [siteIds, setSiteIds] = useState(''); // string, comma-separated

    const getFile = async (start_date, end_date, site_id) => {
        try {
            const res = await api.get(`/readings_export.php?start_date=${start_date}&end_date=${end_date}&site_id=${site_id}`, {
                responseType: 'arraybuffer', // important for ZIP files

            })
            console.log(res)
            const blob = new Blob([res.data], { type: 'application/zip' });

            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link
            const link = document.createElement('a');

            // Get filename from content-disposition if available
            const contentDisposition = res.headers['content-disposition'];
            let fileName = 'report.zip';
            // if (contentDisposition) {
            //     const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
            //     if (fileNameMatch && fileNameMatch[1]) fileName = fileNameMatch[1];
            // }

            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            // Cleanup
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (e) {
            console.log(e)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const siteIdsArray = siteIds.split(',').map(id => id.trim()); // optional: convert to array
        console.log('From:', from, 'To:', to, 'Site IDs:', siteIdsArray);
        const start_date = `${to.$y}-${to.$M + 1}-${to.$D} ${parseInt(to.$H) < 10 ? "0" + to.$H : to.$H}:${parseInt(to.$m) < 10 ? "0" + to.$m : to.$m}:00`
        const end_date = `${from.$y}-${from.$M + 1}-${from.$D} ${to.$H}:${parseInt(from.$m) < 10 ? "0" + from.$m : from.$m}:00`
        const site_id = siteIdsArray.join(",")
        getFile(start_date, end_date, site_id)

    }
    return (
        <form className='reportContainer' onSubmit={handleSubmit}>
            <h2>Generate Reports</h2>
            <div className='report__wrapper'>
                <div className='form__container'>
                    <p>Start Date</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker label="Select Date and Time" onChange={(newValue) => setTo(newValue)}
                            ampm={false} // <-- this makes it 24-hour format
                            renderInput={(params) => <TextField {...params} />} />
                    </LocalizationProvider>
                </div>
                <div className='form__container'>
                    <p>End Date</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker label="Select Date and Time" onChange={(newValue) => setFrom(newValue)}
                            ampm={false} // <-- this makes it 24-hour format
                            renderInput={(params) => <TextField {...params} />} />
                    </LocalizationProvider>
                </div>
                <div className='form__container'>
                    <p className='info-p'>Site Id <span title="To retrieve data for multiple sites, enter the site IDs separated by commas."><IoMdInformationCircleOutline /></span></p>
                    <TextField id="outlined-basic" label="Site Id" variant="outlined" onChange={(e) => setSiteIds(e.target.value)} />
                </div>
            </div>
            <div>
                <Button type="submit" variant="contained">Generate</Button>

            </div>
        </form>
    )
}

export default Reports