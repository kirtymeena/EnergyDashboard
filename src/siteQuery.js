import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useSites() {
    return useQuery({
        queryKey: ["sites"],

        queryFn: async () => {
            const res = await axios.get("/sems/api/get_sites.php", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res.data.status === "success") {
                return res.data;
                // return res.data.sites;
            } else {
                return [];
            }
        },

        // ⏳ refresh every 15 minutes (900k ms)
        refetchInterval: 900000,
        refetchIntervalInBackground: true,
        refetchOnReconnect: true,
        // Refetch when window is refocused (optional)
        refetchOnWindowFocus: true,


        // // Cache the data for 15 minutes too
        // staleTime: 900000,
    });
}



// export function useAlarms() {
//     return useQuery({
//         queryKey: ["alarms"],
//         queryFn: async () => {
//             const res = await axios.get("/sems/api/alarms_table.php", {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//                 },
//             });

//             if (res.data.status === "success") {
//                 return res.data;
//                 // return res.data.sites;
//             } else {
//                 return [];
//             }
//         },
//         refetchInterval: 900000,
//         refetchIntervalInBackground: true,
//         refetchOnReconnect: true,
//         refetchOnWindowFocus: true,
//     });
//     // const token = sessionStorage.getItem("token");

//     // const res = await axios.get("/sems/api/alarms_table.php", {
//     //     headers: { Authorization: `Bearer ${token}` },
//     // });

//     // return res.data;
// };