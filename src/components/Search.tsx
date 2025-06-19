"use client"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { SearchIcon, Clock, TrendingUp, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

// Datos de ejemplo para la wea
const mockProducts = [
  {
    id: 1,
    name: "Royal Canin Adult",
    category: "Alimento Perros",
    price: "Bs. 45.99",
    image: "/placeholder.svg?height=40&width=40",
    popular: true,
  },
  {
    id: 2,
    name: "Whiskas Adulto Atún",
    category: "Alimento Gatos",
    price: "Bs. 12.50",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Kong Classic Rojo",
    category: "Juguetes",
    price: "Bs. 18.99",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Collar Antipulgas Seresto",
    category: "Accesorios",
    price: "Bs. 65.00",
    image: "/placeholder.svg?height=40&width=40",
    popular: true,
  },
  {
    id: 5,
    name: "Arena Sanitaria Fresh Step",
    category: "Higiene Gatos",
    price: "Bs. 22.99",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Snacks Dentales Pedigree",
    category: "Snacks Perros",
    price: "Bs. 8.75",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const recentSearches = ["Royal Canin", "Collar antipulgas", "Juguetes gatos"]
const popularSearches = ["Alimento perros", "Arena gatos", "Snacks", "Correas"]

const Search = () => {
  const [value, setValue] = useState("")
  const [results, setResults] = useState<typeof mockProducts>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value.length > 0) {
      setIsLoading(true)
      // Soy el Jhon y voy a simular el delay XD
      const timer = setTimeout(() => {
        const filtered = mockProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(value.toLowerCase()) ||
            product.category.toLowerCase().includes(value.toLowerCase()),
        )
        setResults(filtered)
        setIsLoading(false)
        setIsOpen(true)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setResults([])
      setIsLoading(false)
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (selectedProduct: (typeof mockProducts)[0]) => {
    setValue(selectedProduct.name)
    setIsOpen(false)
    // Aquí se navega JR
  }

  const handleQuickSearch = (searchTerm: string) => {
    setValue(searchTerm)
  }

  const clearSearch = () => {
    setValue("")
    setIsOpen(false)
  }

  const handleFocus = () => {
    if (value.length === 0) {
      setIsOpen(true)
    }
  }

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-3 h-4 w-4 text-muted-foreground z-10" />
        <Input
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleFocus}
          value={value}
          placeholder="Buscar productos, marcas, categorías..."
          className="w-full pl-10 pr-10 h-11 border-2 focus:border-primary transition-colors"
        />
        {value && (
          <Button variant="ghost" size="icon" className="absolute right-1 h-8 w-8 hover:bg-muted" onClick={clearSearch}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border-2 border-gray-100 z-50 max-h-96 overflow-hidden">
          <Command className="rounded-lg">
            <CommandList className="max-h-96">
              {value.length === 0 ? (
                // Mostrar búsquedas recientes y populares cuando no hay texto
                <div className="p-4 space-y-4">
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">Búsquedas recientes</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                            onClick={() => handleQuickSearch(search)}
                          >
                            {search}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Búsquedas populares</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((search, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                          onClick={() => handleQuickSearch(search)}
                        >
                          {search}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  <p className="text-sm text-muted-foreground mt-2">Buscando...</p>
                </div>
              ) : results.length === 0 ? (
                <CommandEmpty className="py-6">
                  <div className="text-center">
                    <SearchIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">No se encontraron resultados</p>
                    <p className="text-xs text-muted-foreground">Intenta con otros términos de búsqueda</p>
                  </div>
                </CommandEmpty>
              ) : (
                <CommandGroup>
                  {results.map((product) => (
                    <CommandItem
                      key={product.id}
                      onSelect={() => handleSelect(product)}
                      className="cursor-pointer hover:bg-muted/50 p-3"
                    >
                      <Link onClick={clearSearch} href={`/product/${product.id}`}>
                        <div className="flex items-center gap-3 w-full">
                          <div className="relative">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="rounded-md object-cover"
                            />
                            {product.popular && (
                              <Badge className="absolute -top-1 -right-1 text-xs px-1 py-0 h-4">Popular</Badge>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-sm text-primary">{product.price}</p>
                          </div>
                        </div>
                      </Link >
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}

export default Search
