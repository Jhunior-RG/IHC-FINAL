"use client";
import ButtonAddShoppingCart from "@/components/ButtonAddShoppingCart";
import { useParams } from "next/navigation";
import Review from "@/components/review";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textArea";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import user from "@/constant/user";
import {
    ArrowDown,
    Star,
    MessageSquare,
    TrendingUp,
    Calendar,
    Filter,
    Send,
    X,
    CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { products } from "@/constant/products";
import { reviews } from "@/constant/reviews";

const Page = () => {
    const params = useParams();
    const id = params?.id as string;
    const productId = Number(id);
    const product = products.find((p) => p.id === productId);
    const [sort, setSort] = useState<"latest" | "best" | "worst">("latest");
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>("");
    const [cantidad, setCantidad] = useState<number>(1);
    const [reviewsList, setReviews] = useState(reviews);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    if (!product) {
        return <div className="text-center py-10">Producto no encontrado</div>;
    }

    // Calcular estadísticas de reseñas
    const totalReviews = reviewsList.length;
    const averageRating =
        totalReviews > 0
            ? reviewsList.reduce((sum, r) => sum + r.rating, 0) / totalReviews
            : 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: reviewsList.filter((r) => r.rating === star).length,
        percentage:
            totalReviews > 0
                ? (reviewsList.filter((r) => r.rating === star).length /
                      totalReviews) *
                  100
                : 0,
    }));

    const handleSubmitReview = async () => {
        if (!rating || !review.trim()) return;

        setIsSubmitting(true);

        // Simular envío
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setReviews([
            ...reviewsList,
            {
                id: reviewsList.length + 1,
                name: user.name,
                rating,
                description: review,
                image: user.image,
                date: new Date().toISOString(),
            },
        ]);

        setRating(0);
        setReview("");
        setIsSubmitting(false);
        setShowSuccess(true);

        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleCancelReview = () => {
        setRating(0);
        setReview("");
        setHoverRating(0);
    };

    const isReviewValid = rating > 0 && review.trim().length >= 10;

    return (
        <div>
            <div className="flex justify-center items-center gap-40 py-10 sm:max-w-4/5 mx-auto">
                <Image
                    className="h-full"
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                />
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p>PawFuel</p>
                    <div className="flex gap-2 flex-wrap">
                        {product.tags?.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <div>
                            {product.priceDiscount ? (
                                <div className="text-primary font-bold flex items-baseline gap-2">
                                    <span className="text-gray-500 text-base line-through">
                                        Bs. {product.price}
                                    </span>
                                    <span className="text-2xl">
                                        Bs. {product.priceDiscount}
                                    </span>
                                </div>
                            ) : (
                                <p className="text-primary font-bold text-2xl">
                                    Bs. {product.price}
                                </p>
                            )}
                            <p className="text-sm text-gray-500">
                                {product.stock} en Stock
                            </p>
                        </div>
                        <Card className="w-[250px]">
                            <CardContent className="flex flex-col gap-2">
                                <p className="font-semibold">Cantidad</p>
                                <Input
                                    type="number"
                                    min={1}
                                    onChange={(e) =>
                                        setCantidad(Number(e.target.value))
                                    }
                                    value={cantidad}
                                    max={product.stock}
                                />
                                <p className="text-sm font-semibold">
                                    Total:{" "}
                                    <span className="text-secondary">
                                        Bs. {cantidad * product.price}
                                    </span>
                                </p>

                                <ButtonAddShoppingCart
                                    product={product}
                                    quantity={cantidad}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="description" className="w-4/5 mx-auto pb-5">
                <TabsList className="bg-white">
                    <TabsTrigger value="description">Descripción</TabsTrigger>
                    <TabsTrigger value="nutrition">Nutrición</TabsTrigger>
                    <TabsTrigger value="similar">Similares</TabsTrigger>
                    <TabsTrigger
                        value="reviews"
                        className="flex items-center gap-2"
                    >
                        Reseñas
                        <Badge variant="secondary" className="text-xs">
                            {totalReviews}
                        </Badge>
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="description"
                    className="border-2 rounded-b-4xl rounded-r-4xl p-5"
                >
                    <p>
                        PawFuel Mature raza pequeña es un alimento premium para
                        perros adultos mayores de razas pequeñas.
                    </p>
                    <p className="font-semibold">
                        Su fórmula avanzada aporta los nutrientes esenciales
                        para:
                    </p>
                    <ol className="list-decimal list-inside ml-4">
                        <li className="">
                            Mantener la agilidad y vitalidad diaria.
                        </li>
                        <li className="">
                            Proteger las articulaciones y facilitar la
                            movilidad.
                        </li>
                        <li>Fortalecer el sistema inmunitario.</li>
                        <li>Mejorar la digestión y absorción de nutrientes.</li>
                    </ol>
                    <p className="font-semibold">Beneficios principales</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>
                            Fácil digestión: Ingredientes de alta calidad y
                            prebióticos naturales.
                        </li>
                        <li>
                            Articulaciones fuertes: Con glucosamina y
                            condroitina para el soporte óseo.
                        </li>
                        <li>
                            Huesos sanos: Enriquecido con calcio y fósforo
                            balanceados.
                        </li>
                        <li>
                            Pelaje brillante: Ácidos grasos Omega 3 y 6 para una
                            piel saludable.
                        </li>
                    </ul>
                </TabsContent>
                <TabsContent
                    value="nutrition"
                    className="border-2 rounded-b-4xl rounded-r-4xl p-5 flex"
                >
                    <div className="flex flex-col gap-2 w-1/3">
                        <h3>Valor nutricional (por 100g):</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nutriente</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Proteínas</TableCell>
                                    <TableCell>28%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Grasas</TableCell>
                                    <TableCell>15%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Fibra</TableCell>
                                    <TableCell>4%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Humedad</TableCell>
                                    <TableCell>10%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Minerales</TableCell>
                                    <TableCell>7%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Vitaminas</TableCell>
                                    <TableCell>10%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Calcio</TableCell>
                                    <TableCell>1.5%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Fósforo</TableCell>
                                    <TableCell>1.5%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Omega 3 y 6</TableCell>
                                    <TableCell>1.5%</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div className="w-2/3">
                        <h3 className="font-semibold">
                            Ingredientes principales:
                        </h3>
                        <ul className="list-disc list-inside ml-4">
                            <li>Carne de pollo fresca.</li>
                            <li>Harina integral de arroz.</li>
                            <li>Aceite de salmón.</li>
                            <li>Extracto natual de yuca</li>
                            <li>Pulpa de remolacha.</li>
                            <li>Vitaminas A, D y E.</li>
                        </ul>
                        <h3 className="font-semibold">Beneficios clave:</h3>
                        <ol className="list-decimal list-inside ml-4">
                            <li>
                                Digestión saludable: ingredientes naturales
                                altamente digestibles para una absorción óptima
                                de nutrientes.
                            </li>
                            <li>
                                Articulaciones fuertes: enriquecido con
                                glucosamina y condroitina para mantener la
                                movilidad y vitalidad de tu mascota.
                            </li>
                            <li>
                                Piel y pelaje radiantes: equilibrio ideal de
                                Omega 3 y Omega 6 para un pelaje suave y piel
                                saludable.
                            </li>
                        </ol>
                    </div>
                </TabsContent>
                <TabsContent
                    value="similar"
                    className="border-2 rounded-b-4xl rounded-r-4xl p-5"
                ></TabsContent>
                <TabsContent
                    value="reviews"
                    className="border-2 rounded-b-4xl rounded-r-4xl p-5 space-y-6"
                >
                    {/* Estadísticas de reseñas */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Resumen general */}
                        <Card className="p-6">
                            <div className="text-center space-y-4">
                                <div>
                                    <div className="text-4xl font-bold text-primary mb-2">
                                        {averageRating.toFixed(1)}
                                    </div>
                                    <div className="flex justify-center mb-2">
                                        {Array.from({ length: 5 }).map(
                                            (_, index) => (
                                                <Star
                                                    key={index}
                                                    className={`w-5 h-5 ${
                                                        index <
                                                        Math.round(
                                                            averageRating
                                                        )
                                                            ? "text-yellow-500 fill-yellow-500"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            )
                                        )}
                                    </div>
                                    <p className="text-gray-600">
                                        Basado en {totalReviews}{" "}
                                        {totalReviews === 1
                                            ? "reseña"
                                            : "reseñas"}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Distribución de estrellas */}
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                Distribución de calificaciones
                            </h3>
                            <div className="space-y-3">
                                {ratingDistribution.map(
                                    ({ star, count, percentage }) => (
                                        <div
                                            key={star}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="flex items-center gap-1 w-12">
                                                <span className="text-sm font-medium">
                                                    {star}
                                                </span>
                                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                            </div>
                                            <div className="flex-1">
                                                <Progress
                                                    value={percentage}
                                                    className="h-2"
                                                />
                                            </div>
                                            <span className="text-sm text-gray-600 w-8">
                                                {count}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Formulario de nueva reseña */}
                    <Card className="overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary/5 to-blue/5">
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-primary" />
                                Escribe tu reseña
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <Image
                                        className="rounded-full border-2 border-gray-200"
                                        src={user.image || "/placeholder.svg"}
                                        alt="imagen de perfil"
                                        width={60}
                                        height={60}
                                    />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">
                                            {user.name}
                                        </h4>

                                        {/* Rating selector mejorado */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Tu calificación *
                                            </label>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: 5 }).map(
                                                    (_, index) => (
                                                        <Star
                                                            key={index}
                                                            onClick={() =>
                                                                setRating(
                                                                    index + 1
                                                                )
                                                            }
                                                            onMouseEnter={() =>
                                                                setHoverRating(
                                                                    index + 1
                                                                )
                                                            }
                                                            onMouseLeave={() =>
                                                                setHoverRating(
                                                                    0
                                                                )
                                                            }
                                                            className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
                                                                index <
                                                                (hoverRating ||
                                                                    rating)
                                                                    ? "text-yellow-500 fill-yellow-500 scale-110"
                                                                    : "text-gray-300 hover:text-yellow-400"
                                                            }`}
                                                        />
                                                    )
                                                )}
                                                {rating > 0 && (
                                                    <span className="ml-2 text-sm text-gray-600">
                                                        {rating === 1 &&
                                                            "Muy malo"}
                                                        {rating === 2 && "Malo"}
                                                        {rating === 3 &&
                                                            "Regular"}
                                                        {rating === 4 &&
                                                            "Bueno"}
                                                        {rating === 5 &&
                                                            "Excelente"}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Campo de texto mejorado */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Tu experiencia *
                                        </label>
                                        <Textarea
                                            placeholder="Comparte tu experiencia con este producto. ¿Qué te gustó más? ¿Lo recomendarías?"
                                            className="min-h-[100px] resize-none"
                                            value={review}
                                            onChange={(e) =>
                                                setReview(e.target.value)
                                            }
                                            maxLength={500}
                                        />
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Mínimo 10 caracteres</span>
                                            <span>{review.length}/500</span>
                                        </div>
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="flex justify-end gap-3 pt-2">
                                        <Button
                                            variant="outline"
                                            onClick={handleCancelReview}
                                            disabled={isSubmitting}
                                            className="rounded-full"
                                        >
                                            <X className="h-4 w-4 mr-2" />
                                            Cancelar
                                        </Button>
                                        <Button
                                            onClick={handleSubmitReview}
                                            disabled={
                                                !isReviewValid || isSubmitting
                                            }
                                            className="rounded-full px-6"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    Publicando...
                                                </div>
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4 mr-2" />
                                                    Publicar Reseña
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    {/* Mensaje de éxito */}
                                    {showSuccess && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 animate-fade-in-up">
                                            <div className="flex items-center gap-2 text-green-800">
                                                <CheckCircle className="h-4 w-4" />
                                                <span className="text-sm font-medium">
                                                    ¡Reseña publicada
                                                    exitosamente!
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Filtros y ordenamiento mejorados */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">
                                Ordenar por:
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant={
                                    sort === "latest" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setSort("latest")}
                                className="rounded-full"
                            >
                                <Calendar className="h-4 w-4 mr-2" />
                                Más Recientes
                            </Button>
                            <Button
                                variant={
                                    sort === "best" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setSort("best")}
                                className="rounded-full"
                            >
                                <TrendingUp className="h-4 w-4 mr-2" />
                                Mejor Calificadas
                            </Button>
                            <Button
                                variant={
                                    sort === "worst" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setSort("worst")}
                                className="rounded-full"
                            >
                                <ArrowDown className="h-4 w-4 mr-2" />
                                Menor Calificadas
                            </Button>
                        </div>
                    </div>

                    {/* Lista de reseñas */}
                    <div className="space-y-4">
                        {reviewsList.length === 0 ? (
                            <Card className="text-center py-12">
                                <CardContent>
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MessageSquare className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Aún no hay reseñas
                                    </h3>
                                    <p className="text-gray-600">
                                        ¡Sé el primero en compartir tu
                                        experiencia con este producto!
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <>
                                {sort === "latest" &&
                                    reviewsList
                                        .sort(
                                            (a, b) =>
                                                new Date(b.date).getTime() -
                                                new Date(a.date).getTime()
                                        )
                                        .map((review, index) => (
                                            <div
                                                key={review.id}
                                                className="animate-fade-in-up"
                                                style={{
                                                    animationDelay: `${
                                                        index * 100
                                                    }ms`,
                                                }}
                                            >
                                                <Review review={review} />
                                            </div>
                                        ))}
                                {sort === "best" &&
                                    reviewsList
                                        .sort((a, b) => b.rating - a.rating)
                                        .map((review, index) => (
                                            <div
                                                key={review.id}
                                                className="animate-fade-in-up"
                                                style={{
                                                    animationDelay: `${
                                                        index * 100
                                                    }ms`,
                                                }}
                                            >
                                                <Review review={review} />
                                            </div>
                                        ))}
                                {sort === "worst" &&
                                    reviewsList
                                        .sort((a, b) => a.rating - b.rating)
                                        .map((review, index) => (
                                            <div
                                                key={review.id}
                                                className="animate-fade-in-up"
                                                style={{
                                                    animationDelay: `${
                                                        index * 100
                                                    }ms`,
                                                }}
                                            >
                                                <Review review={review} />
                                            </div>
                                        ))}
                            </>
                        )}
                    </div>
                </TabsContent>
            </Tabs>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Page;
