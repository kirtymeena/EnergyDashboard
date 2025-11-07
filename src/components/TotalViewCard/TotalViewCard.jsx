import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./TotalViewCard.scss";

// Default export component
export default function TotalViewCard({ title, content, centerText, btn }) {

    return (
        <div className="total-card">
            <h3 className="card-title">{title}</h3>

            <div className="card-separator" />

            <div className="donut-wrap">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.485115716151!2d77.048187!3d28.555191999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b86c10b12cf%3A0xa6d41303342b088c!2sYashobhoomi%20Convention%20Centre!5e0!3m2!1sen!2sin!4v1759850387760!5m2!1sen!2sin"
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
