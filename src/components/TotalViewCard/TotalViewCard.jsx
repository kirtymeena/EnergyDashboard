import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./TotalViewCard.scss";

// Default export component
export default function TotalViewCard({ title, content, centerText, btn }) {

    // const total = 565000;
    const segments = [
        { name: content[0], value: 68, color: "#A8E63A" },
        { name: content[1], value: 23, color: "#2E6E60" },
        { name: content[2], value: 16, color: "#F39E3B" },
    ]

    // recharts expects numbers; we'll use the "value" field as the percentage slice size
    const data = segments.map((s) => ({ name: s.name, value: s.value }));
    // const centerText = formatCount(total);

    return (
        <div className="total-card">
            <h3 className="card-title">{title}</h3>

            <div className="card-separator" />

            <div className="donut-wrap">
                <PieChart width={300} height={300}>
                    <Pie
                        data={data}
                        innerRadius={80}
                        outerRadius={120}
                        startAngle={90}
                        endAngle={450}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {segments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>

                <div className="donut-center">
                    <div className="center-sub">Total Count</div>
                    <div className="center-main">{centerText}</div>
                </div>

                {/* percentage badges positioned absolutely */}
                <div className="badge badge-top-right">{segments[1].value}%</div>
                <div className="badge badge-top-left">{segments[2].value}%</div>
                <div className="badge badge-bottom-left">{segments[0].value}%</div>
            </div>

            <p className="card-tip">{btn}</p>

            <button className="guide-btn">Guide Views</button>

            <div className="legend">
                <div className="legend-item">
                    <span className="legend-color" style={{ background: segments[0].color }} />
                    <span>{content[0]}</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ background: segments[1].color }} />
                    <span>{content[1]}</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ background: segments[2].color }} />
                    <span>{content[2]}</span>
                </div>
            </div>
        </div>
    );
}

// function formatCount(n) {
//     if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
//     if (n >= 1000) return Math.round(n / 1000) + "K";
//     return n.toString();
// }