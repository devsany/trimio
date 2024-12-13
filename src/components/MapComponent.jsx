import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ latitude, longitude }) => {
  const position = [latitude, longitude]; // Latitude and Longitude of the location

  return (
    <MapContainer
      center={position}
      zoom={13}
      className="w-[75%] h-[100px] md:w-[25%] md:h-[100px]"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Latitude: {latitude} <br /> Longitude: {longitude}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
