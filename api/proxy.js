import axios from "axios";

export default async function handler(req, res) {
    try {
        const response = await axios.get(
            "https://vcind.in/bms/site_view/pull_values_api.php"
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Proxy error:", error.message);
        res.status(500).json({ error: "Failed to fetch data" });
    }
}