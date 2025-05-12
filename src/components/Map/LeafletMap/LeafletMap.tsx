import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";

const center: [number, number] = [50.5064, 30.4983];

// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

export const LeafletMap = () => {
  <MapContainer
    center={center}
    zoom={16}
    style={{ height: "400px", width: "100%" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
    />
    <Marker position={center}>
      <Popup>
        Оболонська набережна, 15, корп. 3<br />
        Київ, Україна
      </Popup>
    </Marker>
  </MapContainer>;
};
export default LeafletMap;
