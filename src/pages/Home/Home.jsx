import { useEffect } from 'react';
import './home.scss'
import Header from '../../components/Header/Header'
// import Cards from '../../components/cards/Cards'
// import { FaArrowTrendUp } from "react-icons/fa6";
// import { FaArrowTrendDown } from "react-icons/fa6";
// import Sites from '../../components/Sites/Sites';
// import RevenueCard from '../../components/RevenueCard/RevenueCard';
// import SalesReportCard from '../../components/SalesCard/SalesCard';
// import TotalViewCard from '../../components/TotalViewCard/TotalViewCard';
// import { Divider } from '@mui/material';
// import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
// import Bar from '../../components/bar/Bar';
import Footer from '../../components/Footer/Footer';
// import "primeicons/primeicons.css";
import AlarmCard from '../../components/cards/AlarmCard';
import Card from '@mui/material/Card';

import { FaBroadcastTower } from "react-icons/fa";

import { Button } from 'primereact/button';
import { useState } from 'react';
import CustomDialog from '../../components/CustomDialog/CustomDialog';
import WorldMap from '../../components/WorldMap/WorldMap';
import SimpleLineChart from '../../components/SimpleLineCharts/LineChart';
import { MdNotificationsActive } from "react-icons/md";
import { RiScissorsCutFill } from "react-icons/ri";
import CustomDataTable from '../../components/CustomDataTable/CustomDataTable';

function Home({ alarms, totalSiteCount, siteDataArray, map, selectedLink, isSelected, setIsSelected, menuOptions, setSelectedLink, setUserLoggedIn, sites }) {

    const [openDialog, setOpenDialog] = useState(false)
    const [storageValues, setStorageValues] = useState({
        totalAlarms: sessionStorage.getItem("totalAlarms") || 0,
        totalFiberCuts: sessionStorage.getItem("totalFiberCuts") || 0,
    });

    // 🔥 Listen to storage changes (even from other components)
    useEffect(() => {
        const updateValues = () => {
            setStorageValues({
                totalAlarms: sessionStorage.getItem("totalAlarms") || 0,
                totalFiberCuts: sessionStorage.getItem("totalFiberCuts") || 0,
            });
        };

        // Custom event listener — we trigger this manually from anywhere
        window.addEventListener("session-update", updateValues);

        return () => window.removeEventListener("session-update", updateValues);
    }, []);
    const cardsData = [
        {
            title: "Total Sites",
            count: totalSiteCount || 0,
            icon: <FaBroadcastTower size={60} />
        },
        {
            title: "Total Alarm",
            count: storageValues.totalAlarms,
            icon: <MdNotificationsActive size={60} />
        },
        {
            title: "Total Fiber Cuts",
            count: storageValues.totalFiberCuts,
            icon: <RiScissorsCutFill size={60} />
        },
    ];


    return (
        <div className='home__container'>
            <Header selectedLink={selectedLink} setUserLoggedIn={setUserLoggedIn} />
            <div className='home__wrapper-center'>
                <div className='home__inner'>
                    {
                        cardsData.map((data) =>
                            <div className='home__children'>
                                <AlarmCard title={data.title} icon={data.icon} count={data.count} open={openDialog} setOpenDialog={setOpenDialog} />
                            </div>
                        )
                    }
                </div>
                <div className='home__info'>
                    <div className='home__alarms'>
                        <CustomDataTable alarms={alarms} />
                    </div>
                    <div className='home__graph'>

                        <Card sx={{ minWidth: 275, background: "#4682DA" }}>
                            <SimpleLineChart />
                        </Card>
                    </div>
                </div>
                <div className='home__bottomContainer'>
                    <div className='home__map'>
                        <Card >
                            <WorldMap sites={sites} />
                        </Card>

                    </div>

                </div>
                <CustomDialog open={openDialog} setOpenDialog={setOpenDialog} />
            </div>
        </div>
    )
}

export default Home 