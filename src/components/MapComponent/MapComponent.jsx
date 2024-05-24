import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./MapComponent.css";
import "leaflet/dist/leaflet.css";
import icon from "../../assets/images/icon-location.svg";

const MapComponent = ({ coordinates }) => {
  const customIcon = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(46, 56),
    className: "leaflet-div-icon",
  });

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={13}
      style={{
        height: "100%",
        width: "100%",
        minHeight: "400px",
      }}
      key={`${coordinates.lat}-${coordinates.lng}`}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={[coordinates.lat, coordinates.lng]}
        icon={customIcon}
        interactive={false}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
