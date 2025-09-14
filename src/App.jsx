import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Home from "./pages/Home/Home"
import Header from "./components/Header/Header"
import Sidebar from "./components/sidebar/Sidebar"
import "./App.scss"

function App() {
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
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          {/* <Route path="/:category/list" element={<CategoryList />} /> */}
          {/* <Route path="/:category/:meal/:id" element={<Meal />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
