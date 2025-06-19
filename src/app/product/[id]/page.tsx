"use client";
import ButtonAddShoppingCart from "@/components/ButtonAddShoppingCart";
import { useParams } from "next/navigation";
import type { Product } from "@/components/CardProduct";
import Review, { type ReviewProps } from "@/components/review";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import user from "@/constant/user";
import { ArrowDown, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { products } from "@/constant/products";
import { reviews } from "@/constant/reviews";
const product: Product = products[0];

const page = () => {
    const { id } = useParams();
    const productId = Number(id);
    const product = products.find((p) => p.id === productId);
    const [sort, setSort] = useState<"latest" | "best" | "worst">("latest");
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>("");
    const [cantidad, setCantidad] = useState<number>(1);
    const [reviewsList, setReviews] = useState(reviews);
    if (!product) {
        return <div className="text-center py-10">Producto no encontrado</div>;
    }
    return (
        <div>
            <div className="flex justify-center items-center gap-40 py-10 sm:max-w-4/5 mx-auto">
                <Image
                    className="h-full"
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
                            <p className="text-2xl font-bold">Bs. {product.price}</p>
                            <p className="text-sm text-gray-500">
                                {product.stock} en Stock
                            </p>
                        </div>
                        <Card className="w-[250px]">
                            <CardContent className="flex flex-col gap-2">
                                <p className="font-semibold">Cantidad</p>
                                <Input
                                    type="number"
                                    min={1}
                                    onChange={(e) =>
                                        setCantidad(Number(e.target.value))
                                    }
                                    value={cantidad}
                                    max={product.stock}
                                />
                                <p className="text-sm font-semibold">
                                    Total:{" "}
                                    <span className="text-secondary">
                                        Bs. {cantidad * product.price}
                                    </span>
                                </p>
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
                    <div className="pb-5">
                        <Card className="rounded-2xl p-2">
                            <CardContent className="flex gap-4 p-0">
                                <Image
                                    className="rounded-full h-15 w-15"
                                    src={user.image}
                                    alt="imagen de perfil"
                                    width={50}
                                    height={50}
                                />
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-bold w-full">
                                            {user.name}
                                        </h3>
                                        <div className="flex w-full justify-center">
                                            {Array.from({ length: rating }).map(
                                                (_, index) => (
                                                    <Star
                                                        key={index}
                                                        onClick={() =>
                                                            setRating(index + 1)
                                                        }
                                                        className="w-5 h-5 text-yellow-500 fill-yellow-500 hover:cursor-pointer hover:text-yellow-500 hover:fill-yellow-500 "
                                                    />
                                                )
                                            )}
                                            {Array.from({
                                                length: 5 - rating,
                                            }).map((_, index) => (
                                                <Star
                                                    key={5 - index}
                                                    onClick={() =>
                                                        setRating(
                                                            index + 1 + rating
                                                        )
                                                    }
                                                    className="w-5 h-5 text-yellow-500 hover:cursor-pointer hover:text-yellow-500 hover:fill-yellow-500"
                                                />
                                            ))}
                                        </div>
                                        <div className="w-full"></div>
                                    </div>
                                    <Input
                                        placeholder="Escribe tu reseña"
                                        className="w-full"
                                        onChange={(e) =>
                                            setReview(e.target.value)
                                        }
                                        value={review}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <div className="flex justify-end gap-2 py-2">
                            <Button className="bg-gray-200 hover:bg-gray-300 text-black">
                                Cancelar
                            </Button>
                            <Button
                                variant={"secondary"}
                                className="bg-secondary hover:bg-secondary/80  text-white"
                                onClick={() => {
                                    setReviews([
                                        ...reviewsList,
                                        {
                                            id: reviewsList.length + 1,
                                            name: user.name,
                                            rating,
                                            description: review,
                                            image: user.image,
                                            date: new Date().toISOString(),
                                        },
                                    ]);
                                }}
                            >
                                Publicar Reseña
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <Button
                                className={`${sort === "latest"
                                        ? "bg-secondary hover:bg-secondary/80  text-white"
                                        : "bg-gray-200 text-black hover:bg-gray-300"
                                    }`}
                                onClick={() => setSort("latest")}
                            >
                                Más Recientes Primero <ArrowDown />
                            </Button>
                            <Button
                                className={`${sort === "best"
                                        ? "bg-secondary hover:bg-secondary/80  text-white"
                                        : "bg-gray-200 text-black hover:bg-gray-300"
                                    }`}
                                onClick={() => setSort("best")}
                            >
                                Mejores Primero <ArrowDown />
                            </Button>
                            <Button
                                className={`${sort === "worst"
                                        ? "bg-secondary hover:bg-secondary/80  text-white"
                                        : "bg-gray-200 text-black hover:bg-gray-300"
                                    }`}
                                onClick={() => setSort("worst")}
                            >
                                Peores Primero <ArrowDown />
                            </Button>
                        </div>
                        {sort === "latest" &&
                            reviewsList
                                .sort(
                                    (a, b) =>
                                        new Date(b.date).getTime() -
                                        new Date(a.date).getTime()
                                )
                                .map((review, index) => (
                                    <Review key={index} review={review} />
                                ))}
                        {sort === "best" &&
                            reviewsList
                                .sort((a, b) => b.rating - a.rating)
                                .map((review, index) => (
                                    <Review key={index} review={review} />
                                ))}
                        {sort === "worst" &&
                            reviewsList
                                .sort((a, b) => a.rating - b.rating)
                                .map((review, index) => (
                                    <Review key={index} review={review} />
                                ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default page;
