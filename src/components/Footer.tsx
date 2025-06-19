"use client"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="mt-auto bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2">
                <Image className="object-cover" alt="Logo PawFuel" src={"/logoWhite.png"} width={40} height={40} />
              </div>
              <h2 className="text-3xl font-bold font-['Croissant_One'] text-white">PawFuel</h2>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-sm">
              Encuentra los mejores productos para tu mascota con envío a domicilio a la puerta de tu casa.
            </p>
          </div>    
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/productos"
                  className="text-primary-foreground/80 hover:text-white transition-colors text-sm"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-primary-foreground/80 hover:text-white transition-colors text-sm"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/ayuda" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">
                  Ayuda
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Síguenos</h3>
            <div className="flex gap-4">
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Image
                  src={"/facebook.png"}
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="filter brightness-0 invert"
                />
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Image
                  src={"/instagram.png"}
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="filter brightness-0 invert"
                />
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Image
                  src={"/call-center.png"}
                  alt="Centro de llamadas"
                  width={20}
                  height={20}
                  className="filter brightness-0 invert"
                />
              </Link>
            </div>
            <div className="text-sm text-primary-foreground/80">
              <p>📞 +(591) 63639584</p>
              <p>📧 info@pawfuel.com</p>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} PawFuel. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacidad" className="text-primary-foreground/60 hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-primary-foreground/60 hover:text-white transition-colors">
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
