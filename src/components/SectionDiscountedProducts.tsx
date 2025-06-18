"use client";
import type { Product } from "./CardProduct";
import CardProduct from "./CardProduct";
import { Button } from "./ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
const products: Product[] = [
    {
        id: 1,
        name: "Vital+ comida para perros sabor carne y vegetales 2kg",
        price: 150,
        priceDiscount: 120,
        image: "/Vital+.png",
    },
    {
        id: 2,
        name: "ZenCat comida para gatos sabor salmon 1.5kg",
        price: 100,
        priceDiscount: 80,
        image: "/ZenCat.png",
    },
    {
        id: 3,
        name: "PawFuel Mature Raza Pequeña",
        price: 200,
        priceDiscount: 130,
        image: "/Mature.png",
    },
    {
        id: 4,
        name: "Vital+ comida para perros sabor carne y vegetales 2kg",
        price: 150,
        priceDiscount: 120,
        image: "/Vital+.png",
    },
    {
        id: 5,
        name: "ZenCat comida para gatos sabor salmon 1.5kg",
        price: 100,
        priceDiscount: 80,
        image: "/ZenCat.png",
    },
    {
        id: 6,
        name: "PawFuel Mature Raza Pequeña",
        price: 200,
        priceDiscount: 130,
        image: "/Mature.png",
    },
];
const SectionDiscountedProducts = () => {
    return (
        <div className="w-4/5 mx-auto py-5 flex flex-col gap-5">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold">Productos en descuento</h2>
                <Button variant={"secondary"} className="rounded-full text-xs">
                    Ver más
                </Button>
            </div>
            <Carousel className="">
                <CarouselContent>
                    {products.map((product) => (
                        <CarouselItem key={product.id} className="basis-1/2 md:basis-1/5 m-3">
                            <CardProduct key={product.id} product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default SectionDiscountedProducts;
