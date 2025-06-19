"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textArea"
import {
    MapPin,
    Plus,
    Edit,
    Trash2,
    Home,
    Building,
    Star,
    Navigation,
    Phone,
    User,
    Save,
    X,
    CheckCircle,
    AlertCircle,
} from "lucide-react"

interface Direccion {
    id: number
    nombre: string
    tipo: "casa" | "trabajo" | "otro"
    direccion: string
    ciudad: string
    zona: string
    referencia: string
    telefono: string
    nombreContacto: string
    esPredeterminada: boolean
    coordenadas?: {
        lat: number
        lng: number
    }
}

const MisDirecciones = () => {
    const [direcciones, setDirecciones] = useState<Direccion[]>([
        {
            id: 1,
            nombre: "Casa",
            tipo: "casa",
            direccion: "Av. América #789",
            ciudad: "Cochabamba",
            zona: "Zona Norte",
            referencia: "A una cuadra del Hipermaxi Norte",
            telefono: "+591 76432100",
            nombreContacto: "Carlos Rojas",
            esPredeterminada: true,
            coordenadas: { lat: -17.3634, lng: -66.1641 },
        },
        {
            id: 2,
            nombre: "Oficina",
            tipo: "trabajo",
            direccion: "Calle España #321",
            ciudad: "Cochabamba",
            zona: "Centro",
            referencia: "Edificio Centro Empresarial, oficina 304",
            telefono: "+591 72890123",
            nombreContacto: "Carlos Rojas",
            esPredeterminada: false,
            coordenadas: { lat: -17.3935, lng: -66.1568 },
        },
    ]);


    const [isModalOpen, setIsModalOpen] = useState(false)
    const [direccionEditando, setDireccionEditando] = useState<Direccion | null>(null)
    const [formData, setFormData] = useState<Partial<Direccion>>({
        nombre: "",
        tipo: "casa",
        direccion: "",
        ciudad: "La Paz",
        zona: "",
        referencia: "",
        telefono: "",
        nombreContacto: "",
        esPredeterminada: false,
    })

    const ciudades = ["La Paz", "Santa Cruz", "Cochabamba", "Sucre", "Oruro", "Potosí", "Tarija", "Beni", "Pando"]

    const zonasCochabamba = [
        "Centro",
        "Queru Queru",
        "Sarco",
        "Recoleta",
        "Colcapirhua",
        "Tiquipaya",
        "Sacaba",
        "Villa Pagador",
        "Quillacollo",
        "Huañacota",
        "Lajta",
        "Chiquicollo",
        "El Paso",
        "Pacata",
        "Cala Cala",
    ];

    const handleOpenModal = (direccion?: Direccion) => {
        if (direccion) {
            setDireccionEditando(direccion)
            setFormData(direccion)
        } else {
            setDireccionEditando(null)
            setFormData({
                nombre: "",
                tipo: "casa",
                direccion: "",
                ciudad: "La Paz",
                zona: "",
                referencia: "",
                telefono: "",
                nombreContacto: "",
                esPredeterminada: false,
            })
        }
        setIsModalOpen(true)
    }

    const handleSave = () => {
        if (direccionEditando) {
            // Editar dirección existente
            setDirecciones((prev) =>
                prev.map((dir) => (dir.id === direccionEditando.id ? { ...direccionEditando, ...formData } : dir)),
            )
        } else {
            // Agregar nueva dirección
            const nuevaDireccion: Direccion = {
                id: Date.now(),
                ...formData,
            } as Direccion

            setDirecciones((prev) => [...prev, nuevaDireccion])
        }
        setIsModalOpen(false)
        setDireccionEditando(null)
    }

    const handleDelete = (id: number) => {
        setDirecciones((prev) => prev.filter((dir) => dir.id !== id))
    }

    const handleSetDefault = (id: number) => {
        setDirecciones((prev) =>
            prev.map((dir) => ({
                ...dir,
                esPredeterminada: dir.id === id,
            })),
        )
    }

    const getTipoIcon = (tipo: string) => {
        switch (tipo) {
            case "casa":
                return <Home className="h-4 w-4" />
            case "trabajo":
                return <Building className="h-4 w-4" />
            default:
                return <MapPin className="h-4 w-4" />
        }
    }

    const getTipoColor = (tipo: string) => {
        switch (tipo) {
            case "casa":
                return "bg-blue-100 text-blue-800"
            case "trabajo":
                return "bg-green-100 text-green-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const isFormValid =
        formData.nombre && formData.direccion && formData.zona && formData.telefono && formData.nombreContacto

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Mis Direcciones</h1>
                        <p className="text-gray-600 mt-2">Gestiona tus direcciones de entrega</p>
                    </div>

                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => handleOpenModal()} className="rounded-full px-6">
                                <Plus className="h-4 w-4 mr-2" />
                                Agregar Dirección
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    {direccionEditando ? "Editar Dirección" : "Nueva Dirección"}
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-6 py-4">
                                {/* Información básica */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <Home className="h-4 w-4 text-primary" />
                                        Información Básica
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nombre">Nombre de la dirección *</Label>
                                            <Input
                                                id="nombre"
                                                placeholder="Ej: Casa, Oficina, Casa de mamá"
                                                value={formData.nombre}
                                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tipo">Tipo de dirección</Label>
                                            <Select
                                                value={formData.tipo}
                                                onValueChange={(value: any) => setFormData({ ...formData, tipo: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="casa">
                                                        <div className="flex items-center gap-2">
                                                            <Home className="h-4 w-4" />
                                                            Casa
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="trabajo">
                                                        <div className="flex items-center gap-2">
                                                            <Building className="h-4 w-4" />
                                                            Trabajo
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="otro">
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="h-4 w-4" />
                                                            Otro
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {/* Ubicación */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <Navigation className="h-4 w-4 text-primary" />
                                        Ubicación
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="direccion">Dirección completa *</Label>
                                            <Input
                                                id="direccion"
                                                placeholder="Ej: Av. Ballivián #123"
                                                value={formData.direccion}
                                                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="ciudad">Ciudad</Label>
                                                <Select
                                                    value={formData.ciudad}
                                                    onValueChange={(value) => setFormData({ ...formData, ciudad: value })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {ciudades.map((ciudad) => (
                                                            <SelectItem key={ciudad} value={ciudad}>
                                                                {ciudad}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="zona">Zona *</Label>
                                                <Select
                                                    value={formData.zona}
                                                    onValueChange={(value) => setFormData({ ...formData, zona: value })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona una zona" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {zonasCochabamba.map((zona) => (
                                                            <SelectItem key={zona} value={zona}>
                                                                {zona}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="referencia">Referencias adicionales</Label>
                                            <Textarea
                                                id="referencia"
                                                placeholder="Ej: Frente al parque central, casa color azul con portón negro"
                                                value={formData.referencia}
                                                onChange={(e) => setFormData({ ...formData, referencia: e.target.value })}
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Contacto */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <User className="h-4 w-4 text-primary" />
                                        Información de Contacto
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nombreContacto">Nombre del contacto *</Label>
                                            <Input
                                                id="nombreContacto"
                                                placeholder="Nombre completo"
                                                value={formData.nombreContacto}
                                                onChange={(e) => setFormData({ ...formData, nombreContacto: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="telefono">Teléfono *</Label>
                                            <Input
                                                id="telefono"
                                                placeholder="+591 70123456"
                                                value={formData.telefono}
                                                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Opciones */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="predeterminada"
                                            checked={formData.esPredeterminada}
                                            onChange={(e) => setFormData({ ...formData, esPredeterminada: e.target.checked })}
                                            className="rounded border-gray-300"
                                        />
                                        <Label htmlFor="predeterminada" className="flex items-center gap-2">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            Establecer como dirección predeterminada
                                        </Label>
                                    </div>
                                </div>

                                {/* Botones */}
                                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t">
                                    <Button variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-full px-6">
                                        <X className="h-4 w-4 mr-2" />
                                        Cancelar
                                    </Button>
                                    <Button onClick={handleSave} disabled={!isFormValid} className="rounded-full px-6">
                                        <Save className="h-4 w-4 mr-2" />
                                        {direccionEditando ? "Actualizar" : "Guardar"} Dirección
                                    </Button>
                                </div>

                                {!isFormValid && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                        <div className="flex items-center gap-2 text-yellow-800">
                                            <AlertCircle className="h-4 w-4" />
                                            <span className="text-sm font-medium">Campos requeridos</span>
                                        </div>
                                        <p className="text-yellow-700 text-xs mt-1">Por favor completa todos los campos marcados con *</p>
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Lista de direcciones */}
            <div className="space-y-4">
                {direcciones.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tienes direcciones guardadas</h3>
                            <p className="text-gray-600 mb-4">Agrega tu primera dirección para facilitar tus pedidos</p>
                            <Button onClick={() => handleOpenModal()} className="rounded-full">
                                <Plus className="h-4 w-4 mr-2" />
                                Agregar Primera Dirección
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    direcciones.map((direccion) => (
                        <Card
                            key={direccion.id}
                            className={`transition-all duration-200 hover:shadow-md ${direccion.esPredeterminada ? "ring-2 ring-primary/20 bg-primary/5" : ""}`}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${getTipoColor(direccion.tipo)}`}>
                                            {getTipoIcon(direccion.tipo)}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                {direccion.nombre}
                                                {direccion.esPredeterminada && (
                                                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                                        <Star className="h-3 w-3 mr-1" />
                                                        Predeterminada
                                                    </Badge>
                                                )}
                                            </CardTitle>
                                            <p className="text-sm text-gray-600 capitalize">{direccion.tipo}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {!direccion.esPredeterminada && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleSetDefault(direccion.id)}
                                                className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                                            >
                                                <Star className="h-4 w-4" />
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleOpenModal(direccion)}
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(direccion.id)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            disabled={direccion.esPredeterminada}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-900">{direccion.direccion}</p>
                                            <p className="text-sm text-gray-600">
                                                {direccion.zona}, {direccion.ciudad}
                                            </p>
                                        </div>
                                    </div>

                                    {direccion.referencia && (
                                        <div className="flex items-start gap-2">
                                            <Navigation className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-gray-600">{direccion.referencia}</p>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            <span>{direccion.nombreContacto}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            <span>{direccion.telefono}</span>
                                        </div>
                                    </div>

                                    {direccion.esPredeterminada && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                                            <div className="flex items-center gap-2 text-green-800">
                                                <CheckCircle className="h-4 w-4" />
                                                <span className="text-sm font-medium">Esta es tu dirección predeterminada</span>
                                            </div>
                                            <p className="text-green-700 text-xs mt-1">Se usará automáticamente en tus pedidos</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Información adicional */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-medium text-blue-900 mb-1">Consejos para tus direcciones</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Incluye referencias claras para facilitar la entrega</li>
                            <li>• Verifica que el número de teléfono esté correcto</li>
                            <li>• Marca tu dirección principal como predeterminada</li>
                            <li>• Puedes tener múltiples direcciones para diferentes ocasiones</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MisDirecciones
