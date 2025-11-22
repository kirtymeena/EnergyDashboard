import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Home from "./pages/Home/Home"
import Header from "./components/Header/Header"
import Sidebar from "./components/sidebar/Sidebar"
import "./App.scss"
import { useEffect, useState } from "react"
import Login from "./components/Login/Login"
import axios from 'axios'
import NotFound from "./components/notFound/NotFound"
import { MdBarChart } from "react-icons/md";
import MenuIcon from "./components/icons/MenuIcon"
import Product from "./components/icons/Product"
import SitePage from "./pages/Home/SitePage"
import Footer from "./components/Footer/Footer"
import { useSites } from "./siteQuery"
import { useSelector, useDispatch } from "react-redux";
import { getFiberCuts, getSites } from "./store/slices/AlarmSlice"
import Reports from "./components/Reports/Reports"
import { useQuery } from "@tanstack/react-query"
import api from "./api/axios"
import useCheckToken from "./hooks/useCheckToken"


function App() {

  const userLoggedIn = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState(null)
  const [mapData, setMapData] = useState(null)
  const [isSelected, setIsSelected] = useState(1)
  const [selectedLink, setSelectedLink] = useState("Dashboard")
  const [error, setError] = useState(null)
  // const { data: sites = [], isLoading } = useSites();
  const sites = useSelector((state) => state.alarms.sitesMap)
  // const { data: alarms = [] } = useSites()
  const totalSiteCount = useSelector((state) => state.alarms.totalSite)
  const totalFiberCuts = useSelector((state) => state.alarms.totalFibercuts)
  const { data, isLoading, isError } = useCheckToken();

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
    // {
    //   id: 3,
    //   title: 'Configuration',
    //   icon: <Product />,
    //   link: "Configuration"
    // },
  ]
  useEffect(() => {
    if (userLoggedIn) {
      dispatch(getSites())
      dispatch(getFiberCuts())
    }

  }, [dispatch, userLoggedIn])




  // useEffect(() => {
  //   console.log("totalCount", totalCount)
  // }, [totalCount])

  const handleLogin = async (e, formData) => {
    e.preventDefault()
    console.log(formData)
    //for local
    try {
      //deployed
      // const res = await axios.post("/api/login", formData)
      //local
      const res = await axios.post("/sems/api/login.php", formData)
      console.log(res.data.token)
      if (res.data?.token) {
        sessionStorage.setItem("token", res.data.token)
        // setUserLoggedIn(true)
        setUserData(formData?.username)
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

  // useEffect(() => {
  //   if (sessionStorage.getItem('token')) {
  //     setUserLoggedIn(true)
  //   }
  // }, [])




  // useEffect(() => {
  //   axios.get("/sems/api/get_sites.php", {
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //     },
  //   }).then((res) => {
  //     if (res?.data.status === "success") {
  //       console.log(res)
  //       setSites(res.data.sites);
  //     }
  //   })
  //     .catch((err) => console.error(err));
  // }, []);


  const Layout = () => {
    return (
      <div className="layout">
        <div className="layout-md">
          <Sidebar userData={userData} menuOptions={menuOptions} isSelected={isSelected} setIsSelected={setIsSelected} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
          <div className="outlet-md">
            <Header selectedLink={selectedLink} />
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
          !userLoggedIn ?
            <Route>
              <Route index path="/" element={<Login userLoggedIn={userLoggedIn} handleSubmit={handleLogin} error={error} />} />
            </Route> :
            <Route element={<Layout />}>
              <Route index path="/" element={<Home fibercuts={totalFiberCuts} totalSiteCount={totalSiteCount} sites={sites} menuOptions={menuOptions} isSelected={isSelected} setIsSelected={setIsSelected} map={mapData} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />} />
              <Route path="/sites/:siteId" element={<SitePage userLoggedIn={userLoggedIn} menuOptions={menuOptions} isSelected={isSelected} setIsSelected={setIsSelected} map={mapData} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />} />
              <Route path="/Reports" element={<Reports />} />
              <Route path="/Configuration" element={<NotFound />} />
            </Route>

        }
      </Routes>
    </Router>
  )
}

export default App
