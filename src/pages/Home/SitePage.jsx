import React, { useEffect, useState } from 'react'
import Cards from '../../components/cards/Cards'
import { Divider } from '@mui/material';
import TotalViewCard from '../../components/TotalViewCard/TotalViewCard';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import Bar from '../../components/bar/Bar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'
import { useParams } from "react-router-dom";
import CustomAlert from '../../components/CustomAlert/CustomAlert';
import api from '../../api/axios';
import Header from '../../components/Header/Header';

function SitePage({ userLoggedIn, selectedLink, isSelected, setIsSelected, menuOptions, setSelectedLink }) {
    //complete site data
    const [mapData, setMapData] = useState(null)
    const { siteId } = useParams(); // ← This gives you the dynamic ID
    const [error, setError] = useState(false)
    const fetchData = async () => {
        try {
            //deployed
            // const res = await axios.get("/api/pull-values");

            //local
            const res = await api.get(`/get_readings.php?site_id=${siteId}`)

            console.log(res)
            const data = res.data
            if (data?.error) {
                setError(true)
                return
            }
            setError(false)
            return [
                {
                    section: "Site Info",
                    data: [
                        {
                            title: "Site ID",
                            value: data.device_id
                        },
                        {
                            title: "Site Name",
                            value: data.site_name,
                        },
                        {
                            title: "Type Of Battery Bank",
                            value: data.type_of_bb
                        },
                        {
                            title: "AH Capacity",
                            value: data.ah_capacity + "AH"
                        },
                        {
                            title: "Manufacturer Name",
                            value: data.manufacturer
                        },
                        {
                            title: "Design Voltage",
                            value: data.design_voltage + "V"
                        },
                        {
                            title: "Individual Cell Voltage",
                            value: data.design_voltage + "Volts",
                        }
                    ],
                },
                {
                    section: "Instantaneous",
                    data: [
                        { title: "String Voltage", value: "--V" },
                        { title: "Door Status", value: data.Door_status },
                        { title: "Fiber Status", value: data.fiber_cut },
                        { title: "Room Temperature", value: data.temp + "°C" },
                        { title: "Room Humidity", value: data.hum + "%" },
                        { title: "Reading Time", value: data.reading_time },
                    ],
                },
                {
                    section: "Alarms",
                    data: [
                        { title: "Door Open", value: data.alarm1 },
                        { title: "Fire & Smoke", value: data.alarm2 },
                        { title: "High Temperature + Humidity", value: data.alarm3 },
                        { title: "Mains / Battery", value: data.alarm4 },
                        { title: "Battery Health", value: data.alarm5 },
                        { title: "Fiber Cut", value: data.alarm6 },
                        // { title: "Rectifier Fail", value: data?.alarm7 || "" },
                    ],
                },
                {
                    section: "Battery",
                    data: [
                        { title: "Cell 1", value: data.v1 },
                        { title: "Cell 2", value: data.v2 },
                        { title: "Cell 3", value: data.v3 },
                        { title: "Cell 4", value: data.v4 },
                        { title: "Cell 5", value: data.v5 },
                        { title: "Cell 6", value: data.v6 },
                    ]
                },
                {
                    section: "map",
                    data: data.map
                }
            ];
        } catch (err) {
            console.log(err)
        }
    }
    const { data, idLoading, isError } = useQuery({
        queryKey: ['siteData', siteId],
        queryFn: () => fetchData(siteId),
        refetchInterval: 30 * 60 * 1000, // ⏱️ 30 minutes
        refetchIntervalInBackground: true, // ✅ continues even when tab is inactive
        enabled: userLoggedIn && !!siteId,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    })

    useEffect(() => {
        if (data) {
            const map = data.filter(ele => ele.section === "map")
            setMapData(map[0].data)
        }
    }, [data])
    return idLoading ? "loading" :
        (
            <div>
                {/* <Header selectedLink={"Site Details"} /> */}
                <div className='home__wrapper'>
                    <div className='home__right'>
                        {error && <CustomAlert />}
                        <div className='home__body'>
                            {
                                data?.map(data =>
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
                        <TotalViewCard title="Device Location" mapURL={mapData} />
                    </div>
                </div>

                <Bar selectedLink={selectedLink} isSelected={isSelected} setIsSelected={setIsSelected} menuOptions={menuOptions} setSelectedLink={setSelectedLink} />
            </div>
        )
}

export default SitePage