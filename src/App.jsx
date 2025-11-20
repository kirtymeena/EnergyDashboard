import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Home from "./pages/Home/Home"
import Header from "./components/Header/Header"
import Sidebar from "./components/sidebar/Sidebar"
import "./App.scss"
import { useEffect, useState } from "react"
import Login from "./components/Login/Login"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import NotFound from "./components/notFound/NotFound"
import { MdBarChart } from "react-icons/md";
import MenuIcon from "./components/icons/MenuIcon"
import Product from "./components/icons/Product"
import SitePage from "./pages/Home/SitePage"
import Footer from "./components/Footer/Footer"

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [mapData, setMapData] = useState(null)
  const [isSelected, setIsSelected] = useState(1)
  const [selectedLink, setSelectedLink] = useState("Dashboard")
  const [error, setError] = useState(null)
  const menuOptions = [
    {
      id: 1,
      title: 'Dashbaord',
      icon: <MenuIcon />,
      link: ""
    },
    {
      id: 2,
      title: 'Reports',
      icon: <MdBarChart size={"24px"} id="chart" />,
      link: "Reports"
    },
    {
      id: 3,
      title: 'Configuration',
      icon: <Product />,
      link: "Configuration"
    },
  ]

  const handleLogin = async (formData) => {
    console.log(formData)
    //for local
    try {

      const res = await axios.post("/sems/api/login.php", formData)
      console.log(res.data.token)
      if (res.data?.token) {
        sessionStorage.setItem("token", res.data.token)
        setUserLoggedIn(true)
      }
    } catch (err) {
      if (err.status === 401) {
        console.log("error here", err)
        setError("Invalid credentials")
      }
      if (err.status === 500) {
        setError('Server Error')
      }
    }

  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setUserLoggedIn(true)
    }
  }, [])
  const fetchData = async () => {
    try {
      //deployed
      // const res = await axios.get("/api/proxy");

      //local
      const res = await axios.get("/bms/site_view/pull_values_api.php")

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
        {
          section: "map",
          data: data.map
        }
      ];
    } catch (err) {
      console.log(err)
    }
  }


  const { data, isLoading, isError } = useQuery({
    queryKey: ['siteData'],
    queryFn: fetchData,
    refetchInterval: 30 * 60 * 1000, // ⏱️ 30 minutes
    refetchIntervalInBackground: true, // ✅ continues even when tab is inactive
    enabled: userLoggedIn,
  })

  useEffect(() => {
    if (data) {
      const map = data.filter(ele => ele.section === "map")
      setMapData(map[0].data)
    }
  }, [data])

  const Layout = () => {
    return (
      <div className="layout">
        <div className="layout-md">
          <Sidebar menuOptions={menuOptions} isSelected={isSelected} setIsSelected={setIsSelected} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
          <div className="outlet-md">
            <div>
              <Outlet />
            </div>
            <div>
              <Footer />
            </div>
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
              <Route index path="/" element={<Home menuOptions={menuOptions} isSelected={isSelected} setIsSelected={setIsSelected} siteDataArray={data} map={mapData} selectedLink={selectedLink} setSelectedLink={setSelectedLink} setUserLoggedIn={setUserLoggedIn} />} />
              <Route path="/dashboard" element={<SitePage menuOptions={menuOptions} isSelected={isSelected} setIsSelected={setIsSelected} siteDataArray={data} map={mapData} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />} />
              <Route path="/Reports" element={<NotFound />} />
              <Route path="/Configuration" element={<NotFound />} />
            </Route> :
            <Route>
              <Route index path="/" element={<Login userLoggedIn={userLoggedIn} handleSubmit={handleLogin} error={error} />} />
            </Route>
        }
      </Routes>
    </Router>
  )
}

export default App
