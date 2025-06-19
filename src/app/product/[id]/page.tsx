"use client";
import ButtonAddShoppingCart from "@/components/ButtonAddShoppingCart";
import type { Product } from "@/components/CardProduct";
import Review, { type ReviewProps } from "@/components/review";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useEffect, useState } from "react";
const product: Product = {
    id: 1,
    name: "PawFuel Mature Raza Pequeña",
    price: 100,
    image: "/Mature.png",
    tags: ["Mascotas", "Alimentos", "Perros", "Pequeños"],
    stock: 200,
};
const page = () => {
    const [reviews, setReviews] = useState<ReviewProps[]>([]);
    const getReviews = async () => {
        const reviews = await fetch("/reviews.json");
        const reviewsData = await reviews.json();
        setReviews(reviewsData);
    };
    useEffect(() => {
        getReviews();
    }, []);
    return (
        <div>
            <div className="flex justify-center items-center gap-40 py-10 sm:max-w-4/5 mx-auto  ">
                <Image
                    className="h-full "
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                />
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p>PawFuel</p>
                    <div className="flex gap-2 flex-wrap">
                        {product.tags?.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <div>
                            <p className="text-2xl font-bold">
                                Bs. {product.price}
                            </p>
                            <p className="text-sm text-gray-500">
                                {product.stock} en Stock
                            </p>
                        </div>

                        <Card className="w-[250px]">
                            <CardContent className="flex flex-col gap-2">
                                <p className="font-semibold ">Cantidad</p>
                                <Input
                                    type="number"
                                    min={1}
                                    defaultValue={1}
                                    max={product.stock}
                                />
                                <ButtonAddShoppingCart />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="description" className="w-4/5 mx-auto pb-5">
                <TabsList className="bg-white">
                    <TabsTrigger value="description">Descripción</TabsTrigger>
                    <TabsTrigger value="nutrition">Nutrición</TabsTrigger>
                    <TabsTrigger value="similar">Similares</TabsTrigger>
                    <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                </TabsList>
                <TabsContent
                    value="description"
                    className="border-2 rounded-b-4xl rounded-r-4xl p-5"
                >
                    <p>
                        PawFuel Mature raza pequeña es un alimento premium para
                        perros adultos mayores de razas pequeñas.
                    </p>
                    <p className="font-semibold">
                        Su fórmula avanzada aporta los nutrientes esenciales
                        para:
                    </p>
                    <ol className="list-decimal list-inside ml-4">
                        <li className="">
                            Mantener la agilidad y vitalidad diaria.
                        </li>
                        <li className="">
                            Proteger las articulaciones y facilitar la
                            movilidad.
                        </li>
                        <li>Fortalecer el sistema inmunitario.</li>
                        <li>Mejorar la digestión y absorción de nutrientes.</li>
                    </ol>
                    <p className="font-semibold">Beneficios principales</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>
                            Fácil digestión: Ingredientes de alta calidad y
                            prebióticos naturales.
                        </li>
                        <li>
                            Articulaciones fuertes: Con glucosamina y
                            condroitina para el soporte óseo.
                        </li>
                        <li>
                            Huesos sanos: Enriquecido con calcio y fósforo
                            balanceados.
                        </li>
                        <li>
                            Pelaje brillante: Ácidos grasos Omega 3 y 6 para una
                            piel saludable.
                        </li>
                    </ul>
                </TabsContent>
                <TabsContent
                    value="nutrition"
                    className="border-2 rounded-b-4xl rounded-r-4xl p-5 flex"
                >
                    <div className="flex flex-col gap-2 w-1/3">
                        <h3>Valor nutricional (por 100g):</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nutriente</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Proteínas</TableCell>
                                    <TableCell>28%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Grasas</TableCell>
                                    <TableCell>15%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Fibra</TableCell>
                                    <TableCell>4%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Humedad</TableCell>
                                    <TableCell>10%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Minerales</TableCell>
                                    <TableCell>7%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Vitaminas</TableCell>
                                    <TableCell>10%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Calcio</TableCell>
                                    <TableCell>1.5%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Fósforo</TableCell>
                                    <TableCell>1.5%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Omega 3 y 6</TableCell>
                                    <TableCell>1.5%</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div className="w-2/3">
                        <h3 className="font-semibold">
                            Ingredientes principales:
                        </h3>
                        <ul className="list-disc list-inside ml-4">
                            <li>Carne de pollo fresca.</li>
                            <li>Harina integral de arroz.</li>
                            <li>Aceite de salmón.</li>
                            <li>Extracto natual de yuca</li>
                            <li>Pulpa de remolacha.</li>
                            <li>Vitaminas A, D y E.</li>
                        </ul>
                        <h3 className="font-semibold">Beneficios clave:</h3>
                        <ol className="list-decimal list-inside ml-4">
                            <li>
                                Digestión saludable: ingredientes naturales
                                altamente digestibles para una absorción óptima
                                de nutrientes.
                            </li>
                            <li>
                                Articulaciones fuertes: enriquecido con
                                glucosamina y condroitina para mantener la
                                movilidad y vitalidad de tu mascota.
                            </li>
                            <li>
                                Piel y pelaje radiantes: equilibrio ideal de
                                Omega 3 y Omega 6 para un pelaje suave y piel
                                saludable.
                            </li>
                        </ol>
                    </div>
                </TabsContent>
                <TabsContent
                    value="similar"
                    className="border-2 rounded-b-4xl rounded-r-4xl p-5"
                ></TabsContent>
                <TabsContent
                    value="reviews"
                    className="border-2 rounded-b-4xl rounded-r-4xl p-5"
                >
                    <div className="flex flex-col gap-4">
                        {reviews.map((review, index) => (
                            <Review key={index} review={review} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default page;
