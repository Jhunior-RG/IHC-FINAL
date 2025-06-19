"use client";

import Image from "next/image";
import type { Product as BaseProduct } from "./CardProduct";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import ButtonAddShoppingCart from "./ButtonAddShoppingCart";
import { Check, X } from "lucide-react";

interface Product extends BaseProduct {
    razas?: string[];
    edades?: string[];
    tamanos?: string[];
    pesos?: string[];
}

interface CardRecomendedProps {
    product: Product;
    filterTags?: {
        raza: string;
        edad: string;
        tamano: string;
        peso: string;
    };
}

const CardRecomended = ({ product, filterTags }: CardRecomendedProps) => {
    // Comprobaciones de coincidencia
    const checks = filterTags
        ? [
              {
                  label: "Raza",
                  match:
                      filterTags.raza &&
                      product.razas?.includes(filterTags.raza),
                  value: filterTags.raza,
              },
              {
                  label: "Edad",
                  match:
                      filterTags.edad &&
                      product.edades?.includes(filterTags.edad),
                  value: filterTags.edad,
              },
              {
                  label: "Tamaño",
                  match:
                      filterTags.tamano &&
                      product.tamanos?.includes(filterTags.tamano),
                  value: filterTags.tamano,
              },
              {
                  label: "Peso",
                  match:
                      filterTags.peso &&
                      product.pesos?.includes(filterTags.peso),
                  value: filterTags.peso,
              },
          ]
        : [];
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
                    {checks.length > 0 && (
                        <div className="flex gap-2 flex-wrap mt-2">
                            {checks.map(
                                (item) =>
                                    item.value && (
                                        <Badge
                                            key={item.label} 
                                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                                                ${
                                                    item.match
                                                        ? "bg-neutral-800 text-white"
                                                        : "bg-neutral-100 border border-neutral-800 text-neutral-800"
                                                }
                                            `}
                                        >
                                            {item.match ? (
                                                <Check
                                                    className="mr-1"
                                                />
                                            ) : (
                                                <X className="mr-1" />
                                            )}
                                            {item.label}: {item.value}
                                        </Badge>
                                    )
                            )}
                        </div>
                    )}
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
