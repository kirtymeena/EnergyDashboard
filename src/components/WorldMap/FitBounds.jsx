import { useEffect } from "react";
import {
    useMap
} from "react-leaflet";
function FitBounds({ sites }) {
    const map = useMap();

    useEffect(() => {
        if (!sites || sites.length === 0) return;

        // Filter sites with valid coords
        const validSites = sites.filter(
            (s) =>
                Number(s.latitude) &&
                Number(s.longitude) &&
                !isNaN(s.latitude) &&
                !isNaN(s.longitude)
        );

        if (validSites.length === 0) return;

        const bounds = validSites.map((s) => [
            Number(s.latitude),
            Number(s.longitude),
        ]);

        // Ensure at least 2 points, otherwise Leaflet throws error
        if (bounds.length === 1) {
            map.setView(bounds[0], 10); // zoom to single marker
            return;
        }

        map.fitBounds(bounds, { padding: [40, 40] });
    }, [sites, map]);

    return null;
}

export default FitBounds;