import React, { useState } from 'react'
import "./sidebar.scss"
import Divider from '@mui/material/Divider';
import { MdBarChart } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

function Sidebar() {

    const [isSelected, setIsSelected] = useState(1)
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

    const generalOptions = [
        {
            id: 1.1,
            title: 'Settings',
            icon: <IoMdSettings size={"24px"} id="chart" />

        }
    ]

    const handleOptions = (id) => {
        setIsSelected(id)
    }
    return (
        <div className='sidebar__container'>
            <div className='sidebar__logo'>
                <Logo color={'#aedf33'} />
                Logo
            </div>
            <div className='menu__options'>
                <div className='options'>
                    {
                        menuOptions.map(option =>

                            <div className={`option ${isSelected === option.id && 'option-selected'}`} onClick={() => handleOptions(option.id)}>
                                {option.icon}
                                {option.title}
                            </div>
                        )
                    }
                </div>
                <Divider variant="middle" style={{ borderColor: "rgb(233 233 233 / 24%)" }} />

                <div className='options'>
                    {
                        generalOptions.map(option =>

                            <div className={`option ${isSelected === option.id && 'option-selected'}`} onClick={() => handleOptions(option.id)}>
                                {option.icon}
                                {option.title}
                            </div>
                        )
                    }
                </div>
            </div>
            <Divider variant="middle" style={{ borderColor: "rgb(233 233 233 / 24%)" }} />


            <div className='user__login'>
                <CgProfile size={"24px"} />
                User name
            </div>
        </div>
    )
}
import MenuIcon from '../icons/MenuIcon';
import Logo from '../icons/Logo';
import Product from '../icons/Product';
import Transaction from '../icons/Transaction';

export default Sidebar