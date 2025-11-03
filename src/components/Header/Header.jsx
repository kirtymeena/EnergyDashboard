import Dropdown from "../Dropdown/Dropdown"
import SearchBar from "../searchbar/Searchbar";
import "./header.scss"
import TextField from '@mui/material/TextField';

function Header({ userLoggedIn }) {
    return (
        <div className="header__container" style={{ background: !userLoggedIn ? "rgb(3, 35, 19)" : "white" }}>
            <div className="left__section">
                {/* <Dropdown /> */}
                <p className={`p-bold ${!userLoggedIn && 'p-white'}`}>Demo</p>
            </div>
            <div className="right__section">
                {
                    userLoggedIn &&
                    <SearchBar />
                }
            </div>
        </div>
    )
}

export default Header