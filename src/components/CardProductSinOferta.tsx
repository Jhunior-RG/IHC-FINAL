"use client";
import Image from "next/image";
import ButtonAddShoppingCart from "./ButtonAddShoppingCart";
import { Heart } from "lucide-react";
import { Card } from "./ui/card";
import Link from "next/link";

export interface Product {
    id: number;
    name: string;
    price: number;
    priceDiscount?: number;
    image: string;
    tags?: string[];
    stock?: number;
    description?: string;
}
const CardProduct = ({ product }: { product: Product }) => {
    return (
        <>
            <Link href={`/product/${product.id}`}>
                <Card className="max-w-60 border rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center bg-white h-full justify-between relative hover:scale-105">
                    <Heart className="absolute top-2 right-2 hover:text-secondary hover:cursor-pointer" />

                    <Image
                        className="object-contain w-full h-40 mb-2"
                        src={product.image}
                        alt={product.name}
                        width={150}
                        height={150}
                    />

                    <h3 className="text-center text-sm">{product.name}</h3>
                    <p className="text-primary font-bold">
                        Bs. {product.price}
                    </p>
                    <ButtonAddShoppingCart />
                </Card>

            </Link>
        </>
    );
};

export default CardProduct;
