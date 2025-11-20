// import Dropdown from "../Dropdown/Dropdown"
// import SearchBar from "../searchbar/Searchbar";
import "./header.scss"
import TextField from '@mui/material/TextField';

function Header({ userLoggedIn, selectedLink, setUserLoggedIn }) {
    const handleLogout = () => {
        setUserLoggedIn(false)
        sessionStorage.removeItem('token')
    }
    return (
        <div className="header__container" style={{ background: userLoggedIn ? "rgb(3, 35, 19)" : "white" }}>
            <div className="left__section">
                <p className={`p-bold ${userLoggedIn && 'p-white'}`}>{selectedLink}</p>
            </div>
            <div className="right__section">
                {
                    !userLoggedIn &&
                    <p className="logout" onClick={handleLogout}>Log out</p>
                }
            </div>
        </div>
    )
}

export default Header