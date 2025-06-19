"use client";

import Image from "next/image";
import type { Product } from "./CardProduct";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import ButtonAddShoppingCart from "./ButtonAddShoppingCart";

const CardRecomended = ({ product }: { product: Product }) => {
    return (
        <Card className="relative w-full">
            <CardContent className=" w-full flex">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                />
                <div className="flex flex-col gap-2 w-full">
                    <h3>{product.name}</h3>
                    <div className="flex gap-2 flex-wrap">
                        {product.tags?.map((item) => (
                            <Badge key={item}>{item}</Badge>
                        ))}
                    </div>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
                <Heart className="absolute top-2 right-2 hover:text-secondary hover:cursor-pointer" />
                <div className="flex flex-col gap-2 justify-between">
                    <div></div>
                    <ButtonAddShoppingCart product={product} />
                </div>
            </CardContent>
        </Card>
    );
};

export default CardRecomended;
