"use client"
import { ShoppingCart } from "lucide-react"
import type React from "react"

import { Button } from "./ui/button"

const ButtonAddShoppingCart = () => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Lógica para agregar al carrito
    console.log("Producto agregado al carrito")
  }

  return (
    <Button variant = {"secondary"} size="sm" onClick={handleAddToCart} className="flex items-center gap-1 text-xs px-3 py-1.5">
      <ShoppingCart className="w-3 h-3" />
      Agregar al carrito
    </Button>
  )
}

export default ButtonAddShoppingCart
