import './home.scss'
import Header from '../../components/Header/Header'
import Cards from '../../components/cards/Cards'
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import Sites from '../../components/Sites/Sites';
import RevenueCard from '../../components/RevenueCard/RevenueCard';
import SalesReportCard from '../../components/SalesCard/SalesCard';
import TotalViewCard from '../../components/TotalViewCard/TotalViewCard';
import { Divider } from '@mui/material';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import Bar from '../../components/bar/Bar';


function Home() {
    return (
        <div className='home__container'>
            <Header />
            <div className='home__wrapper'>
                <div className='home__right'>
                    <div className='header__options'>
                        <div className='header__title'>
                            Dashboard
                        </div>
                        <div className='header__filter' >
                            <AutoAwesomeMosaicIcon />
                        </div>
                    </div>
                    <div className='home__body'>
                        <Cards type="update" />

                        <Cards type="sales" title="Power Generation" amount="30.08" number={"26.98%"} message={`KW`} icon={<FaArrowTrendUp color={"#79BB7B"} />} color={"#79BB7B"} />

                        <Cards type="income" title="Total Now" amount="32.00" number={"-24%"} message={`from last month`} icon={<FaArrowTrendDown color={"#E7605C"} />} color={"#E7605C"} />
                    </div>
                    <div className='home__body-lower'>
                        <div><Sites /></div>
                        <div className='details__card'>
                            <RevenueCard />
                            {/* <SalesReportCard /> */}
                        </div>
                    </div>
                </div>
                <div className='divider'>
                    <Divider variant="middle" style={{ borderColor: "#e7e7e7" }} orientation="vertical" />
                </div>
                <div className='home__left'>
                    <TotalViewCard title="Cost Of Energy" centerText={"2.595K"} content={["Avaoided", "Power Grid", "Generators"]} btn={"See Last Month's Data"} />
                    <TotalViewCard title="CO2e" centerText={"2.595Kg"} content={["Avaoided", "Power Grid", "Generators"]} btn={"See Last Month's Data"} />
                </div>
            </div>
            <Bar />
        </div>
    )
}

export default Home 