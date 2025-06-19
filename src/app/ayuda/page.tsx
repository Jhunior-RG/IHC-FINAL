"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textArea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  HelpCircle,
  Search,
  ShoppingCart,
  Package,
  CreditCard,
  Truck,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  User,
  MapPin,
  Shield,
  Heart,
  Gift,
  RefreshCw,
  FileText,
  Video,
  BookOpen,
  Headphones,
  Send,
  ArrowRight,
  Download,
  ExternalLink,
} from "lucide-react"

const AyudaPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [contactForm, setContactForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  })

  const categorias = [
    { id: "todos", label: "Todas las categorías", icon: HelpCircle },
    { id: "pedidos", label: "Pedidos", icon: ShoppingCart },
    { id: "pagos", label: "Pagos", icon: CreditCard },
    { id: "envios", label: "Envíos", icon: Truck },
    { id: "cuenta", label: "Mi Cuenta", icon: User },
    { id: "productos", label: "Productos", icon: Package },
  ]

  const preguntasFrecuentes = [
    {
      categoria: "pedidos",
      pregunta: "¿Cómo puedo realizar un pedido?",
      respuesta:
        "Para realizar un pedido, busca el producto que deseas, agrégalo al carrito y sigue el proceso de checkout. Necesitarás proporcionar tu dirección de entrega y método de pago.",
    },
    {
      categoria: "pedidos",
      pregunta: "¿Puedo modificar o cancelar mi pedido?",
      respuesta:
        "Puedes modificar o cancelar tu pedido dentro de los primeros 30 minutos después de realizarlo, siempre que no haya sido procesado aún. Ve a 'Mis Pedidos' en tu perfil.",
    },
    {
      categoria: "pedidos",
      pregunta: "¿Cuál es el monto mínimo de pedido?",
      respuesta:
        "El monto mínimo de pedido es de Bs. 50 para entregas a domicilio. No hay monto mínimo para retiro en sucursal.",
    },
    {
      categoria: "envios",
      pregunta: "¿Cuánto tiempo tarda la entrega?",
      respuesta:
        "Las entregas en La Paz se realizan en 24-48 horas. Para otras ciudades, el tiempo de entrega es de 3-5 días hábiles.",
    },
    {
      categoria: "envios",
      pregunta: "¿Cómo puedo rastrear mi pedido?",
      respuesta:
        "Puedes rastrear tu pedido en tiempo real desde 'Mis Pedidos' en tu perfil. También recibirás notificaciones por SMS y email con actualizaciones.",
    },
    {
      categoria: "envios",
      pregunta: "¿Cuáles son los costos de envío?",
      respuesta:
        "El envío es gratuito para pedidos mayores a Bs. 100 en La Paz. Para pedidos menores, el costo es de Bs. 15. Para otras ciudades, consulta nuestra tabla de tarifas.",
    },
    {
      categoria: "pagos",
      pregunta: "¿Qué métodos de pago aceptan?",
      respuesta:
        "Aceptamos tarjetas de crédito/débito (Visa, Mastercard), pagos QR, transferencias bancarias y pago contra entrega.",
    },
    {
      categoria: "pagos",
      pregunta: "¿Es seguro pagar en línea?",
      respuesta:
        "Sí, utilizamos encriptación SSL de 256 bits y cumplimos con los estándares PCI DSS para proteger tu información financiera.",
    },
    {
      categoria: "cuenta",
      pregunta: "¿Cómo creo una cuenta?",
      respuesta:
        "Haz clic en el ícono de usuario en la parte superior derecha y selecciona 'Registrarse'. Solo necesitas tu email y crear una contraseña.",
    },
    {
      categoria: "cuenta",
      pregunta: "Olvidé mi contraseña, ¿qué hago?",
      respuesta:
        "En la página de inicio de sesión, haz clic en '¿Olvidaste tu contraseña?' e ingresa tu email. Te enviaremos un enlace para restablecerla.",
    },
    {
      categoria: "productos",
      pregunta: "¿Cómo sé qué alimento es mejor para mi mascota?",
      respuesta:
        "Usa nuestro recomendador inteligente en la sección 'Recomendados'. Te ayudará a encontrar el alimento perfecto según la raza, edad y tamaño de tu mascota.",
    },
    {
      categoria: "productos",
      pregunta: "¿Los productos tienen garantía?",
      respuesta:
        "Todos nuestros productos tienen garantía de calidad. Si no estás satisfecho, puedes devolverlo dentro de los 30 días posteriores a la compra.",
    },
  ]

  const tutoriales = [
    {
      id: "como-comprar",
      titulo: "Cómo realizar tu primera compra",
      descripcion: "Aprende paso a paso cómo comprar en PawFuel",
      duracion: "5 min",
      pasos: [
        {
          titulo: "Busca tu producto",
          descripcion: "Usa la barra de búsqueda o navega por categorías para encontrar lo que necesitas.",
          icono: Search,
        },
        {
          titulo: "Agrega al carrito",
          descripcion: "Selecciona la cantidad deseada y haz clic en 'Agregar al carrito'.",
          icono: ShoppingCart,
        },
        {
          titulo: "Revisa tu pedido",
          descripcion: "Ve al carrito para revisar los productos y cantidades antes de proceder.",
          icono: Package,
        },
        {
          titulo: "Completa tu información",
          descripcion: "Ingresa tu dirección de entrega y selecciona el método de pago.",
          icono: MapPin,
        },
        {
          titulo: "Confirma y paga",
          descripcion: "Revisa todo una vez más y confirma tu pedido para proceder al pago.",
          icono: CreditCard,
        },
      ],
    },
    {
      id: "seguimiento",
      titulo: "Cómo hacer seguimiento de tu pedido",
      descripcion: "Mantente informado sobre el estado de tu pedido",
      duracion: "3 min",
      pasos: [
        {
          titulo: "Accede a tu perfil",
          descripcion: "Haz clic en el ícono de usuario y selecciona 'Mis Pedidos'.",
          icono: User,
        },
        {
          titulo: "Encuentra tu pedido",
          descripcion: "Busca el pedido que quieres rastrear en la lista de pedidos activos.",
          icono: Package,
        },
        {
          titulo: "Ve el estado en tiempo real",
          descripcion: "Observa la barra de progreso que muestra el estado actual de tu pedido.",
          icono: Truck,
        },
        {
          titulo: "Recibe notificaciones",
          descripcion: "Te enviaremos actualizaciones por SMS y email en cada etapa del proceso.",
          icono: MessageCircle,
        },
      ],
    },
    {
      id: "recomendador",
      titulo: "Usar el recomendador inteligente",
      descripcion: "Encuentra el alimento perfecto para tu mascota",
      duracion: "4 min",
      pasos: [
        {
          titulo: "Ve a Recomendados",
          descripcion: "Navega a la sección 'Recomendados' desde el menú principal.",
          icono: Star,
        },
        {
          titulo: "Selecciona tu mascota",
          descripcion: "Elige si tienes un perro o gato para personalizar las recomendaciones.",
          icono: Heart,
        },
        {
          titulo: "Completa la información",
          descripcion: "Proporciona detalles sobre raza, edad, tamaño y peso de tu mascota.",
          icono: FileText,
        },
        {
          titulo: "Obtén recomendaciones",
          descripcion: "Recibe una lista personalizada de productos ideales para tu compañero.",
          icono: Gift,
        },
      ],
    },
  ]

  const contactOptions = [
    {
      titulo: "Chat en Vivo",
      descripcion: "Habla con nuestro equipo de soporte",
      horario: "Lun-Vie: 8:00-20:00, Sáb: 9:00-17:00",
      icono: MessageCircle,
      disponible: true,
      accion: "Iniciar Chat",
    },
    {
      titulo: "Teléfono",
      descripcion: "+591 2-123-4567",
      horario: "Lun-Vie: 8:00-18:00",
      icono: Phone,
      disponible: true,
      accion: "Llamar",
    },
    {
      titulo: "Email",
      descripcion: "soporte@pawfuel.com",
      horario: "Respuesta en 24 horas",
      icono: Mail,
      disponible: true,
      accion: "Enviar Email",
    },
    {
      titulo: "WhatsApp",
      descripcion: "+591 70-123-456",
      horario: "Lun-Dom: 8:00-22:00",
      icono: MessageCircle,
      disponible: true,
      accion: "Escribir",
    },
  ]

  const filteredFAQs = preguntasFrecuentes.filter((faq) => {
    const matchesCategory = selectedCategory === "todos" || faq.categoria === selectedCategory
    const matchesSearch =
      faq.pregunta.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.respuesta.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleContactSubmit = () => {
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", contactForm)
    alert("Mensaje enviado exitosamente. Te responderemos pronto.")
    setContactForm({ nombre: "", email: "", asunto: "", mensaje: "" })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Centro de Ayuda</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Encuentra respuestas rápidas a tus preguntas o contacta con nuestro equipo de soporte
        </p>
      </div>

      {/* Búsqueda rápida */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Busca tu pregunta aquí..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="faq" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Preguntas Frecuentes
          </TabsTrigger>
          <TabsTrigger value="tutoriales" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Tutoriales
          </TabsTrigger>
          <TabsTrigger value="contacto" className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            Contacto
          </TabsTrigger>
          <TabsTrigger value="recursos" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Recursos
          </TabsTrigger>
        </TabsList>

        {/* Preguntas Frecuentes */}
        <TabsContent value="faq">
          <div className="space-y-6">
            {/* Filtros por categoría */}
            <div className="flex flex-wrap gap-2">
              {categorias.map((categoria) => (
                <Button
                  key={categoria.id}
                  variant={selectedCategory === categoria.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(categoria.id)}
                  className="rounded-full"
                >
                  <categoria.icon className="h-4 w-4 mr-2" />
                  {categoria.label}
                </Button>
              ))}
            </div>

            {/* Lista de preguntas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Preguntas Frecuentes
                  <Badge variant="secondary">{filteredFAQs.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No se encontraron preguntas que coincidan con tu búsqueda.</p>
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left hover:text-primary">{faq.pregunta}</AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed">{faq.respuesta}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tutoriales */}
        <TabsContent value="tutoriales">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {tutoriales.map((tutorial) => (
                <Card key={tutorial.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {tutorial.duracion}
                      </Badge>
                      <Video className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{tutorial.titulo}</CardTitle>
                    <p className="text-gray-600 text-sm">{tutorial.descripcion}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tutorial.pasos.map((paso, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <paso.icono className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{paso.titulo}</p>
                            <p className="text-xs text-gray-600">{paso.descripcion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Ver Tutorial Completo
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Video destacado */}
            <Card className="bg-gradient-to-r from-primary/5 to-blue/5">
              <CardContent className="p-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <Video className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Video: Guía Completa de PawFuel</h3>
                    <p className="text-gray-600 mb-4">
                      Aprende todo lo que necesitas saber sobre nuestra plataforma en este video de 10 minutos.
                    </p>
                    <Button>
                      <Video className="h-4 w-4 mr-2" />
                      Ver Video
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Contacto */}
        <TabsContent value="contacto">
          <div className="space-y-8">
            {/* Opciones de contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactOptions.map((option, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <option.icono className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{option.titulo}</h3>
                    <p className="text-gray-600 text-sm mb-2">{option.descripcion}</p>
                    <p className="text-xs text-gray-500 mb-4">{option.horario}</p>
                    <Button size="sm" className="w-full" disabled={!option.disponible}>
                      {option.accion}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Formulario de contacto */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5 text-primary" />
                    Envíanos un Mensaje
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nombre *</label>
                      <Input
                        value={contactForm.nombre}
                        onChange={(e) => setContactForm({ ...contactForm, nombre: e.target.value })}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <Input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Asunto *</label>
                    <Input
                      value={contactForm.asunto}
                      onChange={(e) => setContactForm({ ...contactForm, asunto: e.target.value })}
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mensaje *</label>
                    <Textarea
                      value={contactForm.mensaje}
                      onChange={(e) => setContactForm({ ...contactForm, mensaje: e.target.value })}
                      placeholder="Describe tu consulta o problema..."
                      rows={5}
                    />
                  </div>
                  <Button
                    onClick={handleContactSubmit}
                    className="w-full"
                    disabled={!contactForm.nombre || !contactForm.email || !contactForm.asunto || !contactForm.mensaje}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Horarios de Atención
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Lunes - Viernes</span>
                      <span className="text-green-600 font-medium">8:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Sábados</span>
                      <span className="text-green-600 font-medium">9:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Domingos</span>
                      <span className="text-gray-500 font-medium">Cerrado</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-800 mb-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Tiempo de Respuesta</span>
                    </div>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Chat en vivo: Inmediato</li>
                      <li>• Email: 24 horas</li>
                      <li>• WhatsApp: 2-4 horas</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Recursos */}
        <TabsContent value="recursos">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Guía de Alimentación</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Descarga nuestra guía completa sobre alimentación para mascotas
                  </p>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Políticas de Privacidad</h3>
                  <p className="text-gray-600 text-sm mb-4">Conoce cómo protegemos tu información personal</p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Políticas
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Términos y Condiciones</h3>
                  <p className="text-gray-600 text-sm mb-4">Lee nuestros términos de servicio y condiciones de uso</p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Términos
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Estado del servicio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Estado del Servicio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="font-medium">Sitio Web</p>
                      <p className="text-sm text-gray-600">Funcionando correctamente</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="font-medium">Pagos</p>
                      <p className="text-sm text-gray-600">Todos los métodos activos</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="font-medium">Entregas</p>
                      <p className="text-sm text-gray-600">Operando normalmente</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AyudaPage
