"use client";
import Image from "next/image";
import ButtonAddShoppingCart from "./ButtonAddShoppingCart";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { Card } from "./ui/card";
import Link from "next/link";

export interface Product {
    id: number;
    name: string;
    price: number;
    priceDiscount?: number;
    image: string;
}
const CardProduct = ({ product }: { product: Product }) => {
    return (
        <>
            <Link href={`/product/${product.id}`}>
                <Card className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center bg-white h-full justify-between relative hover:scale-105">
                    {product.priceDiscount && (
                        <span className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-1 py-6 rotate-[-20deg] rounded-full shadow-lg ">
                            ¡OFERTA!
                        </span>
                    )}
                    <Heart className="absolute top-2 right-2 hover:text-secondary hover:cursor-pointer" />
                    <Image
                        className="object-contain w-full h-40 mb-2"
                        src={product.image}
                        alt={product.name}
                        width={150}
                        height={150}
                    />
                    <h3 className="text-center text-sm ">{product.name}</h3>
                    {product.priceDiscount ? (
                        <div className="text-primary font-bold">
                            <span className="text-gray-500 line-through ">
                                Bs. {product.price}
                            </span>
                            {" " + product.priceDiscount}
                        </div>
                    ) : (
                        <p className="text-primary font-bold">
                            Bs. {" " + product.price}
                        </p>
                    )}

                    <ButtonAddShoppingCart />
                </Card>
            </Link>
        </>
    );
};

export default CardProduct;
