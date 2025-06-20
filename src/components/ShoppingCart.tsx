"use client";
import { MinusIcon, PlusIcon, ShoppingCartIcon, Trash2, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useCart, type CartItem } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { useState } from "react";

const ShoppingCart = () => {
    const { getCartCount, cart, addToCart, removeFromCart, clearCart } =
        useCart();
    const cartCount = getCartCount();
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);

    const handleQuantityChange = (item: CartItem, quantity: number) => {
        if (item.quantity <= 1 && quantity === -1) {
            removeFromCart(item.id);
        } else {
            addToCart(item, quantity);
        }
    };

    const handleConfirmRemoveItem = () => {
        if (itemToDelete) {
            removeFromCart(itemToDelete.id);
            setItemToDelete(null);
        }
    };

    const handleClearCart = () => {
        clearCart();
        setShowClearConfirm(false);
    };

    const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="relative transform hover:scale-105 transition-transform duration-200 cursor-pointer">
                        <div className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-200">
                            <ShoppingCartIcon className="h-6 w-6 text-gray-600 hover:text-primary transition-colors duration-200" />
                        </div>
                        {cartCount > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center">
                                {cartCount}
                            </Badge>
                        )}
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-0" align="end">
                    <div className="p-4 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                Carrito de Compras
                            </h2>
                            {cart.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowClearConfirm(true)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Vaciar
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {cart.length === 0 ? (
                            <div className="p-8 text-center">
                                <ShoppingCartIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 mb-2">
                                    Tu carrito está vacío
                                </p>
                                <p className="text-sm text-gray-400">
                                    Agrega productos para comenzar
                                </p>
                            </div>
                        ) : (
                            <div className="p-4 space-y-4">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        {/* Imagen del producto */}
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={
                                                    item.image ||
                                                    "/placeholder.svg"
                                                }
                                                alt={item.name}
                                                width={60}
                                                height={60}
                                                className="rounded-md object-cover"
                                            />
                                        </div>

                                        {/* Información del producto */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-primary font-semibold mt-1">
                                                Bs. {item.price}
                                            </p>
                                        </div>

                                        {/* Controles de cantidad */}
                                        <div className="flex flex-col items-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    setItemToDelete(item)
                                                }
                                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>

                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item,
                                                            -1
                                                        )
                                                    }
                                                    className="h-6 w-6 p-0"
                                                >
                                                    <MinusIcon className="h-3 w-3" />
                                                </Button>

                                                <span className="w-8 text-center text-sm font-medium">
                                                    {item.quantity}
                                                </span>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item,
                                                            1
                                                        )
                                                    }
                                                    className="h-6 w-6 p-0"
                                                >
                                                    <PlusIcon className="h-3 w-3" />
                                                </Button>
                                            </div>

                                            <p className="text-sm font-semibold text-gray-900">
                                                Bs. {item.price * item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {cart.length > 0 && (
                        <>
                            <Separator />
                            <div className="p-4 space-y-4">
                                {/* Resumen del total */}
                                <div className="flex justify-between items-center">
                                    <span className="text-base font-semibold">
                                        Total:
                                    </span>
                                    <span className="text-lg font-bold text-primary">
                                        Bs. {total}
                                    </span>
                                </div>

                                {/* Botones de acción */}
                                <div className="space-y-2">
                                    <Link href="/payment" className="block">
                                        <Button className="w-full" size="lg">
                                            Proceder al Pago
                                        </Button>
                                    </Link>
                                    <Link href="/catalogo" className="block">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Seguir Comprando
                                        </Button>
                                    </Link>
                                </div>

                                {/* Información adicional */}
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">
                                        {cartCount}{" "}
                                        {cartCount === 1
                                            ? "producto"
                                            : "productos"}{" "}
                                        en tu carrito
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </PopoverContent>
            </Popover>

            {/* Dialog de confirmación para vaciar carrito */}
            <Dialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Vaciar Carrito</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de que quieres vaciar tu carrito de
                            compras? Esta acción no se puede deshacer.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowClearConfirm(false)}
                        >
                            Cancelar
                        </Button>
                        <Button variant="destructive" onClick={handleClearCart}>
                            Vaciar Carrito
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog de confirmación para eliminar producto individual */}
            <Dialog
                open={!!itemToDelete}
                onOpenChange={(open) => !open && setItemToDelete(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Eliminar Producto</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de que quieres eliminar &quot;
                            {itemToDelete?.name}&quot; de tu carrito?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setItemToDelete(null)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmRemoveItem}
                        >
                            Eliminar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ShoppingCart;
