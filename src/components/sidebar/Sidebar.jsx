import React, { useState } from 'react'
import "./sidebar.scss"
import Divider from '@mui/material/Divider';
import { IoMdSettings } from "react-icons/io";
import Logo from '../icons/Logo';
import { Link } from 'react-router';
import { CgProfile } from "react-icons/cg";


function Sidebar({ menuOptions, isSelected, setIsSelected, selectedLink, setSelectedLink, userData }) {

    const handleOptions = (id, title) => {
        setIsSelected(id)
        setSelectedLink(title)
    }
    return (
        <div className='sidebar__container'>
            <Link to="/" className='sidebar__logo'>
                <Logo color={'#aedf33'} />
                <span className='logo-text'>Veer Connects India</span>
            </Link>
            <div className='menu__options'>
                <div className='options'>
                    {
                        menuOptions?.map(option =>

                            <Link to={`${option.link}`} className={`option ${isSelected === option.id && 'option-selected'}`} onClick={() => handleOptions(option.id, option.title)}>
                                {option.icon}
                                {option.title}
                            </Link>
                        )
                    }
                </div>
                {/* <Divider variant="middle" style={{ borderColor: "rgb(233 233 233 / 24%)" }} /> */}

                {/* <div className='options'>
                    {
                        generalOptions.map(option =>

                            <div className={`option ${isSelected === option.id && 'option-selected'}`} onClick={() => handleOptions(option.id)}>
                                {option.icon}
                                {option.title}
                            </div>
                        )
                    }
                </div> */}
            </div>
            <Divider variant="middle" style={{ borderColor: "rgb(233 233 233 / 24%)" }} />


            <div className='user__login'>
                <CgProfile size={"24px"} />
                {userData}
            </div>
        </div>
    )
}


export default Sidebar