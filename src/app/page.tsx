"use client"
import SectionDiscountedProducts from "@/components/SectionDiscountedProducts"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronDown, Heart, Star, Users, HeartPulse } from "lucide-react"

const Page = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    setIsVisible(true)

    // Cambiar testimonios automáticamente
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "María González",
      text: "Mi perro Max nunca había estado tan saludable. PawFuel cambió su vida completamente.",
      rating: 5,
      pet: "Golden Retriever",
    },
    {
      name: "Carlos Mendoza",
      text: "La calidad de PawFuel es excepcional. Mi gata Luna lo ama y yo veo la diferencia.",
      rating: 5,
      pet: "Gato Persa",
    },
    {
      name: "Ana Rodríguez",
      text: "Desde que uso PawFuel, mi cachorro tiene más energía y su pelaje brilla increíblemente.",
      rating: 5,
      pet: "Labrador",
    },
  ]

  const stats = [
    { icon: Heart, number: "50K+", label: "Mascotas Felices" },
    { icon: Users, number: "25K+", label: "Familias Satisfechas" },
    { icon: Star, number: "4.9", label: "Calificación Promedio" },
    { icon: HeartPulse, number: "50+", label: "Productos saludables" },
  ]

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary relative overflow-hidden">
        {/* Elementos decorativos animados */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="h-screen flex sm:flex-row flex-col-reverse justify-center items-center relative z-10">
          {/* Lado izquierdo - Imágenes */}
          <div className="relative h-full w-full flex items-end justify-start">
            <Image
              className={`absolute top-0 left-0 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                }`}
              src="/cloud.png"
              alt="Nubes decorativas"
              width={700}
              height={500}
              priority
            />
            <Image
              className={`absolute left-0 bottom-0 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                }`}
              src="/dog1.png"
              alt="Perro feliz"
              width={600}
              height={600}
              priority
            />
          </div>

          {/* Lado derecho - Contenido */}
          <div className="flex flex-col items-center justify-center gap-8 w-full mr-10 px-4">
            <div
              className={`flex items-center justify-center gap-4 w-full transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <div className="relative">
                <Image src="/logoWhite.png" alt="PawFuel Logo" width={150} height={80} className="animate-pulse" />
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-ping"></div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white font-['Croissant_One'] animate-fade-in-up">
                  PawFuel
                </h1>
                <p className="text-white text-lg sm:text-xl animate-fade-in-up delay-700">
                  La energía que tu mascota necesita
                </p>
              </div>
            </div>

            <div
              className={`flex flex-col items-center gap-4 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <Link href="/catalogo">
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full text-base px-8 py-4 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                >
                  Ver Catálogo Completo
                </Button>
              </Link>
              <div className="py-16">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                      <div
                        key={index}
                        className={`text-center transform transition-all duration-700 delay-${index * 200} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                          }`}
                      >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                          <stat.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-3xl font-bold mb-2 text-white">{stat.number}</div>
                        <div className="text-white">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Indicador de scroll */}
              <div className="flex flex-col items-center mt-8 animate-bounce">
                <span className="text-white/80 text-sm mb-2">Descubre más</span>
                <ChevronDown className="h-6 w-6 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex items-center justify-between pt-16 pb-0">
        <div className="pl-10 max-w-xl ml-10 xl:ml-52">
          <h1
            style={{ color: "#265B8F" }}
            className="text-5xl font-semibold"
          >
            Descubre el plan de
          </h1>
          <h1
            style={{ color: "#265B8F" }}
            className="text-5xl font-semibold"
          >
            alimentación ideal
          </h1>
          <h1
            style={{ color: "#265B8F" }}
            className="text-5xl font-semibold"
          >
            para tu mascota
          </h1>
          <Link href="/recomendaciones">
            <Button
              variant="secondary"
              size="lg"
              className="mt-3 rounded-full text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="hidden sm:inline">Descubre el alimento adecuado para tu mascota</span>
              <span className="sm:hidden">Encuentra el alimento ideal</span>
            </Button>
          </Link>
        </div>

        <Image
          src="/perroJoy.png"
          alt="PawFuel"
          width={692.78}
          height={686}
          className="ml-auto object-contain w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[692.78px] h-auto"
        />
      </div>
      <div style={{ background: "#D5E5F4" }} className="m-0 p-0 h-172">
        <SectionDiscountedProducts />
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>
    </>
  )

  {/* Sección de Testimonios 
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Lo que dicen nuestros clientes</h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center relative overflow-hidden">
             
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>

              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-700 mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600 text-sm">Dueño de {testimonials[currentTestimonial].pet}</div>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentTestimonial ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      */}
}

export default Page
