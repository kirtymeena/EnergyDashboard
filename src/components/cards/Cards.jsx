import React from 'react'
import "./card.scss";
import { FaArrowTrendUp } from "react-icons/fa6";


function Cards({ type, title, amount, message, icon, number, color }) {
    if (type !== "update")
        return (
            <div className='card__container'>
                <div className='card__title'>
                    <p>{title}</p>
                </div>
                <div className='card__body'>
                    <p><sup>$</sup>{amount}</p>
                </div>
                <div className='card__footer'>
                    <p><span>{icon}</span> <span style={{ color: color }}>{number}</span> {message}</p>
                </div>
            </div >
        )
    return (
        <div className='card__container-dark'>
            <div className='card__title'>
                <span className="dot"></span> Update
            </div>
            <div className='card__body-sm'>
                <p className='p-12'>Feb 4, 2024</p>
                <p className='p-20'>Battery Bank voltage low</p>
            </div>
            <div className='card__footer-alert'>
                see statistics
            </div>
        </div>
    )
}

export default Cards