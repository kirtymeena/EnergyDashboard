import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./TotalViewCard.scss";

// Default export component
export default function TotalViewCard({ title, mapURL }) {

    return (
        <div className="total-card">
            <h3 className="card-title">{title}</h3>

            <div className="card-separator" />

            <div className="donut-wrap">
                <iframe
                    src={mapURL}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}
