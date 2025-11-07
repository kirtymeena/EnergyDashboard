import React from 'react'
import "./card.scss";
import { IoBatteryChargingOutline } from "react-icons/io5";


function Cards({ title, data }) {
    return (
        <div className='card__container'>
            <div className='card__title'>
                {
                    title === "Site Info" ? <p style={{ visibility: "hidden" }}>{title}</p> :
                        <strong>{title}</strong>
                }
            </div>
            {title !== "Battery" ?
                <div className='card__body'>
                    {
                        data?.map(content =>
                            <div className='card__inner'>
                                <div className='semi-bold'>{content?.title}</div>
                                <div>{content?.value}</div>
                            </div>
                        )
                    }

                </div>
                :
                <div className='card__body-icon'>
                    {
                        data?.map(content =>
                            <div className='card__inner-icon'>
                                <IoBatteryChargingOutline size={45} color={content.value < 1.2 ? "#991b1b" : "#052e16"} />
                                <small className='semi-bold'>{content?.title}</small>
                                <small>{content?.value} V</small>
                                <small>--°C</small>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default Cards