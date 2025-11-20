import React from 'react'
import Cards from '../../components/cards/Cards'
import { Divider } from '@mui/material';
import TotalViewCard from '../../components/TotalViewCard/TotalViewCard';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import Bar from '../../components/bar/Bar';
function SitePage({ siteDataArray, map, selectedLink, isSelected, setIsSelected, menuOptions, setSelectedLink }) {
    return (
        <div>
            <div className='home__wrapper'>
                <div className='home__right'>
                    <div className='home__body'>
                        {
                            siteDataArray?.map(data =>
                                data.section !== "map" &&
                                <Cards type={data.section} title={data.section} data={data.data} color={"#79BB7B"} />
                            )
                        }

                    </div>
                </div>
                <div className='divider'>
                    <Divider variant="middle" style={{ borderColor: "#e7e7e7" }} orientation="vertical" />
                </div>
                <div className='home__left'>
                    <TotalViewCard title="Device Location" mapURL={map} />
                </div>
            </div>
            <Bar selectedLink={selectedLink} isSelected={isSelected} setIsSelected={setIsSelected} menuOptions={menuOptions} setSelectedLink={setSelectedLink} />
        </div>
    )
}

export default SitePage