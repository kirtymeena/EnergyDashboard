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

import { Button } from 'primereact/button';
import { useState } from 'react';
import CustomDialog from '../../components/CustomDialog/CustomDialog';

function Home({ siteDataArray, map, selectedLink, isSelected, setIsSelected, menuOptions, setSelectedLink, setUserLoggedIn }) {

    const [openDialog, setOpenDialog] = useState(false)
    return (
        <div className='home__container'>
            <Header selectedLink={selectedLink} setUserLoggedIn={setUserLoggedIn} />
            <div className='home__wrapper-center'>
                <div className='home__inner'>
                    <div className='home__children'>
                        <AlarmCard open={openDialog} setOpenDialog={setOpenDialog} />
                    </div>
                    <div className='home__children'>
                        <AlarmCard />
                    </div>
                    <div className='home__children'>
                        <AlarmCard />
                    </div>
                    <div className='home__children'>
                        <AlarmCard />
                    </div>
                </div>
                <CustomDialog open={openDialog} setOpenDialog={setOpenDialog} />
            </div>
        </div>
    )
}

export default Home 