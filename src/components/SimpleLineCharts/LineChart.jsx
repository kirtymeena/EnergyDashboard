import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useDailyAlarms } from "../../hooks/useDailyAlarms";

const SimpleLineChart = () => {
    const { data, isLoading, isError, error } = useDailyAlarms();
    if (isLoading) return <p style={{ color: "white" }}>Loading chart...</p>;
    if (isError) return <p style={{ color: "white" }}>{error.message}</p>;

    const dates = Object.keys(data);
    const values = Object.values(data);

    // Convert YYYY-MM-DD → DD Nov
    const formattedDates = dates.map((dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    });

    return (
        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                color: "white",
                minWidth: "100%",
                maxWidth: "400px",
                height: "474px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}
        >
            <h3 style={{ margin: 0, color: "#212121" }}>Alarms — Last 7 Days</h3>
            <p style={{ opacity: 0.8, marginTop: 0, color: "#212121" }}>Total Alarms</p>

            <LineChart
                xAxis={[{ scaleType: "point", data: formattedDates, }]}
                yAxis={[{ label: "No. of Alarms" }]}
                series={[
                    {
                        data: values,
                        color: "#212121",
                        showMark: true,
                        markSize: 6,
                        curve: "smooth", // You can use "smooth" for curves
                    },
                ]}
                width={550}
                height={300}
                grid={{ vertical: true, horizontal: false }}
            />
        </div >
    );
};

export default SimpleLineChart;