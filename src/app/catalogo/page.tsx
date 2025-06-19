"use client"
import { useState } from "react"
import type { Product } from "../../components/CardProductSinOferta"
import CardProduct from "../../components/CardProductSinOferta"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ListFilter, Plus, X } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"

const products: Product[] = [
  {
    id: 1,
    name: "Vital+ comida para perros sabor carne y vegetales 2kg",
    price: 150,
    priceDiscount: 120,
    image: "/Vital+.png",
    description:
      "Alimento completo y balanceado para perros adultos, con delicioso sabor a carne y vegetales. Aporta energía, fortalece el sistema inmunológico y mejora el pelaje.",
    tags: ["Perros adultos", "Pelaje saludable", "Energía", "Alimento balanceado"],
    stock: 15,
  },
  {
    id: 2,
    name: "ZenCat comida para gatos sabor salmón 1.5kg",
    price: 100,
    priceDiscount: 80,
    image: "/ZenCat.png",
    description:
      "Nutrición premium para gatos, rica en proteínas y omega 3 gracias al salmón. Promueve un sistema digestivo sano, pelaje brillante y defensas fuertes.",
    tags: ["Gatos adultos", "Sabor salmón", "Pelaje brillante", "Salud digestiva"],
    stock: 8,
  },
  {
    id: 3,
    name: "PawFuel Mature Raza Pequeña",
    price: 200,
    priceDiscount: 130,
    image: "/Mature.png",
    description:
      "Especialmente formulado para perros de razas pequeñas en edad madura. Ayuda a mantener la movilidad articular, controla el peso y protege la salud cardíaca.",
    tags: ["Raza pequeña", "Perros maduros", "Movilidad articular", "Control de peso"],
    stock: 3,
  },
  {
    id: 4,
    name: "Vital+ comida para perros sabor carne y vegetales 2kg",
    price: 150,
    priceDiscount: 120,
    image: "/Vital+.png",
    description:
      "Alimento completo y balanceado para perros adultos, con delicioso sabor a carne y vegetales. Aporta energía, fortalece el sistema inmunológico y mejora el pelaje.",
    tags: ["Perros adultos", "Pelaje saludable", "Energía", "Alimento balanceado"],
    stock: 12,
  },
  {
    id: 5,
    name: "ZenCat comida para gatos sabor salmón 1.5kg",
    price: 100,
    priceDiscount: 80,
    image: "/ZenCat.png",
    description:
      "Nutrición premium para gatos, rica en proteínas y omega 3 gracias al salmón. Promueve un sistema digestivo sano, pelaje brillante y defensas fuertes.",
    tags: ["Gatos adultos", "Sabor salmón", "Pelaje brillante", "Salud digestiva"],
    stock: 0,
  },
  {
    id: 6,
    name: "PawFuel Mature Raza Pequeña",
    price: 200,
    priceDiscount: 130,
    image: "/Mature.png",
    description:
      "Especialmente formulado para perros de razas pequeñas en edad madura. Ayuda a mantener la movilidad articular, controla el peso y protege la salud cardíaca.",
    tags: ["Raza pequeña", "Perros maduros", "Movilidad articular", "Control de peso"],
    stock: 7,
  },
]

interface Filters {
    tipoMascota: string
    alimentacion: string
    cantidad: string
    ordenarPor: string
    tipoAlimento: string
    precioRange: number[]
}

