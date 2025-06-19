import React from "react";
import { Button } from "./ui/button";
import { Eye, CheckCircle, Package, Truck, Clock } from "lucide-react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "./ui/dialog";
import dynamic from "next/dynamic";

const MapaSelector = dynamic(() => import("./MapaSelector"), { ssr: false });

// Datos de ejemplo para el seguimiento
const tracking = [
    { estado: "confirmado", fecha: "2024-01-20 10:30", completado: true },
    { estado: "preparando", fecha: "2024-01-20 14:15", completado: true },
    { estado: "en-camino", fecha: "2024-01-21 09:00", completado: true },
    { estado: "entregado", fecha: "", completado: false },
];

// Ruta de ejemplo (coordenadas entre dos puntos en Cochabamba)
const route: [number, number][] = [
    [-17.389418545675085, -66.15724072974886], // Inicio
    [-17.392157, -66.156752],
    [-17.39344209821452, -66.16394581200518], // Fin
];
// Posición actual del camión (en la ruta)
const truckPosition: [number, number] = [
    -17.39344209821452, -66.16394581200518,
];

const getEstadoIcon = (estado: string) => {
    switch (estado) {
        case "confirmado":
            return <CheckCircle className="h-4 w-4" />;
        case "preparando":
            return <Package className="h-4 w-4" />;
        case "en-camino":
            return <Truck className="h-4 w-4 " />;
        case "entregado":
            return <CheckCircle className="h-4 w-4" />;
        default:
            return <Clock className="h-4 w-4" />;
    }
};

const SendDetail = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalles del envío
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detalle del pedido</DialogTitle>
                    </DialogHeader>
                    <div className="mb-2 text-center">
                        <span className="font-semibold text-blue-800 block">
                            Tiempo de llegada: 15 min Aprox.
                        </span>
                        <span className="text-gray-700 text-sm block">
                            El repartidor ya esta en camino a entregar el pedido
                        </span>
                    </div>
                    <div className="mb-4">
                        {/* Coordenadas de ejemplo: Cochabamba centro */}
                        <MapaSelector
                            onSelect={() => {}}
                            lat={-17.3895}
                            lng={-66.1568}
                            route={route}
                            truckPosition={truckPosition}
                        />
                    </div>
                    <div className="mb-2">
                        <h4 className="font-medium mb-2">Estado del Pedido</h4>
                        <div className="flex items-center justify-between relative">
                            {tracking.map((step, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center flex-1 relative z-10"
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            step.completado
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-200 text-gray-500"
                                        }`}
                                    >
                                        {getEstadoIcon(step.estado)}
                                    </div>
                                    <p
                                        className={`text-xs mt-2 text-center ${
                                            step.completado
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {step.estado.charAt(0).toUpperCase() +
                                            step.estado.slice(1)}
                                    </p>
                                    {step.fecha && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(
                                                step.fecha
                                            ).toLocaleDateString("es-ES")}
                                        </p>
                                    )}
                                </div>
                            ))}
                            {/* Línea de conexión */}
                            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                                <div
                                    className="h-full bg-green-500 transition-all duration-300"
                                    style={{
                                        width: `${
                                            (tracking.filter(
                                                (s) => s.completado
                                            ).length -
                                                1) *
                                            (100 / (tracking.length - 1))
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SendDetail;
