"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const MapaSelector = dynamic(() => import("@/components/MapaSelector"), {
    ssr: false,
});
import LocationCards from "@/components/locationCard";

const page = () => {
    const [qrGenerado, setQrGenerado] = useState(false);
    const [openUbicacion, setOpenUbicacion] = useState(false);
    const [openSucursal, setOpenSucursal] = useState(false);
    const qrUrl = "/qr.png";
    const { cart } = useCart();
    const [selectedLat, setSelectedLat] = useState(-17.7833); // Coordenadas por defecto (La Paz)
    const [selectedLng, setSelectedLng] = useState(-63.1821); // Coordenadas por defecto (Santa Cruz)
    const [direccionGuardada, setDireccionGuardada] = useState<string | null>(
        null
    );
    const [direcciones, setDirecciones] = useState([
        {
            id: 1,
            name: "Direccion 1",
            lat: -17.7833,
            lng: -63.1821,
            image: "/direccion1.png",
        },
    ]);
    const [direccionLegible, setDireccionLegible] = useState<string>("");
    const mapaRef = useRef<any>(null);
    useEffect(() => {
        const stored = localStorage.getItem("direcciones");
        if (stored) {
            setDirecciones(JSON.parse(stored));
        }
    }, []);
    const onPay = () => {
        const pedidos = localStorage.getItem("cart");
        alert("Pedido realizado con exito");
    };
    // Función para obtener dirección legible desde lat/lng
    const obtenerDireccion = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            setDireccionLegible(data.address.road || "Dirección no encontrada");
        } catch (error) {
            setDireccionLegible("Error al obtener dirección");
        }
    };

    useEffect(() => {
        obtenerDireccion(selectedLat, selectedLng);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLat, selectedLng]);


    return (
        <div className="flex flex-col py-10">
            <h1 className="text-2xl font-bold text-center pb-10">
                Confirmar Pedido y Realizar Pago
            </h1>
            <Card className="w-4/5  mx-auto">
                <CardContent>
                    <h2 className="text-2xl font-bold">Productos</h2>
                    <div className="flex flex-col gap-2">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between gap-2"
                            >
                                <div className="w-30 p-0 m-0">
                                    <Image
                                        className="h-20 object-contain"
                                        src={item.image}
                                        alt={item.name}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <p className="text font-bold">
                                        {item.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 w-[150px]">
                                    {item.quantity} x Bs. {item.price}
                                </div>
                                <div className="flex flex-col gap-2 w-[100px] text-secondary font-semibold">
                                    Bs. {item.quantity * item.price}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end ">
                        <p className="text-2xl font-bold text-secondary">
                            Total: Bs.{" "}
                            {cart.reduce(
                                (acc, item) => acc + item.price * item.quantity,
                                0
                            )}
                        </p>
                    </div>
                </CardContent>
            </Card>
            <h2 className="text-2xl font-bold text-center py-10">
                Tipo de Entrega
            </h2>
            <Tabs defaultValue="delivery" className="w-4/5 mx-auto pb-5">
                <TabsList className="bg-white">
                    <TabsTrigger value="delivery">A domicilio</TabsTrigger>
                    <TabsTrigger value="pickup">En Sucursal</TabsTrigger>
                </TabsList>
                <TabsContent
                    value="delivery"
                    className="border-2 rounded-b-4xl rounded-r-4xl p-5 flex gap-2"
                >
                    <LocationCards/>                    
                </TabsContent>
                <TabsContent
                    value="pickup"
                    className="border-2 rounded-b-4xl rounded-r-4xl p-5"
                >
                    <p>En Sucursal</p>
                </TabsContent>
            </Tabs>
            <h2 className="text-2xl font-bold text-center py-10">
                Metodo de Pago
            </h2>
            <Tabs defaultValue="tarjeta" className="w-4/5 mx-auto pb-5">
                <TabsList className="bg-white">
                    <TabsTrigger value="tarjeta">Tarjeta</TabsTrigger>
                    <TabsTrigger value="qr">QR</TabsTrigger>
                </TabsList>
                <TabsContent
                    value="tarjeta"
                    className="border-2 rounded-b-4xl rounded-r-4xl p-5 flex gap-5 items-center justify-between"
                >
                    <div className="flex gap-5 flex-col w-full">
                        <div className="flex flex-col gap-2">
                            <Label>Numero de Tarjeta</Label>
                            <Input
                                type="text"
                                placeholder="0123 0123 0123 0123"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Fecha de expiracion</Label>
                            <div className="flex gap-2">
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="MM" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <SelectItem
                                                key={i}
                                                value={`${i + 1}`}
                                            >
                                                {i + 1}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="YY" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <SelectItem
                                                key={i}
                                                value={`${i + 2025}`}
                                            >
                                                {i + 2025}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 flex-col w-full">
                        <div className="flex flex-col gap-2">
                            <Label>Nombre del Titular</Label>
                            <Input type="text" />
                        </div>
                        <div className="flex gap-2 items-center justify-between w-full">
                            <div className="flex flex-col gap-2">
                                <Label>Codigo de Seguridad (CVC/CVV)</Label>
                                <Input type="text" placeholder="123" />
                            </div>
                            <Image
                                src="/cvc.png"
                                alt="CVC"
                                className="w-30 h-20"
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                    <div className="w-4/5 flex justify-center items-center">
                        <Button variant={"secondary"} onClick={onPay}>
                            Pagar
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent
                    value="qr"
                    className="border-2 rounded-b-4xl rounded-r-4xl p-6"
                >
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <p>
                            Escanea el QR para pagar con tu tarjeta de credito o
                            debito.
                        </p>
                        <Image
                            src="/qr.png"
                            alt="QR"
                            width={200}
                            height={200}
                        />
                        <Button variant={"secondary"}>Ya pagué</Button>
                    </div>
                </TabsContent>
            </Tabs>
            
        </div>
    );
};

export default page;
