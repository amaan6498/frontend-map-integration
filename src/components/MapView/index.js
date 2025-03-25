import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const API_URL = "https://map-integration-api.onrender.com/api/map";

const MapView = () => {
  const [mapBounds, setMapBounds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const token = Cookies.get("token");

        if (!token) {
          throw new Error("Authentication required. Please log in.");
        }

        const response = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch map data");
        }

        const data = await response.json();
        setMapBounds(data.bounds);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  if (loading) return <p>Loading map...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          height: "500px",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MapContainer
          bounds={mapBounds}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
