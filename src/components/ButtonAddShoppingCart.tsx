import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

const ButtonAddShoppingCart = () => {
    return (
        <Button variant={"secondary"} className="rounded-full text-xs">
            <ShoppingCart />
            Añadir al carrito
        </Button>
    );
};

export default ButtonAddShoppingCart;
