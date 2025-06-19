"use client"
import { useState, useRef, useEffect } from "react"
import Search from "./Search"
import Image from "next/image"
import Link from "next/link"
import { Heart, CircleUserRound, MapPin, Package, User, Settings, LogOut, ChevronDown, Menu,} from "lucide-react"
import ShoppingCart from "./ShoppingCart"

const NavBar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const userMenuItems = [
    {
      icon: User,
      label: "Información personal",
      href: "/perfil/informacion",
    },
    {
      icon: Package,
      label: "Mis pedidos",
      href: "/perfil/pedidos",
    },
    {
      icon: MapPin,
      label: "Mis direcciones",
      href: "/perfil/direcciones",
    },
    {
      icon: Heart,
      label: "Lista de favoritos",
      href: "/favoritos",
    },
    {
      icon: Settings,
      label: "Configuración",
      href: "/perfil/configuracion",
    },
  ]

  return (
    <>
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm">
        <div className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-200">
          <div className="relative">
            <Link href={"/#"}>
              <Image src="/logo.png" alt="PawFuel" width={45} height={50} className="rounded-lg shadow-sm" />
            </Link>
          </div>
          <div>
            <h1 className='text-3xl font-bold font-["Croissant_One"] text-primary leading-tight'>PawFuel</h1>
          </div>
        </div>
        <div className="flex-1 max-w-2xl mx-8">
          <Search />
        </div>
        {/* Menú de Navegación Principal */}
        <nav className="hidden lg:flex items-center gap-8 ml-8">
          <Link
            href="/catalogo"
            className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 relative group"
          >
            Catálogo
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link
            href="/recomendaciones"
            className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 relative group"
          >
            Recomendador Inteligente
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
          </Link>
        </nav>
        {/* Menú móvil hamburguesa */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>

        {/* Menú móvil desplegable */}
        {showMobileMenu && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg lg:hidden z-40">
            <div className="px-6 py-4 space-y-3">
              <Link
                href="/catalogo"
                className="block text-gray-700 hover:text-primary font-medium transition-colors duration-200 py-2"
                onClick={() => setShowMobileMenu(false)}
              >
                Catálogo
              </Link>
              <Link
                href="/recomendaciones"
                className="block text-gray-700 hover:text-primary font-medium transition-colors duration-200 py-2"
                onClick={() => setShowMobileMenu(false)}
              >
                Recomendador Inteligente
              </Link>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 mr-10">
          <ShoppingCart />

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1 p-2 rounded-full hover:bg-primary/10 transition-colors duration-200 hover:scale-105 transform"
            >
              <CircleUserRound className="h-6 w-6 text-gray-600 hover:text-primary transition-colors duration-200" />
              <ChevronDown
                className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${showUserMenu ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Usuario</p>
                      <p className="text-sm text-gray-500">usuario@email.com</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {userMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 pt-2">
                  <button
                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                    onClick={() => {
                      setShowUserMenu(false)
                      // Aquí puedes agregar la lógica de logout
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Cerrar sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar
