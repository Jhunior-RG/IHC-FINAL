"use client"
import Image from "next/image"
import ButtonAddShoppingCart from "./ButtonAddShoppingCart"
import { Heart, Trash2 } from "lucide-react"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import Link from "next/link"

export interface Product {
  id: number
  name: string
  price: number
  priceDiscount?: number
  image: string
  tags?: string[]
  stock?: number
  description?: string
}

const CardProduct = ({ product }: { product: Product }) => {
  const discountPercentage = product.priceDiscount
    ? Math.round(((product.price - product.priceDiscount) / product.price) * 100)
    : 0

  return (
    <Card className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 bg-white relative group">
      <div className="flex gap-4 h-full">
        <div className="relative flex-shrink-0">
          <Link href={`/product/${product.id}`}>
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative rounded-lg overflow-hidden bg-gray-50">
              <Image
                className="object-contain hover:scale-105 transition-transform duration-300"
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 96px, 128px"
              />
            </div>
          </Link>
          {product.priceDiscount && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <Link href={`/product/${product.id}`}>
              <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 hover:text-primary transition-colors duration-200 mb-2">
                {product.name}
              </h3>
            </Link>

            {product.description && (
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
            )}

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {product.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
                {product.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    +{product.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">Bs. {product.priceDiscount || product.price}</span>
                {product.priceDiscount && (
                  <span className="text-sm text-gray-500 line-through">Bs. {product.price}</span>
                )}
              </div>
              {product.stock !== undefined && (
                <span className={`text-xs ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <ButtonAddShoppingCart />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-start">
          <button
            className="p-2 rounded-full hover:bg-red-50 transition-colors duration-200 group"
            title="Quitar de favoritos"
          >
            <Heart className="w-5 h-5 text-red-500 fill-red-500 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </Card>
  )
}

export default CardProduct
