import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const response = await axios.post(
            "https://vcind.in/sems/api/login.php",
            req.body,
            {
                headers: {
                    "Content-Type": "application/json", // or form-data if your API expects it
                }
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Login Proxy Error:", error.message);
        res.status(500).json({ error: "Login failed" });
    }
}