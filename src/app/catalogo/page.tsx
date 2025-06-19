import type { Product } from "../../components/CardProductSinOferta";
import CardProduct from "../../components/CardProductSinOferta";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { Plus } from "lucide-react";
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
const page = () => {
    return (
        <>
            <div className="flex items-center justify-between px-10 mt-5">
                <h1 className="text-3xl font-semibold ml-10">Catálogo</h1>
                <Link href="/catalogo/perros">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full text-md flex items-center gap-2"
                    >
                        <ListFilter className="w-4 h-4 text-white" />
                        Filtrar
                    </Button>
                </Link>
            </div>
            <div className="flex items-center justify-between px-10 mt-5">
                <h1 className="text-2xl font-semibold ml-10 mt-5">Alimentos para perro</h1>
                <Link href="/catalogo/perros">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full text-sm flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4 text-white" />
                        Ver más
                    </Button>
                </Link>
            </div>
            <div className="max-w-[80%] mx-auto mt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <CardProduct key={product.id} product={product} />
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between px-10 mt-5">
                <h1 className="text-2xl font-semibold ml-10 mt-5">Alimentos para gato</h1>
                <Link href="/catalogo/perros">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full text-sm flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4 text-white" />
                        Ver más
                    </Button>
                </Link>
            </div>
            <div className="max-w-[80%] mx-auto mt-6 mb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <CardProduct key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
};
export default page;