"use client";
import React from "react";
import Search from "./Search";
import ShoppingCart from "./ShoppingCart";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

const NavBar = () => {
    return (
        <>
            <div className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="PawFuel"
                        width={45}
                        height={50}
                    />
                    <h1 className='text-3xl font-bold font-["Croissant_One"] text-primary'>
                        PawFuel
                    </h1>
                </div>
                <Search />
                <div className="flex items-center gap-4">
                    <Link href="/save-list">
                        <Heart />
                    </Link>
                    <ShoppingCart />
                </div>
            </div>
        </>
    );
};

export default NavBar;
