import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import "./alarmCard.scss"
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

function AlarmCard(props) {
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[200],
            ...theme.applyStyles('dark', {
                backgroundColor: theme.palette.grey[800],
            }),
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: '#1a90ff',
            ...theme.applyStyles('dark', {
                backgroundColor: '#308fe8',
            }),
        },
    }));
    const progress = <BorderLinearProgress variant="determinate" value={50} />
    return (
        // <div className='card_alaram'>
        <Card className='card_alaram' onClick={() => props.setOpenDialog(true)}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                <div className='cardAlarm_content'>
                    <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 18 }}>
                        {props.title}
                    </Typography>
                    {/* <Typography variant="h5" component="div">
                    be{bull}nev{bull}o{bull}lent
                </Typography> */}
                    <Typography sx={{ color: "#4682DA", mb: 1.5, fontSize: 35, fontWeight: 600 }}>{props.count}</Typography>
                </div>
                <div className='cardAlarm__bottom'>
                    {/* <div class="progress"> */}
                    {props.icon}
                    {/* <div class="progress-fill" style={{ width: "45%" }}></div> */}
                    {/* </div> */}
                </div>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
        // </div>
    )
}

export default AlarmCard