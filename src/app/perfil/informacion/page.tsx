"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CreditCard,
  Shield,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react"

const InformacionPersonal = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [userInfo, setUserInfo] = useState({
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@email.com",
    telefono: "+591 70123456",
    fechaNacimiento: "1990-05-15",
    genero: "masculino",
    direccion: "Av. Ballivián #123, Zona Sur",
    ciudad: "La Paz",
    pais: "Bolivia",
  })

  const [paymentMethods] = useState([
    {
      id: 1,
      type: "visa",
      lastFour: "4532",
      expiryDate: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "mastercard",
      lastFour: "8901",
      expiryDate: "08/26",
      isDefault: false,
    },
  ])

  const [transactions] = useState([
    {
      id: 1,
      date: "2024-01-15",
      amount: 250.5,
      description: "Royal Canin Adult 15kg",
      status: "completado",
      method: "Visa ****4532",
    },
    {
      id: 2,
      date: "2024-01-10",
      amount: 89.99,
      description: "Collar antipulgas + Snacks",
      status: "completado",
      method: "Mastercard ****8901",
    },
    {
      id: 3,
      date: "2024-01-05",
      amount: 156.75,
      description: "Arena sanitaria + Juguetes",
      status: "pendiente",
      method: "Visa ****4532",
    },
  ])

  const handleSave = () => {
    setIsEditing(false)
    // Aquí iría la lógica para guardar los cambios
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Aquí podrías revertir los cambios si es necesario
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completado":
        return "bg-green-100 text-green-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "💳"
      case "mastercard":
        return "💳"
      default:
        return "💳"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
        <p className="text-gray-600 mt-2">Gestiona tu información personal y métodos de pago</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Información Personal
          </TabsTrigger>
          <TabsTrigger value="pagos" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Métodos de Pago
          </TabsTrigger>
          <TabsTrigger value="historial" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Historial de Pagos
          </TabsTrigger>
        </TabsList>

        {/* Información Personal */}
        <TabsContent value="personal">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Personal
              </CardTitle>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    value={userInfo.nombre}
                    onChange={(e) => setUserInfo({ ...userInfo, nombre: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input
                    id="apellido"
                    value={userInfo.apellido}
                    onChange={(e) => setUserInfo({ ...userInfo, apellido: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="telefono"
                      value={userInfo.telefono}
                      onChange={(e) => setUserInfo({ ...userInfo, telefono: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="fechaNacimiento"
                      type="date"
                      value={userInfo.fechaNacimiento}
                      onChange={(e) => setUserInfo({ ...userInfo, fechaNacimiento: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genero">Género</Label>
                  <select
                    id="genero"
                    value={userInfo.genero}
                    onChange={(e) => setUserInfo({ ...userInfo, genero: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                  >
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                    <option value="prefiero-no-decir">Prefiero no decir</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Dirección
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                      id="direccion"
                      value={userInfo.direccion}
                      onChange={(e) => setUserInfo({ ...userInfo, direccion: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ciudad">Ciudad</Label>
                    <Input
                      id="ciudad"
                      value={userInfo.ciudad}
                      onChange={(e) => setUserInfo({ ...userInfo, ciudad: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Cambio de Contraseña */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Seguridad
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña Actual</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        disabled={!isEditing}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <Input id="newPassword" type="password" placeholder="••••••••" disabled={!isEditing} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Métodos de Pago */}
        <TabsContent value="pagos">
          <div className="space-y-6 mb-30">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Métodos de Pago
                </CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Tarjeta
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border rounded-lg p-4 relative">
                      {method.isDefault && <Badge className="absolute top-2 right-2 text-xs">Predeterminada</Badge>}
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{getCardIcon(method.type)}</div>
                        <div className="flex-1">
                          <p className="font-medium capitalize">{method.type}</p>
                          <p className="text-sm text-gray-600">•••• •••• •••• {method.lastFour}</p>
                          <p className="text-xs text-gray-500">Expira {method.expiryDate}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Historial de Pagos */}
        <TabsContent value="historial">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Historial de Pagos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{transaction.description}</h3>
                          <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Fecha: {new Date(transaction.date).toLocaleDateString("es-ES")}</p>
                          <p>Método: {transaction.method}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">Bs. {transaction.amount}</p>
                        <Button variant="ghost" size="sm" className="mt-2">
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default InformacionPersonal
