
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Check } from "lucide-react";
import { locations as initialLocations } from "@/constant/locations";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import dynamic from "next/dynamic";
import { Label } from "./ui/label";

const MapaSelector = dynamic(() => import("./MapaSelector"), { ssr: false });

export default function LocationCards() {
    const [direcciones, setDirecciones] = useState(initialLocations);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(
        null
    );
    const [openUbicacion, setOpenUbicacion] = useState(false);
    const [selectedLat, setSelectedLat] = useState(-17.7833);
    const [selectedLng, setSelectedLng] = useState(-63.1821);
    const mapaRef = useRef<{ current: unknown } | null>(null);
    const [direccionLegible, setDireccionLegible] = useState<string>("");
    const saveDirection = async () => {
        const nuevaDireccion = {
            id: Date.now().toString(),
            name: direccionLegible,
            address: direccionLegible,
            image: "/ubicacion1.png",
        };
        const nuevasDirecciones = [...direcciones, nuevaDireccion];
        setDirecciones(nuevasDirecciones);
        localStorage.setItem("direcciones", JSON.stringify(nuevasDirecciones));
        setOpenUbicacion(false);
    };
    const obtenerDireccion = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            setDireccionLegible(data.address.road || "Dirección no encontrada");
        } catch {
            setDireccionLegible("Error al obtener dirección");
        }
    };

    useEffect(() => {
        obtenerDireccion(selectedLat, selectedLng);
    }, [selectedLat, selectedLng]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Selecciona tu ubicación de entrega
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {direcciones.map((location) => (
                    <Card
                        key={location.id}
                        className={`relative cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                            selectedLocation === location.id
                                ? "ring-2 ring-blue-500 bg-blue-50"
                                : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedLocation(location.id)}
                    >
                        <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                                    <Image
                                        src={
                                            location.image || "/placeholder.svg"
                                        }
                                        alt={location.name}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-medium text-sm text-gray-900 truncate">
                                            {location.name}
                                        </h3>
                                        {selectedLocation === location.id && (
                                            <Check className="h-4 w-4 text-blue-600 flex-shrink-0 ml-1" />
                                        )}
                                    </div>

                                    <div className="flex items-start gap-1">
                                        <MapPin className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-xs text-gray-600 leading-tight line-clamp-2">
                                            {location.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <Card
                    className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:bg-gray-50 border-2 border-dashed border-gray-300"
                    onClick={() => setOpenUbicacion(true)}
                >
                    <CardContent className="p-3 h-full">
                        <Button
                            variant="ghost"
                            className="w-full h-full flex items-center justify-center gap-3 text-gray-600 hover:text-gray-800 hover:bg-transparent"
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md flex-shrink-0">
                                <Plus className="h-5 w-5" />
                            </div>
                            <div className="text-left flex-1">
                                <p className="text-xs font-medium">
                                    Agregar nueva
                                </p>
                                <p className="text-xs text-gray-500">
                                    ubicación
                                </p>
                            </div>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {selectedLocation && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                        <span className="font-medium">
                            Ubicación seleccionada:
                        </span>{" "}
                        {
                            direcciones.find(
                                (loc) => loc.id === selectedLocation
                            )?.address
                        }
                    </p>
                </div>
            )}
            <Dialog open={openUbicacion} onOpenChange={setOpenUbicacion}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar Nueva Direccion</DialogTitle>
                    </DialogHeader>
                    <div className="py-2 flex flex-col gap-2">
                        <MapaSelector
                            ref={mapaRef}
                            lat={selectedLat}
                            lng={selectedLng}
                            onSelect={(lat, lng) => {
                                setSelectedLat(lat);
                                setSelectedLng(lng);
                            }}
                        />
                        <div className="mt-4 flex w-full gap-5">
                            <div className="w-1/3">
                                <Label>Latitud: {selectedLat.toFixed(5)}</Label>
                                <Label>
                                    Longitud: {selectedLng.toFixed(5)}
                                </Label>
                            </div>
                            <Label className="text-sm w-2/3">
                                Direccion: {direccionLegible}
                            </Label>
                        </div>
                        <Button
                            className="mt-5 w-full m-auto"
                            variant={"secondary"}
                            onClick={saveDirection}
                        >
                            Guardar Direccion
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
