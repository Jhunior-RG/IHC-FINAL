"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { products as baseProducts } from "@/constant/products";
import CardRecomended from "@/components/CardRecomended";
import {
    Heart,
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Sparkles,
    PawPrint,
    Award,
    Target,
    Zap,
    Search,
} from "lucide-react";
import type { Product } from "@/components/CardProduct";

interface ProductRecomendado extends Product {
    especie: string;
    edades: string[];
    tamanos: string[];
    pesos: string[];
    razas: string[];
}

const steps = [
    {
        title: "Selección de mascota",
        description: "¿Qué tipo de mascota tienes?",
        icon: PawPrint,
    },
    {
        title: "Información de la mascota",
        description: "Cuéntanos más sobre tu compañero",
        icon: Heart,
    },
];

const completarProducto = (producto: Product): ProductRecomendado => {
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
    const [isAnimating, setIsAnimating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (pet) {
            setIsAnimating(true);
            setTimeout(() => {
                setStep(1);
                setIsAnimating(false);
            }, 300);
        }
    }, [pet]);

    const progress = ((step + 1) / steps.length) * 100;

    const resetForm = () => {
        setPet(null);
        setStep(0);
        setSelectedTags({ raza: "", edad: "", tamano: "", peso: "" });
        setIsAnimating(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Productos Recomendados
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                    Descubre los mejores productos para tu mascota con nuestro
                    sistema de recomendaciones inteligente
                </p>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button
                            size="lg"
                            className="rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <Search className="h-5 w-5 mr-2" />
                            Encuentra el alimento perfecto
                            <Sparkles className="h-5 w-5 ml-2" />
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Sparkles className="h-6 w-6 text-primary" />
                                    Recomendador Inteligente
                                </div>
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6">
                            {/* Progreso  */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-600">
                                        Paso {step + 1} de {steps.length}
                                    </span>
                                    <span className="text-sm font-medium text-primary">
                                        {Math.round(progress)}% completado
                                    </span>
                                </div>
                                <Progress value={progress} className="h-2" />
                            </div>

                            {/* Indicador de pasos */}
                            <div className="flex items-center justify-center gap-8">
                                {steps.map((stepItem, index) => {
                                    const StepIcon = stepItem.icon;
                                    const isActive = step === index;
                                    const isCompleted = step > index;

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4"
                                        >
                                            <div className="flex flex-col items-center text-center">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                        isCompleted
                                                            ? "bg-green-500 text-white"
                                                            : isActive
                                                            ? "bg-primary text-white scale-110"
                                                            : "bg-gray-200 text-gray-500"
                                                    }`}
                                                >
                                                    {isCompleted ? (
                                                        <CheckCircle className="h-5 w-5" />
                                                    ) : (
                                                        <StepIcon className="h-5 w-5" />
                                                    )}
                                                </div>
                                                <div className="mt-2">
                                                    <p
                                                        className={`text-xs font-medium ${
                                                            isActive
                                                                ? "text-primary"
                                                                : "text-gray-600"
                                                        }`}
                                                    >
                                                        {stepItem.title}
                                                    </p>
                                                </div>
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div
                                                    className={`w-12 h-0.5 ${
                                                        step > index
                                                            ? "bg-green-500"
                                                            : "bg-gray-200"
                                                    }`}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <Card className="border-0 shadow-sm">
                                <CardHeader className="bg-gradient-to-r from-primary/5 to-purple/5 text-center">
                                    <CardTitle className="text-xl font-bold text-gray-900">
                                        {steps[step].title}
                                    </CardTitle>
                                    <p className="text-gray-600 text-sm">
                                        {steps[step].description}
                                    </p>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div
                                        className={`transition-all duration-300 ${
                                            isAnimating
                                                ? "opacity-0 translate-x-4"
                                                : "opacity-100 translate-x-0"
                                        }`}
                                    >
                                        {step === 0 && (
                                            <Step0
                                                selected={pet}
                                                setSelected={setPet}
                                            />
                                        )}
                                        {step === 1 && (
                                            <Step1
                                                selected={pet}
                                                setStep={setStep}
                                                onRecommend={
                                                    setFilteredProducts
                                                }
                                                setSelectedTags={
                                                    setSelectedTags
                                                }
                                                onClose={() =>
                                                    setIsModalOpen(false)
                                                }
                                            />
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            {filteredProducts.length > 0 && (
                <div className="space-y-6">
                    {/* Filtros aplicados */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                <Target className="h-5 w-5 text-primary" />
                                Recomendaciones para tu mascota
                            </h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setFilteredProducts([]);
                                    resetForm();
                                }}
                                className="rounded-full"
                            >
                                Nueva búsqueda
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(selectedTags).map(
                                ([key, value]) =>
                                    value && (
                                        <Badge
                                            key={key}
                                            variant="secondary"
                                            className="px-3 py-1"
                                        >
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                            : {value}
                                        </Badge>
                                    )
                            )}
                        </div>
                    </div>
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
            )}
            {filteredProducts.length === 0 && (
                <div className="text-center py-12 mb-30">
                    <div className="max-w-md mx-auto">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <PawPrint className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            ¿Listo para encontrar el alimento perfecto?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Usa nuestro recomendador inteligente para descubrir
                            los mejores productos para tu mascota
                        </p>
                    </div>
                </div>
            )}
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
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    ¿Qué tipo de mascota tienes?
                </h3>
                <p className="text-gray-600 text-sm">
                    Selecciona tu compañero para personalizar las
                    recomendaciones
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div
                    onClick={() => setSelected("perro")}
                    className={`group cursor-pointer transition-all duration-300 ${
                        selected === "perro"
                            ? "ring-2 ring-primary bg-primary/5 scale-105"
                            : "hover:scale-105 hover:shadow-md"
                    }`}
                >
                    <Card className="h-60 border-2 border-transparent group-hover:border-primary/20 transition-all duration-300">
                        <CardContent className="p-4 text-center">
                            <div className="relative mb-3">
                                <Image
                                    src="/golden.png"
                                    alt="Perro"
                                    width={80}
                                    height={80}
                                    className="mx-auto rounded-full"
                                />
                                {selected === "perro" && (
                                    <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-1">
                                        <CheckCircle className="h-4 w-4" />
                                    </div>
                                )}
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                                Perro
                            </h4>
                            <p className="text-xs text-gray-600">
                                Nutrición canina
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div
                    onClick={() => setSelected("gato")}
                    className={`group cursor-pointer transition-all duration-300 ${
                        selected === "gato"
                            ? "ring-2 ring-primary bg-primary/5 scale-105"
                            : "hover:scale-105 hover:shadow-md"
                    }`}
                >
                    <Card className="h-60 border-2 border-transparent group-hover:border-primary/20 transition-all duration-300">
                        <CardContent className="p-4 text-center">
                            <div className="relative mb-3">
                                <Image
                                    src="/gatoJoy.png"
                                    alt="Gato"
                                    width={80}
                                    height={80}
                                    className="mx-auto rounded-full"
                                />
                                {selected === "gato" && (
                                    <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-1">
                                        <CheckCircle className="h-4 w-4" />
                                    </div>
                                )}
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                                Gato
                            </h4>
                            <p className="text-xs text-gray-600">
                                Nutrición felina
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {selected && (
                <div className="text-center animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">
                            ¡Perfecto! Has seleccionado {selected}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

const Step1 = ({
    selected,
    setStep,
    onRecommend,
    setSelectedTags,
    onClose,
}: {
    selected: "perro" | "gato" | null;
    setStep: (value: number) => void;
    onRecommend: (products: ProductRecomendado[]) => void;
    setSelectedTags: (tags: {
        raza: string;
        edad: string;
        tamano: string;
        peso: string;
    }) => void;
    onClose: () => void;
}) => {
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
    const [isLoading, setIsLoading] = useState(false);

    const isFormComplete = raza && edad && tamano && peso;

    const handleConfirm = async () => {
        setIsLoading(true);

        // Simular procesamiento
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const productosCompletos = baseProducts.map(completarProducto);
        const productosConScore = productosCompletos.map((p) => {
            let score = 0;
            if (selected && (p.especie === "ambos" || p.especie === selected))
                score++;
            if (raza && p.razas && p.razas.includes(raza)) score++;
            if (edad && p.edades && p.edades.includes(edad)) score++;
            if (tamano && p.tamanos && p.tamanos.includes(tamano)) score++;
            if (peso && p.pesos && p.pesos.includes(peso)) score++;
            return { ...p, score };
        });

        const ordenados = productosConScore.sort((a, b) => b.score - a.score);
        onRecommend(ordenados as ProductRecomendado[]);
        setSelectedTags({ raza, edad, tamano, peso });
        setIsLoading(false);
        onClose();
    };

    return (
        <div className="space-y-4">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Cuéntanos sobre tu {selected}
                </h3>
                <p className="text-gray-600 text-sm">
                    Esta información nos ayudará a encontrar la nutrición
                    perfecta
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        Raza de tu {selected}
                    </label>
                    <Select value={raza} onValueChange={setRaza}>
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Selecciona la raza" />
                        </SelectTrigger>
                        <SelectContent>
                            {(selected === "perro"
                                ? razasPerros
                                : razasGatos
                            ).map((r) => (
                                <SelectItem key={r} value={r}>
                                    {r}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-primary" />
                        Edad de tu {selected}
                    </label>
                    <Select value={edad} onValueChange={setEdad}>
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Selecciona la edad" />
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

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <PawPrint className="h-4 w-4 text-primary" />
                        Tamaño de tu {selected}
                    </label>
                    <Select value={tamano} onValueChange={setTamano}>
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Selecciona el tamaño" />
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

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        Peso de tu {selected}
                    </label>
                    <Select value={peso} onValueChange={setPeso}>
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Selecciona el peso" />
                        </SelectTrigger>
                        <SelectContent>
                            {(selected === "perro"
                                ? pesosPerros
                                : pesosGatos
                            ).map((p) => (
                                <SelectItem key={p} value={p}>
                                    {p}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Progress indicator */}
            {isFormComplete && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 animate-fade-in-up">
                    <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium text-sm">
                            ¡Información completa!
                        </span>
                    </div>
                    <p className="text-green-700 text-xs mt-1">
                        Ya podemos generar recomendaciones personalizadas para
                        tu {selected}
                    </p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4">
                <Button
                    variant="outline"
                    onClick={() => setStep(0)}
                    className="rounded-full px-6"
                    disabled={isLoading}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                </Button>

                <Button
                    onClick={handleConfirm}
                    disabled={!isFormComplete || isLoading}
                    className="rounded-full px-6"
                    size="lg"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Analizando...
                        </div>
                    ) : (
                        <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Obtener recomendaciones
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default Page;
