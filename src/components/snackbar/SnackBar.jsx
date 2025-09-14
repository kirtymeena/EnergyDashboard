import "./snackbar.scss"
import Snackbar from '@mui/material/Snackbar';
import { MdBarChart } from "react-icons/md";
import MenuIcon from "../icons/MenuIcon";
import Product from "../icons/Product";
import Transaction from "../icons/Transaction";
import { useState } from "react";
function SnackBar() {
    const [isSelected, setIsSelected] = useState(1)
    const handleOptions = (id) => {
        setIsSelected(id)
    }
    const menuOptions = [
        {
            id: 1,
            title: 'Dashbaord',
            icon: <MenuIcon />
        },
        {
            id: 2,
            title: 'Statistics',
            icon: <MdBarChart size={"24px"} id="chart" />
        },
        {
            id: 3,
            title: 'Products',
            icon: <Product />
        },
        {
            id: 4,
            title: 'Transactions',
            icon: <Transaction />
        }
    ]

    return (
        <div className='snackbtn'>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={true}
                message={
                    <div className="snackbar__content">
                        {
                            menuOptions.map(option =>
                                <div className={`option ${isSelected === option.id && 'option-selected'}`} onClick={() => handleOptions(option.id)}>
                                    {option.icon}
                                </div>
                            )}
                    </div>
                }
                key={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </div>
    )
}

export default SnackBar