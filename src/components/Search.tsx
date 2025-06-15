"use client"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Search as SearchIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Input } from './ui/input'

// Datos de ejemplo - Reemplazar con tu API real
const mockProducts = [
    "Laptop HP",
    "Monitor Dell",
    "Teclado Mecánico",
    "Mouse Gaming",
    "Auriculares Bluetooth",
    "Tablet Samsung",
    "Smartphone Xiaomi",
    "Cámara Canon"
]

const Search = () => {
    const [value, setValue] = useState("")
    const [results, setResults] = useState<string[]>([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (value.length > 0) {
            const filtered = mockProducts.filter(product =>
                product.toLowerCase().includes(value.toLowerCase())
            )
            setResults(filtered)
            setIsOpen(true)
        } else {
            setResults([])
            setIsOpen(false)
        }
    }, [value])

    const handleSelect = (selectedValue: string) => {
        setValue(selectedValue)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <div className='flex items-center'>
                <Input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    placeholder="Buscar productos..."
                    className="w-[300px] pr-8"
                />
                <SearchIcon className="absolute right-2 h-4 w-4 text-gray-500" />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 w-[300px] mt-1 bg-white rounded-md shadow-lg border">
                    <Command>
                        <CommandList>
                            {results.length === 0 ? (
                                <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                            ) : (
                                <CommandGroup>
                                    {results.map((product, index) => (
                                        <CommandItem
                                            key={index}
                                            onSelect={() => handleSelect(product)}
                                            className="cursor-pointer hover:bg-gray-100"
                                        >
                                            {product}
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