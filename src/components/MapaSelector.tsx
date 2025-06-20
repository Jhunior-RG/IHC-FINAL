import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import html2canvas from "html2canvas";
import { renderToStaticMarkup } from "react-dom/server";

// Fix para el icono de marcador de Leaflet en React
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Image from "next/image";

delete (L.Icon.Default.prototype as { _getIconUrl?: string })._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

interface MapaSelectorProps {
    onSelect: (lat: number, lng: number) => void;
    lat: number;
    lng: number;
    route?: [number, number][];
    truckPosition?: [number, number];
}

function LocationMarker({ onSelect, lat, lng }: MapaSelectorProps) {
    const map = useMapEvents({
        click(e) {
            onSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    useEffect(() => {
        map.setView([lat, lng], map.getZoom());
    }, [lat, lng, map]);
    return <Marker position={[lat, lng] as [number, number]}></Marker>;
}

const truckIcon = new L.DivIcon({
    html: renderToStaticMarkup(
        <Image src={"/truck.png"} width={32} height={32} alt="truck" />
    ),
    className: "truck-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

const MapaSelector = forwardRef(function MapaSelector(
    { onSelect, lat, lng, route, truckPosition }: MapaSelectorProps,
    ref
) {
    const mapDivRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        async captureMiniatura() {
            if (mapDivRef.current) {
                const canvas = await html2canvas(mapDivRef.current, {
                    width: 100,
                    height: 100,
                    x: mapDivRef.current.offsetWidth / 2 - 50,
                    y: mapDivRef.current.offsetHeight / 2 - 50,
                });
                return canvas.toDataURL("image/png");
            }
            return null;
        },
    }));

    return (
        <div
            className="h-96 w-full border-2 rounded-xl overflow-hidden"
            ref={mapDivRef}
            style={{ background: "#fff" }}
        >
            <MapContainer
                center={[lat, lng]}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker onSelect={onSelect} lat={lat} lng={lng} />
                {route && route.length > 1 && (
                    <Polyline positions={route} color="#2563eb" weight={6} />
                )}
                {truckPosition && (
                    <Marker position={truckPosition} icon={truckIcon} />
                )}
            </MapContainer>
        </div>
    );
});

export default MapaSelector;
