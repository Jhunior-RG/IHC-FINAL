"use client"
import Search from "./Search"
import ShoppingCart from "./ShoppingCart"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

const NavBar = () => {
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
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Link href="/favoritos" className="group">
                            <div className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-200 group-hover:scale-105 transform">
                                <Heart className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors duration-200" />
                            </div>
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-sm">
                                6
                            </span>
                        </Link>
                    </div>
                    <div className="transform hover:scale-105 transition-transform duration-200">
                        <ShoppingCart />
                    </div>
                </div>

            </div>
        </>
    )
}

export default NavBar
