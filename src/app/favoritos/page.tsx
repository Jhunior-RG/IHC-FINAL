import type { Product } from "../../components/horizontalCard"
import CardProduct from "../../components/horizontalCard"
import { Heart } from "lucide-react"

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

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Mis Favoritos</h1>
          <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
            {products.length} productos
          </span>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {products.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Heart className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes productos favoritos</h3>
            <p className="text-gray-600">Explora nuestro catálogo y agrega productos a tus favoritos</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
