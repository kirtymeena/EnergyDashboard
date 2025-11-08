import "./bar.scss"
import Snackbar from '@mui/material/Snackbar';
import { MdBarChart } from "react-icons/md";
import MenuIcon from "../icons/MenuIcon";
import Product from "../icons/Product";
import Transaction from "../icons/Transaction";
import { useState } from "react";
import { Link } from "react-router";
function Bar({ menuOptions, isSelected, setIsSelected, selectedLink, setSelectedLink }) {
    // const [isSelected, setIsSelected] = useState(1)
    const handleOptions = (id, title) => {
        setIsSelected(id)
        setSelectedLink(title)
    }
    return (
        <div className='snackbtn'>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={true}
                message={
                    <div className="snackbar__content">
                        {
                            menuOptions.map(option =>
                                <Link to={option.link} className={`option ${isSelected === option.id && 'option-selected'}`} onClick={() => handleOptions(option.id, option.title)}>
                                    {option.icon}
                                </Link>
                            )}
                    </div>
                }
                key={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </div>
    )
}

export default Bar