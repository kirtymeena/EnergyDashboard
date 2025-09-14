import Dropdown from "../Dropdown/Dropdown"
import SearchBar from "../searchbar/Searchbar";
import "./header.scss"
import TextField from '@mui/material/TextField';

function Header() {
    return (
        <div className="header__container">
            <div className="left__section">
                {/* <Dropdown /> */}
                <p className="p-bold">Demo</p>
            </div>
            <div className="right__section">
                <SearchBar />
            </div>
        </div>
    )
}

export default Header