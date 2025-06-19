"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textArea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Settings,
  Bell,
  Shield,
  Globe,
  Truck,
  Eye,
  EyeOff,
  Save,
  AlertTriangle,
  CheckCircle,
  Mail,
  Smartphone,
  Lock,
  Trash2,
  Download,
  Moon,
  Sun,
  Languages,
  Clock,
  MapPin,
  CreditCard,
  User,
  Key,
  Database,
  Cookie,
  Palette,
  Plus,
} from "lucide-react"

const Configuracion = () => {
  // Estados para configuración de cuenta
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  // Estados para notificaciones
  const [notifications, setNotifications] = useState({
    emailPedidos: true,
    emailPromociones: false,
    emailNoticias: true,
    pushPedidos: true,
    pushPromociones: false,
    smsEntregas: true,
    smsPromociones: false,
  })

  // Estados para privacidad
  const [privacy, setPrivacy] = useState({
    perfilPublico: false,
    compartirDatos: false,
    cookiesAnalyticas: true,
    cookiesMarketing: false,
    historialCompras: true,
  })

  // Estados para configuración de aplicación
  const [appConfig, setAppConfig] = useState({
    idioma: "es",
    moneda: "BOB",
    tema: "light",
    zonaHoraria: "America/La_Paz",
  })

  // Estados para configuración de entrega
  const [deliveryConfig, setDeliveryConfig] = useState({
    horarioPreferido: "manana",
    instruccionesEspeciales: "",
    notificarVecinos: false,
    entregaSegura: true,
  })

  // Estados de UI
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleSaveSection = async (section: string) => {
    setIsLoading(true)
    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setShowSuccess(section)
    setTimeout(() => setShowSuccess(""), 3000)
  }

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    if (newPassword.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres")
      return
    }
    await handleSaveSection("password")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleDeleteAccount = async () => {
    setIsLoading(true)
    // Simular eliminación
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setShowDeleteDialog(false)
    alert("Cuenta eliminada exitosamente")
  }

  const togglePassword = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600 mt-2">Personaliza tu experiencia y gestiona tu cuenta</p>
      </div>

      <Tabs defaultValue="cuenta" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="cuenta" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Cuenta
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="privacidad" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacidad
          </TabsTrigger>
          <TabsTrigger value="aplicacion" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Aplicación
          </TabsTrigger>
          <TabsTrigger value="entrega" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Entrega
          </TabsTrigger>
        </TabsList>

        {/* Configuración de Cuenta */}
        <TabsContent value="cuenta">
          <div className="space-y-6">
            {/* Cambio de Contraseña */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Seguridad de la Cuenta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña Actual</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña actual"
                      />
                      <button
                        type="button"
                        onClick={() => togglePassword("current")}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Mínimo 8 caracteres"
                      />
                      <button
                        type="button"
                        onClick={() => togglePassword("new")}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repite la nueva contraseña"
                      />
                      <button
                        type="button"
                        onClick={() => togglePassword("confirm")}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    onClick={handlePasswordChange}
                    disabled={!currentPassword || !newPassword || !confirmPassword || isLoading}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Cambiar Contraseña
                  </Button>
                </div>

                {showSuccess === "password" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Contraseña actualizada exitosamente</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Verificación de Cuenta */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Verificación de Cuenta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Email Verificado</p>
                      <p className="text-sm text-gray-600">juan.perez@email.com</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Verificado</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-sm text-gray-600">+591 70123456</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Verificar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Zona Peligrosa */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Zona Peligrosa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2">Eliminar Cuenta</h4>
                  <p className="text-sm text-red-700 mb-4">
                    Esta acción eliminará permanentemente tu cuenta y todos los datos asociados. Esta acción no se puede
                    deshacer.
                  </p>

                  <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar Cuenta
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="h-5 w-5" />
                          ¿Estás seguro?
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-gray-600">Esta acción eliminará permanentemente tu cuenta, incluyendo:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          <li>Información personal</li>
                          <li>Historial de pedidos</li>
                          <li>Direcciones guardadas</li>
                          <li>Métodos de pago</li>
                          <li>Reseñas y calificaciones</li>
                        </ul>
                        <div className="flex justify-end gap-3 pt-4">
                          <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            Cancelar
                          </Button>
                          <Button variant="destructive" onClick={handleDeleteAccount} disabled={isLoading}>
                            {isLoading ? "Eliminando..." : "Sí, eliminar cuenta"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configuración de Notificaciones */}
        <TabsContent value="notificaciones">
          <div className="space-y-6">
            {/* Notificaciones por Email */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Notificaciones por Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Actualizaciones de pedidos</p>
                      <p className="text-sm text-gray-600">Confirmaciones, envíos y entregas</p>
                    </div>
                    <Switch
                      checked={notifications.emailPedidos}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailPedidos: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promociones y ofertas</p>
                      <p className="text-sm text-gray-600">Descuentos especiales y nuevos productos</p>
                    </div>
                    <Switch
                      checked={notifications.emailPromociones}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailPromociones: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Noticias y consejos</p>
                      <p className="text-sm text-gray-600">Artículos sobre cuidado de mascotas</p>
                    </div>
                    <Switch
                      checked={notifications.emailNoticias}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailNoticias: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notificaciones Push */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  Notificaciones Push
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Estado de pedidos</p>
                      <p className="text-sm text-gray-600">Notificaciones instantáneas de tus pedidos</p>
                    </div>
                    <Switch
                      checked={notifications.pushPedidos}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pushPedidos: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ofertas flash</p>
                      <p className="text-sm text-gray-600">Promociones por tiempo limitado</p>
                    </div>
                    <Switch
                      checked={notifications.pushPromociones}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pushPromociones: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notificaciones SMS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  Notificaciones SMS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Entregas</p>
                      <p className="text-sm text-gray-600">SMS cuando tu pedido esté en camino</p>
                    </div>
                    <Switch
                      checked={notifications.smsEntregas}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsEntregas: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promociones</p>
                      <p className="text-sm text-gray-600">Ofertas especiales por SMS</p>
                    </div>
                    <Switch
                      checked={notifications.smsPromociones}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsPromociones: checked })}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => handleSaveSection("notifications")} disabled={isLoading}>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Preferencias
                  </Button>
                </div>

                {showSuccess === "notifications" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Preferencias de notificaciones guardadas</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configuración de Privacidad */}
        <TabsContent value="privacidad">
          <div className="space-y-6">
            {/* Privacidad del Perfil */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Privacidad del Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Perfil público</p>
                    <p className="text-sm text-gray-600">Permitir que otros usuarios vean tu perfil</p>
                  </div>
                  <Switch
                    checked={privacy.perfilPublico}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, perfilPublico: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Historial de compras</p>
                    <p className="text-sm text-gray-600">Mostrar productos comprados en tu perfil</p>
                  </div>
                  <Switch
                    checked={privacy.historialCompras}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, historialCompras: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Uso de Datos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Uso de Datos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compartir datos para mejorar el servicio</p>
                    <p className="text-sm text-gray-600">Ayúdanos a personalizar tu experiencia</p>
                  </div>
                  <Switch
                    checked={privacy.compartirDatos}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, compartirDatos: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cookie className="h-5 w-5 text-primary" />
                  Preferencias de Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cookies analíticas</p>
                    <p className="text-sm text-gray-600">Nos ayudan a entender cómo usas la aplicación</p>
                  </div>
                  <Switch
                    checked={privacy.cookiesAnalyticas}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, cookiesAnalyticas: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cookies de marketing</p>
                    <p className="text-sm text-gray-600">Para mostrarte anuncios relevantes</p>
                  </div>
                  <Switch
                    checked={privacy.cookiesMarketing}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, cookiesMarketing: checked })}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => handleSaveSection("privacy")} disabled={isLoading}>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Configuración
                  </Button>
                </div>

                {showSuccess === "privacy" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Configuración de privacidad guardada</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Descargar Datos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  Tus Datos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Puedes descargar una copia de todos tus datos personales que tenemos almacenados.
                </p>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Mis Datos
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configuración de Aplicación */}
        <TabsContent value="aplicacion">
          <div className="space-y-6">
            {/* Idioma y Región */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Idioma y Región
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Select
                      value={appConfig.idioma}
                      onValueChange={(value) => setAppConfig({ ...appConfig, idioma: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">
                          <div className="flex items-center gap-2">
                            <Languages className="h-4 w-4" />
                            Español
                          </div>
                        </SelectItem>
                        <SelectItem value="en">
                          <div className="flex items-center gap-2">
                            <Languages className="h-4 w-4" />
                            English
                          </div>
                        </SelectItem>
                        <SelectItem value="pt">
                          <div className="flex items-center gap-2">
                            <Languages className="h-4 w-4" />
                            Português
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Moneda</Label>
                    <Select
                      value={appConfig.moneda}
                      onValueChange={(value) => setAppConfig({ ...appConfig, moneda: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BOB">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Boliviano (Bs.)
                          </div>
                        </SelectItem>
                        <SelectItem value="USD">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Dólar ($)
                          </div>
                        </SelectItem>
                        <SelectItem value="EUR">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Euro (€)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Zona Horaria</Label>
                  <Select
                    value={appConfig.zonaHoraria}
                    onValueChange={(value) => setAppConfig({ ...appConfig, zonaHoraria: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/La_Paz">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          La Paz (GMT-4)
                        </div>
                      </SelectItem>
                      <SelectItem value="America/Lima">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Lima (GMT-5)
                        </div>
                      </SelectItem>
                      <SelectItem value="America/Sao_Paulo">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          São Paulo (GMT-3)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Apariencia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Apariencia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <Select value={appConfig.tema} onValueChange={(value) => setAppConfig({ ...appConfig, tema: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          Claro
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Oscuro
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Sistema
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => handleSaveSection("app")} disabled={isLoading}>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Configuración
                  </Button>
                </div>

                {showSuccess === "app" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Configuración de aplicación guardada</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configuración de Entrega */}
        <TabsContent value="entrega">
          <div className="space-y-6">
            {/* Preferencias de Entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Preferencias de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Horario Preferido</Label>
                  <Select
                    value={deliveryConfig.horarioPreferido}
                    onValueChange={(value) => setDeliveryConfig({ ...deliveryConfig, horarioPreferido: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manana">Mañana (8:00 - 12:00)</SelectItem>
                      <SelectItem value="tarde">Tarde (12:00 - 18:00)</SelectItem>
                      <SelectItem value="noche">Noche (18:00 - 21:00)</SelectItem>
                      <SelectItem value="cualquiera">Cualquier horario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Instrucciones Especiales</Label>
                  <Textarea
                    placeholder="Ej: Tocar el timbre dos veces, dejar en la puerta, etc."
                    value={deliveryConfig.instruccionesEspeciales}
                    onChange={(e) => setDeliveryConfig({ ...deliveryConfig, instruccionesEspeciales: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificar a vecinos</p>
                      <p className="text-sm text-gray-600">Si no estás, ¿podemos entregar a un vecino?</p>
                    </div>
                    <Switch
                      checked={deliveryConfig.notificarVecinos}
                      onCheckedChange={(checked) => setDeliveryConfig({ ...deliveryConfig, notificarVecinos: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Entrega segura</p>
                      <p className="text-sm text-gray-600">Requiere confirmación de identidad</p>
                    </div>
                    <Switch
                      checked={deliveryConfig.entregaSegura}
                      onCheckedChange={(checked) => setDeliveryConfig({ ...deliveryConfig, entregaSegura: checked })}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => handleSaveSection("delivery")} disabled={isLoading}>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Preferencias
                  </Button>
                </div>

                {showSuccess === "delivery" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Preferencias de entrega guardadas</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ubicaciones Frecuentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Ubicaciones Frecuentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Guarda ubicaciones que visitas frecuentemente para entregas más rápidas.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">Oficina</p>
                        <p className="text-sm text-gray-600">Calle Comercio #456, Centro</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Frecuente</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">Casa de mamá</p>
                        <p className="text-sm text-gray-600">Av. 6 de Agosto #789, Sopocachi</p>
                      </div>
                    </div>
                    <Badge variant="outline">Ocasional</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Nueva Ubicación
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Configuracion
