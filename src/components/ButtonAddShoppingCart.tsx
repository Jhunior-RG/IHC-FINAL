"use client";
import { ShoppingCart } from "lucide-react";
import type React from "react";
import { Button } from "./ui/button";
import type { Product } from "./CardProduct";
import { useCart } from "@/context/CartContext";

const ButtonAddShoppingCart = ({
    product,
    quantity = 1,
}: {
    product?: Product;
    quantity?: number;
}) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!product) return;

        addToCart(product, quantity);
    };

    return (
        <Button
            variant={"secondary"}
            size="sm"
            onClick={handleAddToCart}
            className="flex items-center gap-1 text-xs px-3 py-1.5"
        >
            <ShoppingCart className="w-3 h-3" />
            Agregar al carrito
        </Button>
    );
};

export default ButtonAddShoppingCart;
