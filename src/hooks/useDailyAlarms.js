import { useQuery } from "@tanstack/react-query";

const fetchDailyAlarms = async () => {
    const token = sessionStorage.getItem("token");

    const res = await fetch("/sems/api/alarms_daily.php", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();

    if (Array.isArray(data) && data[0]?.error) {
        throw new Error(data[0].error); // token expired
    }

    return data; // valid object
};

export const useDailyAlarms = () =>
    useQuery({
        queryKey: ["daily-alarms"],
        queryFn: fetchDailyAlarms,

        // 🔁 every 30 min (1800000 ms)
        refetchInterval: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    });