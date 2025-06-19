"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    Package,
    Truck,
    CheckCircle,
    Clock,
    MapPin,
    Calendar,
    Eye,
    RotateCcw,
    Star,
    AlertCircle,
    Phone,
} from "lucide-react";
import Image from "next/image";
import { products } from "@/constant/products";
import SendDetail from "@/components/SendDetail";

const MisPedidos = () => {
    const [pedidosEnCurso] = useState([
        {
            id: "PF-2024-001",
            fecha: "2024-01-20",
            estado: "en-camino",
            total: 245.5,
            estimadoEntrega: "2024-01-22",
            direccionEntrega: "Calle 25 de mayo #123, Zona Centro, Cochabamba",
            productos: [
                {
                    producto: products[0],
                    cantidad: 2,
                    precioUnitario: 80,
                },
                {
                    producto: products[3],
                    cantidad: 1,
                    precioUnitario: 80,
                },
            ],
            tracking: [
                {
                    estado: "confirmado",
                    fecha: "2024-01-20 10:30",
                    completado: true,
                },
                {
                    estado: "preparando",
                    fecha: "2024-01-20 14:15",
                    completado: true,
                },
                {
                    estado: "en-camino",
                    fecha: "2024-01-21 09:00",
                    completado: true,
                },
                { estado: "entregado", fecha: "", completado: false },
            ],
        },
        {
            id: "PF-2024-002",
            fecha: "2024-01-21",
            estado: "preparando",
            total: 160.0,
            estimadoEntrega: "2024-01-23",
            direccionEntrega: "Parque Fidel Anze #456, Norte, Cochabamba",
            productos: [
                {
                    producto: products[1],
                    cantidad: 2,
                    precioUnitario: 80,
                },
            ],
            tracking: [
                {
                    estado: "confirmado",
                    fecha: "2024-01-21 11:20",
                    completado: true,
                },
                {
                    estado: "preparando",
                    fecha: "2024-01-21 15:30",
                    completado: true,
                },
                { estado: "en-camino", fecha: "", completado: false },
                { estado: "entregado", fecha: "", completado: false },
            ],
        },
    ]);

    const [pedidosPasados] = useState([
        {
            id: "PF-2024-003",
            fecha: "2025-05-15",
            estado: "entregado",
            total: 240.0,
            fechaEntrega: "2025-06-29",
            direccionEntrega: "Av. Ballivián #123, Zona Sur, La Paz",
            calificacion: 5,
            productos: [
                {
                    producto: products[2],
                    cantidad: 3,
                    precioUnitario: 80,
                },
            ],
        },
        {
            id: "PF-2024-004",
            fecha: "2024-01-10",
            estado: "entregado",
            total: 320.0,
            fechaEntrega: "2025-07-01",
            direccionEntrega: "Av. Ballivián #123, Zona Sur, La Paz",
            calificacion: 4,
            productos: [
                {
                    producto: products[0],
                    cantidad: 2,
                    precioUnitario: 80,
                },
                {
                    producto: products[1],
                    cantidad: 2,
                    precioUnitario: 80,
                },
            ],
        },
        {
            id: "PF-2024-005",
            fecha: "2024-01-05",
            estado: "cancelado",
            total: 160.0,
            motivoCancelacion: "Producto agotado",
            direccionEntrega: "Av. Ballivián #123, Zona Sur, La Paz",
            productos: [
                {
                    producto: products[3],
                    cantidad: 2,
                    precioUnitario: 80,
                },
            ],
        },
    ]);

    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case "confirmado":
                return "bg-blue-100 text-blue-800";
            case "preparando":
                return "bg-yellow-100 text-yellow-800";
            case "en-camino":
                return "bg-purple-100 text-purple-800";
            case "entregado":
                return "bg-green-100 text-green-800";
            case "cancelado":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getEstadoIcon = (estado: string) => {
        switch (estado) {
            case "confirmado":
                return <CheckCircle className="h-4 w-4" />;
            case "preparando":
                return <Package className="h-4 w-4" />;
            case "en-camino":
                return <Truck className="h-4 w-4" />;
            case "entregado":
                return <CheckCircle className="h-4 w-4" />;
            case "cancelado":
                return <AlertCircle className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${
                    i < rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                }`}
            />
        ));
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Mis Pedidos
                </h1>
                <p className="text-gray-600 mt-2">
                    Rastrea y gestiona todos tus pedidos
                </p>
            </div>

            <Tabs defaultValue="en-curso" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                        value="en-curso"
                        className="flex items-center gap-2"
                    >
                        <Truck className="h-4 w-4" />
                        Pedidos en Curso ({pedidosEnCurso.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="pasados"
                        className="flex items-center gap-2"
                    >
                        <Package className="h-4 w-4" />
                        Pedidos Pasados ({pedidosPasados.length})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="en-curso">
                    <div className="space-y-6">
                        {pedidosEnCurso.map((pedido) => (
                            <Card key={pedido.id} className="overflow-hidden">
                                <CardHeader className="bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">
                                                Pedido #{pedido.id}
                                            </CardTitle>
                                            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                                <Calendar className="h-4 w-4" />
                                                Realizado el{" "}
                                                {new Date(
                                                    pedido.fecha
                                                ).toLocaleDateString("es-ES")}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <Badge
                                                className={getEstadoColor(
                                                    pedido.estado
                                                )}
                                            >
                                                {getEstadoIcon(pedido.estado)}
                                                <span className="ml-1 capitalize">
                                                    {pedido.estado.replace(
                                                        "-",
                                                        " "
                                                    )}
                                                </span>
                                            </Badge>
                                            <p className="text-lg font-bold mt-1">
                                                Bs. {pedido.total}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6">
                                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-blue-900">
                                                    Dirección de Entrega
                                                </h4>
                                                <p className="text-blue-700">
                                                    {pedido.direccionEntrega}
                                                </p>
                                                <p className="text-sm text-blue-600 mt-1">
                                                    Entrega estimada:{" "}
                                                    {new Date(
                                                        pedido.estimadoEntrega
                                                    ).toLocaleDateString(
                                                        "es-ES"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tracking */}
                                    <div className="mb-6">
                                        <h4 className="font-medium mb-4">
                                            Estado del Pedido
                                        </h4>
                                        <div className="flex items-center justify-between relative">
                                            {pedido.tracking.map(
                                                (step, index) => (
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
                                                            {getEstadoIcon(
                                                                step.estado
                                                            )}
                                                        </div>
                                                        <p
                                                            className={`text-xs mt-2 text-center ${
                                                                step.completado
                                                                    ? "text-green-600"
                                                                    : "text-gray-500"
                                                            }`}
                                                        >
                                                            {step.estado
                                                                .replace(
                                                                    "-",
                                                                    " "
                                                                )
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                step.estado
                                                                    .replace(
                                                                        "-",
                                                                        " "
                                                                    )
                                                                    .slice(1)}
                                                        </p>
                                                        {step.fecha && (
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                {new Date(
                                                                    step.fecha
                                                                ).toLocaleDateString(
                                                                    "es-ES"
                                                                )}
                                                            </p>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                            {/* Línea de conexión */}
                                            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                                                <div
                                                    className="h-full bg-green-500 transition-all duration-300"
                                                    style={{
                                                        width: `${
                                                            (pedido.tracking.filter(
                                                                (s) =>
                                                                    s.completado
                                                            ).length -
                                                                1) *
                                                            (100 /
                                                                (pedido.tracking
                                                                    .length -
                                                                    1))
                                                        }%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="font-medium">
                                            Productos ({pedido.productos.length}
                                            )
                                        </h4>
                                        {pedido.productos.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4 p-3 border rounded-lg"
                                            >
                                                <Image
                                                    src={
                                                        item.producto.image ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={item.producto.name}
                                                    width={60}
                                                    height={60}
                                                    className="rounded-md object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h5 className="font-medium">
                                                        {item.producto.name}
                                                    </h5>
                                                    <p className="text-sm text-gray-600">
                                                        Cantidad:{" "}
                                                        {item.cantidad}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Bs.{" "}
                                                        {item.precioUnitario}{" "}
                                                        c/u
                                                    </p>
                                                </div>
                                                <p className="font-medium">
                                                    Bs.{" "}
                                                    {item.cantidad *
                                                        item.precioUnitario}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-3 mt-6 pt-4 border-t">
                                        <SendDetail />
                                        <Button variant="outline" size="sm">
                                            <Phone className="h-4 w-4 mr-2" />
                                            Contactar Soporte
                                        </Button>
                                        {pedido.estado === "confirmado" && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                            >
                                                Cancelar Pedido
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="pasados">
                    <div className="space-y-6">
                        {pedidosPasados.map((pedido) => (
                            <Card key={pedido.id} className="overflow-hidden">
                                <CardHeader className="bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">
                                                Pedido #{pedido.id}
                                            </CardTitle>
                                            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                                <Calendar className="h-4 w-4" />
                                                Realizado el{" "}
                                                {new Date(
                                                    pedido.fecha
                                                ).toLocaleDateString("es-ES")}
                                            </p>
                                            {pedido.fechaEntrega && (
                                                <p className="text-sm text-green-600 flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4" />
                                                    Entregado el{" "}
                                                    {new Date(
                                                        pedido.fechaEntrega
                                                    ).toLocaleDateString(
                                                        "es-ES"
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <Badge
                                                className={getEstadoColor(
                                                    pedido.estado
                                                )}
                                            >
                                                {getEstadoIcon(pedido.estado)}
                                                <span className="ml-1 capitalize">
                                                    {pedido.estado}
                                                </span>
                                            </Badge>
                                            <p className="text-lg font-bold mt-1">
                                                Bs. {pedido.total}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6">
                                    <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4" />
                                        {pedido.direccionEntrega}
                                    </div>
                                    {pedido.estado === "entregado" &&
                                        pedido.calificacion && (
                                            <div className="mb-4 flex items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    Tu calificación:
                                                </span>
                                                <div className="flex">
                                                    {renderStars(
                                                        pedido.calificacion
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    {pedido.estado === "cancelado" &&
                                        pedido.motivoCancelacion && (
                                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                                <p className="text-sm text-red-800">
                                                    <strong>
                                                        Motivo de cancelación:
                                                    </strong>{" "}
                                                    {pedido.motivoCancelacion}
                                                </p>
                                            </div>
                                        )}
                                    <div className="space-y-3">
                                        <h4 className="font-medium">
                                            Productos ({pedido.productos.length}
                                            )
                                        </h4>
                                        {pedido.productos.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4 p-3 border rounded-lg"
                                            >
                                                <Image
                                                    src={
                                                        item.producto.image ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={item.producto.name}
                                                    width={60}
                                                    height={60}
                                                    className="rounded-md object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h5 className="font-medium">
                                                        {item.producto.name}
                                                    </h5>
                                                    <p className="text-sm text-gray-600">
                                                        Cantidad:{" "}
                                                        {item.cantidad}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Bs.{" "}
                                                        {item.precioUnitario}{" "}
                                                        c/u
                                                    </p>
                                                </div>
                                                <p className="font-medium">
                                                    Bs.{" "}
                                                    {item.cantidad *
                                                        item.precioUnitario}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-3 mt-6 pt-4 border-t">
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4 mr-2" />
                                            Ver Detalles
                                        </Button>
                                        {pedido.estado === "entregado" && (
                                            <Button variant="outline" size="sm">
                                                <RotateCcw className="h-4 w-4 mr-2" />
                                                Volver a Comprar
                                            </Button>
                                        )}
                                        <Button variant="outline" size="sm">
                                            Descargar Factura
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default MisPedidos;
