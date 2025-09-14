import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import "./revenueCard.scss";

const data = [
    { name: "Jan", income: 4000, expenses: 2400 },
    { name: "Feb", income: 3000, expenses: 1398 },
    { name: "Mar", income: 2000, expenses: 9800 },
    { name: "Apr", income: 2780, expenses: 3908 },
    { name: "May", income: 1890, expenses: 4800 },
    { name: "Jun", income: 2390, expenses: 3800 },
];

const RevenueCard = () => {
    return (
        <div className="revenue-card">
            <div className="card-header">
                <h3>Revenue</h3>
                <div className="legend">
                    <span className="income-dot"></span> Income
                    <span className="expenses-dot"></span> Expenses
                </div>
            </div>

            <div className="amount-section">
                <p className="amount">
                    <sup>$</sup>193.000
                </p>
                <p className="growth">
                    <span className="arrow">↑</span> +35% from last month
                </p>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip />
                        <Bar dataKey="income" fill="#0d4933" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="expenses" fill="#8dd83d" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueCard;