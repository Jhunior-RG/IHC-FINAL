import React from "react";

import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useCart } from "@/context/CartContext";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import Image from "next/image";

const ShoppingCart = () => {
    const { getCartCount, cart } = useCart();
    const cartCount = getCartCount();
    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <div className="relative transform hover:scale-105 transition-transform duration-200 hover:cursor-pointer">
                        <div className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-200 group-hover:scale-105 transform">
                            <ShoppingCartIcon className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors duration-200" />
                        </div>
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-sm">
                                {cartCount}
                            </span>
                        )}
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-full ">
                    <h2>Carrito de Compras</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Imagen</TableHead>
                                <TableHead className="max-w-[100px]">
                                    Producto
                                </TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart.map((item) => (
                                <TableRow key={item.id} className="text-xs">
                                    <TableCell>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={50}
                                            height={50}
                                        />
                                    </TableCell>
                                    <TableCell className="text-wrap">
                                        {item.name}
                                    </TableCell>
                                    <TableCell>Bs. {item.price}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 justify-center">
                                            <MinusIcon className="w-5 h-5 hover:cursor-pointer bg-primary/10 rounded-full p-1 hover:bg-primary/20" />
                                            {item.quantity}
                                            <PlusIcon className="w-5 h-5 hover:cursor-pointer bg-primary/10 rounded-full p-1 hover:bg-primary/20" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-secondary font-semibold">
                                        Bs. {item.price * item.quantity}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </PopoverContent>
            </Popover>
        </>
    );
};

export default ShoppingCart;
