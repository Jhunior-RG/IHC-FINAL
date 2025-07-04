"use client";
import { products } from "@/constant/products";
import { Plus } from "lucide-react";
import CardProduct from "./CardProduct";
import { Button } from "./ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
const SectionDiscountedProducts = () => {
    return (
        <div
            style={{ background: "#D5E5F4" }}
            className="w-4/5 mx-auto py-5 flex flex-col gap-5"
        >
            <div className="flex justify-between mt-20">
                <h2 className="text-2xl font-semibold">
                    Productos en descuento
                </h2>
                <Button variant={"secondary"} className="rounded-full text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
                    <Plus className="w-4 h-4 text-white" />
                    Ver más
                </Button>
            </div>
            <Carousel className="">
                <CarouselContent>
                    {products.map((product) => (
                        <CarouselItem
                            key={product.id}
                            className="basis-1/2 md:basis-1/5 m-3"
                        >
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
