import axios from "axios";
import React, { useEffect, useState } from "react";
import "./worldMap.scss"
import {
    MapContainer, TileLayer, Marker, Tooltip,
    Popup, useMap
} from "react-leaflet";
import L from "leaflet";
import FitBounds from "./FitBounds";
import { Link } from "react-router";

function WorldMap(props) {
    const createMarkerIcon = () =>
        L.divIcon({
            html: `<div style="
      width: 12px;
      height: 12px;
      background: #3F51B5;
      border-radius: 50%;
      border: 2px solid white;
      "></div>`,
            className: "",
            iconSize: [12, 12],
        });

    useEffect(() => {
        console.log("props.sites", props?.sites)
    })
    const bounds = props.sites?.map((s) => [s.latitude, s.longitude]);
    return (
        <div className="map__container">
            {/* <div
                style={{
                    width: "100%",
                    height: "450px",
                    borderRadius: "12px",
                    overflow: "hidden",
                }}
            > */}
            <MapContainer
                center={[22.5, 78.9]} // center India
                zoom={5}
                style={{ minWidth: "100%", height: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
                />
                <FitBounds sites={props.sites} />
                {props.sites?.map((site) => (
                    <Marker
                        key={site.id}
                        position={[site.latitude, site.longitude]}
                        icon={createMarkerIcon()}
                    >
                        <Tooltip direction="top" offset={[0, -5]} opacity={1}>
                            {site.site_name}
                        </Tooltip>
                        <Popup>
                            <div style={{ textAlign: "center" }}>
                                <strong>{site.site_name}</strong>
                                <br />
                                <Link to={`/sites/${site?.id}`}
                                    style={{ color: "#3F51B5", textDecoration: "underline" }}
                                >
                                    View Details
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

        </div>
    )
}



export default WorldMap