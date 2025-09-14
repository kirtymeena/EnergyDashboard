import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    LabelList,
} from "recharts";
import "./salesCard.scss";

const data = [
    { name: "Product Launched", value: 233 },
    { name: "Ongoing Product", value: 23 },
    { name: "Product Sold", value: 482 },
];

const SalesReportCard = () => {
    return (
        <div className="sales-card">
            <div className="card-header">
                <h3>Sales Report</h3>
                <span className="menu">⋮</span>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                    >
                        <XAxis type="number" domain={[0, 400]} axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                        <Bar dataKey="value" fill="#a3e635" radius={[0, 6, 6, 0]}>
                            {/* <LabelList
                                dataKey="value"
                                position="right"
                                formatter={(val) => `(${val})`}
                                style={{ fill: "#ff6b00", fontWeight: 600 }}
                            /> */}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesReportCard;
