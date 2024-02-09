import React, { useEffect } from "react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import "../App.css";

const Map = () => {
  useEffect(() => {
    const map = L.map("map").setView([44.8186, 20.4526], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div id="map-container">
      <div id="map" className="map"></div>
    </div>
  );
};

export default Map;
