"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { products as baseProducts } from "@/constant/products";

import CardRecomended from "@/components/CardRecomended";

// Definir un tipo extendido para los productos recomendados
interface ProductRecomendado extends ReturnType<typeof completarProducto> {}

const steps = [
    {
        title: "Seleccion de mascota",
    },
    {
        title: "Informacion de la mascota",
    },
];
const completarProducto = (producto: any) => {
    // Ejemplo de reglas para complementar los productos
    if (producto.name.toLowerCase().includes("perro")) {
        return {
            ...producto,
            especie: "perro",
            edades: ["Adulto (1-7 años)", "Senior (7+ años)"],
            tamanos: ["Pequeño", "Mediano", "Grande"],
            pesos: ["< 5kg", "5-15kg", "15-30kg", "> 30kg"],
            razas: ["Labrador", "Pug", "Pastor Alemán", "Otro"],
        };
    }
    if (producto.name.toLowerCase().includes("gato")) {
        return {
            ...producto,
            especie: "gato",
            edades: ["Adulto (1-7 años)", "Senior (7+ años)"],
            tamanos: ["Pequeño", "Mediano"],
            pesos: ["< 2kg", "2-5kg", "5-10kg", "> 10kg"],
            razas: ["Siames", "Persa", "Siberiano", "Otro"],
        };
    }
    // Snacks o productos generales para ambos
    return {
        ...producto,
        especie: "ambos",
        edades: ["Cachorro (0-1 año)", "Adulto (1-7 años)", "Senior (7+ años)"],
        tamanos: ["Pequeño", "Mediano", "Grande"],
        pesos: [
            "< 5kg",
            "5-15kg",
            "15-30kg",
            "> 30kg",
            "< 2kg",
            "2-5kg",
            "5-10kg",
            "> 10kg",
        ],
        razas: [
            "Labrador",
            "Pug",
            "Pastor Alemán",
            "Siames",
            "Persa",
            "Siberiano",
            "Otro",
        ],
    };
};
const Page = () => {
    const [pet, setPet] = useState<"perro" | "gato" | null>(null);
    const [step, setStep] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState<
        ProductRecomendado[]
    >([]);
    const [selectedTags, setSelectedTags] = useState({
        raza: "",
        edad: "",
        tamano: "",
        peso: "",
    });

    useEffect(() => {
        if (pet) {
            setStep(1);
        }
    }, [pet]);
    if (filteredProducts.length > 0) {
        return (
            <div className="mt-8 space-y-6 w-4/5 mx-auto">
                <h3 className="text-xl font-semibold mb-4">
                    Productos recomendados para tu mascota
                </h3>
                <div className="flex flex-wrap gap-4">
                    {filteredProducts.map((product) => (
                        <CardRecomended
                            key={product.id}
                            product={product}
                            filterTags={selectedTags}
                        />
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="mx-auto w-4/5">
            <h2 className="text-2xl font-bold">Productos Recomendados</h2>
            <Card>
                {" "}
                <CardContent>
                    <div className="flex gap-4">
                        {steps.map((item, index) => (
                            <div key={index}>
                                <span
                                    className={`
                                    ${
                                        step === index
                                            ? "bg-primary text-white"
                                            : "bg-gray-300 text-gray-500"
                                    } px-2 rounded-full`}
                                >
                                    {index + 1}
                                </span>
                                {item.title}
                            </div>
                        ))}
                    </div>
                    {step === 0 && (
                        <Step0 selected={pet} setSelected={setPet} />
                    )}
                    {step === 1 && (
                        <Step1
                            selected={pet}
                            setSelected={setPet}
                            setStep={setStep}
                            onRecommend={setFilteredProducts}
                            setSelectedTags={setSelectedTags}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

const Step0 = ({
    selected,
    setSelected,
}: {
    selected: "perro" | "gato" | null;
    setSelected: (value: "perro" | "gato" | null) => void;
}) => {
    return (
        <>
            <h3>Selecciona el tipo de mascota</h3>
            <div className="flex gap-4  p-4">
                <div
                    onClick={() => setSelected("perro")}
                    className={`${
                        selected === "perro"
                            ? "border-2 border-blue-500 rounded-3xl p-4"
                            : "border-2 border-gray-300 rounded-3xl p-4"
                    }`}
                >
                    <Image
                        src={"/perroJoy.png"}
                        alt="perroJoy"
                        width={100}
                        height={100}
                    />
                    <p>Perro</p>
                </div>
                <div
                    onClick={() => setSelected("gato")}
                    className={`${
                        selected === "gato"
                            ? "border-2 border-blue-500 rounded-3xl p-4"
                            : "border-2 border-gray-300 rounded-3xl p-4"
                    }`}
                >
                    <Image
                        src={"/gatoJoy.png"}
                        alt="gatoJoy"
                        width={100}
                        height={100}
                    />
                    <p>Gato</p>
                </div>
            </div>
        </>
    );
};
const Step1 = ({
    selected,
    setSelected,
    setStep,
    onRecommend,
    setSelectedTags,
}: {
    selected: "perro" | "gato" | null;
    setSelected: (value: "perro" | "gato" | null) => void;
    setStep: (value: number) => void;
    onRecommend: (products: ProductRecomendado[]) => void;
    setSelectedTags: (tags: {
        raza: string;
        edad: string;
        tamano: string;
        peso: string;
    }) => void;
}) => {
    // Ejemplo de opciones, puedes reemplazar por datos reales
    const razasPerros = ["Labrador", "Pug", "Pastor Alemán", "Otro"];
    const razasGatos = ["Siames", "Persa", "Siberiano", "Otro"];
    const edades = [
        "Cachorro (0-1 año)",
        "Adulto (1-7 años)",
        "Senior (7+ años)",
    ];
    const tamanos = ["Pequeño", "Mediano", "Grande"];
    const pesosPerros = ["< 5kg", "5-15kg", "15-30kg", "> 30kg"];
    const pesosGatos = ["< 2kg", "2-5kg", "5-10kg", "> 10kg"];

    const [raza, setRaza] = useState("");
    const [edad, setEdad] = useState("");
    const [tamano, setTamano] = useState("");
    const [peso, setPeso] = useState("");

    const handleConfirm = () => {
        // Filtrar productos según los criterios seleccionados
        const productosCompletos = baseProducts.map(completarProducto);
        const filtrados = productosCompletos.filter((p) => {
            if (selected && p.especie !== "ambos" && p.especie !== selected)
                return false;
            if (raza && p.razas && !p.razas.includes(raza)) return false;
            if (edad && p.edades && !p.edades.includes(edad)) return false;
            if (tamano && p.tamanos && !p.tamanos.includes(tamano))
                return false;
            if (peso && p.pesos && !p.pesos.includes(peso)) return false;
            return true;
        });
        onRecommend(filtrados as ProductRecomendado[]);
        setSelectedTags({ raza, edad, tamano, peso });
    };

    return (
        <div className="bg-blue-100 p-6 rounded-xl mt-4">
            <h3>Responde las siguientes preguntas</h3>
            <div className="mb-3">
                <label className="font-semibold">
                    Raza de tu {selected === "perro" ? "perro" : "gato"}
                </label>
                <Select value={raza} onValueChange={(value) => setRaza(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                        {selected === "perro"
                            ? razasPerros.map((r) => (
                                  <SelectItem key={r} value={r}>
                                      {r}
                                  </SelectItem>
                              ))
                            : razasGatos.map((r) => (
                                  <SelectItem key={r} value={r}>
                                      {r}
                                  </SelectItem>
                              ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-3">
                <label className="font-semibold">
                    Edad de tu {selected === "perro" ? "perro" : "gato"}
                </label>
                <Select value={edad} onValueChange={(value) => setEdad(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                        {edades.map((e) => (
                            <SelectItem key={e} value={e}>
                                {e}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-3">
                <label className="font-semibold">
                    Tamaño de tu {selected === "perro" ? "perro" : "gato"}
                </label>
                <Select
                    value={tamano}
                    onValueChange={(value) => setTamano(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                        {tamanos.map((t) => (
                            <SelectItem key={t} value={t}>
                                {t}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-3">
                <label className="font-semibold">
                    Peso de tu {selected === "perro" ? "perro" : "gato"}
                </label>
                <Select value={peso} onValueChange={(value) => setPeso(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                        {pesosPerros.map((p) => (
                            <SelectItem key={p} value={p}>
                                {p}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex gap-2 justify-between">
                <Button
                    variant={"outline"}
                    className="r-0 ml-auto  mt-4 rounded-full "
                    onClick={() => setStep(0)}
                >
                    Volver
                </Button>
                <Button
                    variant={"secondary"}
                    className="r-0 ml-auto  mt-4 rounded-full "
                    onClick={handleConfirm}
                >
                    Confirmar
                </Button>
            </div>
        </div>
    );
};
export default Page;
