// import Dropdown from "../Dropdown/Dropdown"
// import SearchBar from "../searchbar/Searchbar";
import "./header.scss"
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { Link } from "react-router";
import vci from "../icons/vci.png";
import ranext from "../icons/ranext.png"
function Header({ userLoggedIn, selectedLink, setUserLoggedIn }) {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div className="header__container" style={{ background: userLoggedIn ? "rgb(3, 35, 19)" : "white" }}>
            <div className="left__section">
                <img src={vci} alt="logo" width="25px" height="20px" />
                <p className={`p-bold ${userLoggedIn && 'p-white'}`}>{selectedLink}</p>
            </div>
            <div className="right__section">
                {
                    !userLoggedIn &&
                    <>
                        <img src={ranext} alt="ranext" width="50px" height="30px" />
                        <Link to="/" className="logout" onClick={handleLogout}>Logout</Link>
                    </>
                }
            </div>
        </div>
    )
}

export default Header