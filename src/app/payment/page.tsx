"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useCart } from "@/context/CartContext"
import { CreditCard, Smartphone, Shield, Lock, CheckCircle, AlertCircle, Truck } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import BranchesCards from "@/components/branchesCards"

import LocationCards from "@/components/locationCard"

const page = () => {
    const [cardNumber, setCardNumber] = useState("")
    const [cardName, setCardName] = useState("")
    const [cardCvc, setCardCvc] = useState("")
    const [cardMonth, setCardMonth] = useState("")
    const [cardYear, setCardYear] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const { cart } = useCart()
    const router = useRouter()

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
        const matches = v.match(/\d{4,16}/g)
        const match = (matches && matches[0]) || ""
        const parts = []
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }
        if (parts.length) {
            return parts.join(" ")
        } else {
            return v
        }
    }

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value)
        setCardNumber(formatted)
        if (errors.cardNumber) {
            setErrors({ ...errors, cardNumber: "" })
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
            newErrors.cardNumber = "Número de tarjeta inválido"
        }
        if (!cardName.trim()) {
            newErrors.cardName = "Nombre del titular requerido"
        }
        if (!cardCvc || cardCvc.length < 3) {
            newErrors.cardCvc = "CVC inválido"
        }
        if (!cardMonth) {
            newErrors.cardMonth = "Mes requerido"
        }
        if (!cardYear) {
            newErrors.cardYear = "Año requerido"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const onPay = async () => {
        if (!validateForm()) return

        setIsProcessing(true)
        // Simular procesamiento de pago
        setTimeout(() => {
            setIsProcessing(false)
            setPaymentSuccess(true)
            setShowSuccessModal(true)
            // Redirigir después de 3 segundos
            setTimeout(() => {
                setShowSuccessModal(false)
                router.push("/perfil/pedidos")
            }, 3000)
        }, 3000)
    }

    const onQRPay = () => {
        setPaymentSuccess(true)
        setShowSuccessModal(true)
        // Redirigir después de 3 segundos
        setTimeout(() => {
            setShowSuccessModal(false)
            router.push("/perfil/pedidos")
        }, 3000)
    }
    const VisuallyHidden = ({ children }: { children: React.ReactNode }) => (
        <span className="sr-only">{children}</span>
    );

    const getCardType = (number: string) => {
        const num = number.replace(/\s/g, "")
        if (num.startsWith("4")) return "visa"
        if (num.startsWith("5") || num.startsWith("2")) return "mastercard"
        if (num.startsWith("3")) return "amex"
        return "generic"
    }

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <div className="flex flex-col py-10 min-h-screen">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-bold text-center pb-10 text-gray-900">Confirmar Pedido y Realizar Pago</h1>

                {/* Modal de Pago Exitoso */}
                <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                    <DialogContent className="sm:max-w-md">
                        <VisuallyHidden>
                            <DialogTitle>Confirmación de Pago</DialogTitle>
                        </VisuallyHidden>

                        <div className="flex flex-col items-center justify-center py-8 px-6">
                            {/* Animación del check */}
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                                    <CheckCircle className="w-12 h-12 text-green-600 animate-bounce" />
                                </div>
                                <div className="absolute inset-0 w-20 h-20 border-4 border-green-200 rounded-full animate-ping"></div>
                                <div className="absolute inset-2 w-16 h-16 border-2 border-green-300 rounded-full animate-ping animation-delay-200"></div>
                            </div>
                            <div className="text-center space-y-3">
                                <h2 className="text-2xl font-bold text-green-700 animate-fade-in">¡Pago Confirmado!</h2>
                                <p className="text-gray-600 animate-fade-in animation-delay-300">
                                    Tu pago ha sido procesado exitosamente
                                </p>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4 animate-fade-in animation-delay-500">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-green-800 font-medium">Monto pagado:</span>
                                        <span className="text-green-900 font-bold">Bs. {total}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm mt-2">
                                        <span className="text-green-800 font-medium">Estado:</span>
                                        <span className="text-green-900 font-bold">Confirmado</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 animate-fade-in animation-delay-700">
                                    Redirigiendo a tus pedidos en unos segundos...
                                </p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1 mt-6 animate-fade-in animation-delay-1000">
                                <div className="bg-green-600 h-1 rounded-full animate-progress"></div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                <Card className="mb-8 shadow-lg">
                    <CardHeader className="bg-gradient-to-r">
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Resumen del Pedido
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="w-20 h-20 flex-shrink-0">
                                        <Image
                                            className="w-full h-full object-contain rounded-md"
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">
                                            {item.quantity} x Bs. {item.price}
                                        </p>
                                        <p className="font-bold text-primary">Bs. {item.quantity * item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">Total:</span>
                                <span className="text-2xl font-bold text-primary">Bs. {total}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tipo de Entrega */}
                <Card className="mb-8 shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-2">
                        <Truck className="w-5 h-5 text-gray-700" />
                        <CardTitle className="text-base">Tipo de Entrega</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="delivery" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="delivery" className="flex items-center gap-2">
                                    <Smartphone className="h-4 w-4" />A domicilio
                                </TabsTrigger>
                                <TabsTrigger value="pickup" className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    En Sucursal
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="delivery" className="border rounded-lg p-4">
                                <LocationCards />
                            </TabsContent>
                            <TabsContent value="pickup" className="border rounded-lg p-4">
                                <BranchesCards />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Método de Pago */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Método de Pago
                            <Badge variant="secondary" className="ml-2">
                                <Lock className="h-3 w-3 mr-1" />
                                Seguro
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="tarjeta" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="tarjeta" className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Tarjeta de Crédito/Débito
                                </TabsTrigger>
                                <TabsTrigger value="qr" className="flex items-center gap-2">
                                    <Smartphone className="h-4 w-4" />
                                    Pago QR
                                </TabsTrigger>
                            </TabsList>

                            {/* Tarjeta */}
                            <TabsContent value="tarjeta" className="space-y-6">
                                {/* Vista previa de la tarjeta */}
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-xl">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="w-12 h-8 bg-yellow-400 rounded"></div>
                                        <div className="text-right">
                                            <div className="text-sm opacity-75">
                                                {getCardType(cardNumber) === "visa" && "VISA"}
                                                {getCardType(cardNumber) === "mastercard" && "MASTERCARD"}
                                                {getCardType(cardNumber) === "amex" && "AMEX"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <div className="text-2xl font-mono tracking-wider">{cardNumber || "•••• •••• •••• ••••"}</div>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-xs opacity-75 mb-1">TITULAR</div>
                                            <div className="font-semibold">{cardName || "NOMBRE APELLIDO"}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs opacity-75 mb-1">VÁLIDA HASTA</div>
                                            <div className="font-semibold">
                                                {cardMonth && cardYear ? `${cardMonth}/${cardYear}` : "MM/AA"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Formulario */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="cardNumber" className="text-sm font-medium">
                                                Número de Tarjeta *
                                            </Label>
                                            <Input
                                                id="cardNumber"
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                value={cardNumber}
                                                onChange={handleCardNumberChange}
                                                maxLength={19}
                                                className={`mt-1 ${errors.cardNumber ? "border-red-500" : ""}`}
                                            />
                                            {errors.cardNumber && (
                                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {errors.cardNumber}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="cardName" className="text-sm font-medium">
                                                Nombre del Titular *
                                            </Label>
                                            <Input
                                                id="cardName"
                                                type="text"
                                                placeholder="Como aparece en la tarjeta"
                                                value={cardName}
                                                onChange={(e) => {
                                                    setCardName(e.target.value.toUpperCase())
                                                    if (errors.cardName) setErrors({ ...errors, cardName: "" })
                                                }}
                                                className={`mt-1 ${errors.cardName ? "border-red-500" : ""}`}
                                            />
                                            {errors.cardName && (
                                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {errors.cardName}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-sm font-medium">Fecha de Expiración *</Label>
                                            <div className="grid grid-cols-2 gap-3 mt-1">
                                                <Select
                                                    value={cardMonth}
                                                    onValueChange={(value) => {
                                                        setCardMonth(value)
                                                        if (errors.cardMonth) setErrors({ ...errors, cardMonth: "" })
                                                    }}
                                                >
                                                    <SelectTrigger className={errors.cardMonth ? "border-red-500" : ""}>
                                                        <SelectValue placeholder="Mes" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Array.from({ length: 12 }, (_, i) => (
                                                            <SelectItem key={i} value={String(i + 1).padStart(2, "0")}>
                                                                {String(i + 1).padStart(2, "0")}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Select
                                                    value={cardYear}
                                                    onValueChange={(value) => {
                                                        setCardYear(value)
                                                        if (errors.cardYear) setErrors({ ...errors, cardYear: "" })
                                                    }}
                                                >
                                                    <SelectTrigger className={errors.cardYear ? "border-red-500" : ""}>
                                                        <SelectValue placeholder="Año" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Array.from({ length: 10 }, (_, i) => (
                                                            <SelectItem key={i} value={String(2025 + i).slice(-2)}>
                                                                {2025 + i}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            {(errors.cardMonth || errors.cardYear) && (
                                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    Fecha de expiración requerida
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="cardCvc" className="text-sm font-medium">
                                                Código de Seguridad (CVC) *
                                            </Label>
                                            <div className="flex gap-3 mt-1">
                                                <Input
                                                    id="cardCvc"
                                                    type="text"
                                                    placeholder="123"
                                                    value={cardCvc}
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, "")
                                                        setCardCvc(value)
                                                        if (errors.cardCvc) setErrors({ ...errors, cardCvc: "" })
                                                    }}
                                                    maxLength={4}
                                                    className={`flex-1 ${errors.cardCvc ? "border-red-500" : ""}`}
                                                />
                                                <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center">
                                                    <Image src="/cvc.png" alt="CVC" width={40} height={25} className="object-contain" />
                                                </div>
                                            </div>
                                            {errors.cardCvc && (
                                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {errors.cardCvc}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Información de seguridad */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-blue-800">
                                        <Shield className="h-4 w-4" />
                                        <span className="text-sm font-medium">Transacción Segura</span>
                                    </div>
                                    <p className="text-xs text-blue-700 mt-1">
                                        Tu información está protegida con encriptación SSL de 256 bits
                                    </p>
                                </div>

                                {/* Botón de pago */}
                                <div className="flex justify-center pt-4">
                                    <Button
                                        onClick={onPay}
                                        disabled={isProcessing}
                                        className="w-full max-w-md h-12 text-lg font-semibold"
                                        size="lg"
                                    >
                                        {isProcessing ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Procesando...
                                            </div>
                                        ) : (
                                            `Pagar Bs. ${total}`
                                        )}
                                    </Button>
                                </div>
                            </TabsContent>

                            {/* QR */}
                            <TabsContent value="qr" className="text-center py-8">
                                <div className="max-w-md mx-auto space-y-6">
                                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold mb-2">Pago con QR</h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            Escanea el código QR con tu aplicación bancaria para completar el pago
                                        </p>
                                        <div className="bg-white p-4 rounded-lg shadow-inner">
                                            <Image src="/qr.png" alt="Código QR" width={200} height={200} className="mx-auto" />
                                        </div>
                                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                            <p className="text-sm text-yellow-800">
                                                <strong>Monto a pagar:</strong> Bs. {total}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full" onClick={onQRPay}>
                                        Ya completé el pago
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animate-progress {
          animation: progress 3s ease-out forwards;
        }
      `}</style>
        </div>
    )
}

export default page