const page = () => {
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState<Filters>({
        tipoMascota: "",
        alimentacion: "",
        cantidad: "",
        ordenarPor: "",
        tipoAlimento: "",
        precioRange: [0, 300] as [number, number]
    })
    const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null)

    const handleApplyFilters = () => {
        setAppliedFilters(filters)
        setShowFilters(false)
    }

    const handleClearFilters = () => {
        const emptyFilters = {
            tipoMascota: "",
            alimentacion: "",
            cantidad: "",
            ordenarPor: "",
            tipoAlimento: "",
            precioRange: [0, 300]
        }
        setFilters(emptyFilters)
        setAppliedFilters(null)
        setShowFilters(false)
    }

    const removeFilter = (filterKey: keyof Filters) => {
        const newFilters = { ...appliedFilters! }
        if (filterKey === 'precioRange') {
            newFilters[filterKey] = [0, 300]
        } else {
            newFilters[filterKey] = ""
        }
        setAppliedFilters(newFilters)
        setFilters(newFilters)
    }

    const getActiveFiltersCount = () => {
        if (!appliedFilters) return 0
        let count = 0
        Object.entries(appliedFilters).forEach(([key, value]) => {
            if (key === 'precioRange') {
                if (value[0] !== 0 || value[1] !== 300) count++
            } else if (value !== "") {
                count++
            }
        })
        return count
    }

    const hasFilters = appliedFilters && getActiveFiltersCount() > 0

    return (
        <>
            <div className="flex items-center justify-between px-10 mt-5">
                <h1 className="text-3xl font-semibold ml-10">Catálogo</h1>
                <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full text-md flex items-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <ListFilter className="w-4 h-4 text-white" />
                    Filtrar
                    {getActiveFiltersCount() > 0 && (
                        <Badge className="ml-1 h-5 w-5 p-0 text-xs">
                            {getActiveFiltersCount()}
                        </Badge>
                    )}
                </Button>
            </div>
            {showFilters && (
                <div className="px-10 mt-4">
                    <Card className="w-full">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Tipo de Mascota */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Tipo de Mascota</label>
                                    <Select value={filters.tipoMascota} onValueChange={(value) => setFilters({ ...filters, tipoMascota: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="perros">Perros</SelectItem>
                                            <SelectItem value="gatos">Gatos</SelectItem>
                                            <SelectItem value="aves">Aves</SelectItem>
                                            <SelectItem value="peces">Peces</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Alimentación */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Alimentación</label>
                                    <Select value={filters.alimentacion} onValueChange={(value) => setFilters({ ...filters, alimentacion: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="seco">Alimento Seco</SelectItem>
                                            <SelectItem value="humedo">Alimento Húmedo</SelectItem>
                                            <SelectItem value="mixto">Mixto</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Cantidad */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Cantidad</label>
                                    <Select value={filters.cantidad} onValueChange={(value) => setFilters({ ...filters, cantidad: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1kg">1kg o menos</SelectItem>
                                            <SelectItem value="2kg">2kg</SelectItem>
                                            <SelectItem value="5kg">5kg</SelectItem>
                                            <SelectItem value="10kg">10kg o más</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* Slider de Precios */}
                                <div className="space-y-4">
                                    <label className="text-sm font-medium block">
                                        Rango de Precios: Bs. {filters.precioRange[0]} - Bs. {filters.precioRange[1]}
                                    </label>
                                    <Slider
                                        value={filters.precioRange}
                                        onValueChange={(value: number[]) => setFilters({ ...filters, precioRange: value as [number, number] })}
                                        min={0}
                                        max={300}
                                        step={10}
                                        className="w-full"
                                    />
                                </div>
                                {/* Ordenar Por */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Ordenar Por</label>
                                    <Select value={filters.ordenarPor} onValueChange={(value) => setFilters({ ...filters, ordenarPor: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="precio-asc">Precio: Menor a Mayor</SelectItem>
                                            <SelectItem value="precio-desc">Precio: Mayor a Menor</SelectItem>
                                            <SelectItem value="nombre">Nombre A-Z</SelectItem>
                                            <SelectItem value="popularidad">Más Popular</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Tipo de Alimento */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Tipo de Alimento</label>
                                    <Select value={filters.tipoAlimento} onValueChange={(value) => setFilters({ ...filters, tipoAlimento: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="premium">Premium</SelectItem>
                                            <SelectItem value="super-premium">Super Premium</SelectItem>
                                            <SelectItem value="natural">Natural</SelectItem>
                                            <SelectItem value="organico">Orgánico</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <Button variant="outline" onClick={handleClearFilters}>
                                    Limpiar Filtros
                                </Button>
                                <Button onClick={handleApplyFilters}>
                                    Aplicar Filtros
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Filtros Aplicados */}
            {hasFilters && (
                <div className="px-10 mt-4">
                    <h1 className="text-md font-medium ml-10">Filtros aplicados:</h1>
                    <div className="ml-10 flex flex-wrap gap-2 mt-2">
                        {appliedFilters!.tipoMascota && (
                            <Badge variant="secondary" className="transition-colors duration-300 cursor-pointer flex items-center gap-1 py-2 rounded-xl hover:bg-red-600" onClick={() => removeFilter("tipoMascota")}>
                                Mascota: {appliedFilters!.tipoMascota}
                                <X
                                    className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                                    onClick={() => removeFilter("tipoMascota")}
                                />
                            </Badge>
                        )}
                        {appliedFilters!.alimentacion && (
                            <Badge variant="secondary" className="transition-colors duration-300 cursor-pointer flex items-center gap-1 py-2 rounded-xl hover:bg-red-600" onClick={() => removeFilter("tipoMascota")}>
                                Alimentación: {appliedFilters!.alimentacion}
                                <X
                                    className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                                    onClick={() => removeFilter("alimentacion")}
                                />
                            </Badge>
                        )}
                        {appliedFilters!.cantidad && (
                            <Badge variant="secondary" className="transition-colors duration-300 cursor-pointer flex items-center gap-1 py-2 rounded-xl hover:bg-red-600" onClick={() => removeFilter("tipoMascota")}>
                                Cantidad: {appliedFilters!.cantidad}
                                <X
                                    className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                                    onClick={() => removeFilter("cantidad")}
                                />
                            </Badge>
                        )}
                        {appliedFilters!.ordenarPor && (
                            <Badge variant="secondary" className="transition-colors duration-300 cursor-pointer flex items-center gap-1 py-2 rounded-xl hover:bg-red-600" onClick={() => removeFilter("tipoMascota")}>
                                Orden: {appliedFilters!.ordenarPor}
                                <X
                                    className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                                    onClick={() => removeFilter("ordenarPor")}
                                />
                            </Badge>
                        )}
                        {appliedFilters!.tipoAlimento && (
                            <Badge variant="secondary" className="transition-colors duration-300 cursor-pointer flex items-center gap-1 py-2 rounded-xl hover:bg-red-600" onClick={() => removeFilter("tipoMascota")}>
                                Tipo: {appliedFilters!.tipoAlimento}
                                <X
                                    className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                                    onClick={() => removeFilter("tipoAlimento")}
                                />
                            </Badge>
                        )}
                        {(appliedFilters!.precioRange[0] !== 0 || appliedFilters!.precioRange[1] !== 300) && (
                            <Badge variant="secondary" className="transition-colors duration-300 cursor-pointer flex items-center gap-1 py-2 rounded-xl hover:bg-red-600" onClick={() => removeFilter("tipoMascota")}>
                                Precio: ${appliedFilters!.precioRange[0]} - ${appliedFilters!.precioRange[1]}
                                <X
                                    className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                                    onClick={() => removeFilter("precioRange")}
                                />
                            </Badge>
                        )}
                    </div>
                </div>
            )}

            {/* Título dinámico */}
            <div className="flex items-center justify-between px-10 mt-5">
                <h1 className="text-2xl font-semibold ml-10 mt-5">
                    {hasFilters ? "Alimentos filtrados" : "Alimentos para perro"}
                </h1>
                {!hasFilters && (
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
                )}
            </div>

            <div className="max-w-[80%] mx-auto mt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <CardProduct key={product.id} product={product} />
                    ))}
                </div>
            </div>
            {!hasFilters && (
                <>
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
            )}
        </>
    )
}

export default page