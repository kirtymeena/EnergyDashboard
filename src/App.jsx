import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Home from "./pages/Home/Home"
import Header from "./components/Header/Header"
import Sidebar from "./components/sidebar/Sidebar"
import "./App.scss"
import { useEffect, useState } from "react"
import Login from "./components/Login/Login"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(true)
  const [mapData, setMapData] = useState(null)

  const fetchData = async () => {
    const res = await axios.get("/api/proxy");

    console.log(res)
    const data = res.data
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
            value: data.ah_capacity
          },
          {
            title: "Manufacturer Name",
            value: data.manufacturer
          },
          {
            title: "Design Voltage",
            value: data.design_voltage
          },
          {
            title: "Individual Cell Voltage",
            value: data.design_voltage,
          }
        ],
      },
      {
        section: "Instantaneous",
        data: [
          { title: "String Voltage", value: "--V" },
          { title: "Door Status", value: data.Door_status },
          { title: "Fiber Status", value: data.fiber_cut },
          { title: "Room Temperature", value: data.temp },
          { title: "Room Humidity", value: data.hum },
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
          { title: "Rectifier Fail", value: data?.alarm7 || "" },
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

    ];
  }


  const { data, isLoading, isError } = useQuery({
    queryKey: ['siteData'],
    queryFn: fetchData,
    refetchInterval: 30 * 60 * 1000, // ⏱️ 30 minutes
    refetchIntervalInBackground: true, // ✅ continues even when tab is inactive
    enabled: userLoggedIn,
  })



  const Layout = () => {
    return (
      <div className="layout">
        <div className="layout-md">
          <Sidebar />
          <div className="outlet-md">
            <Outlet />
          </div>
        </div>
        <div className="layout-sm">
          <Outlet />
        </div>
      </div>
    )
  }
  return (
    <Router>
      <Routes>
        {
          userLoggedIn ?

            <Route element={<Layout />}>
              <Route index path="/" element={<Home siteDataArray={data} map={mapData} />} />
            </Route> :
            <Route>
              <Route index path="/" element={<Login userLoggedIn={userLoggedIn} />} />
            </Route>
        }
      </Routes>
    </Router>
  )
}

export default App
