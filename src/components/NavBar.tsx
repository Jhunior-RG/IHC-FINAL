"use client"
import React from 'react'
import Search from './Search'
import ShoppingCart from './ShoppingCart'
import Image from 'next/image'

const NavBar = () => {
    return <>
        <div className='flex justify-between items-center p-4 border-b'>
            <div className='flex items-center gap-2'>
                <Image src="/logo.png" alt="PawFuel" width={50} height={50} />
                <h1 className='text-2xl font-bold font-["Croissant_One"] text-primary'>PawFuel</h1>
            </div>
            <Search />
            <ShoppingCart />
        </div>
    </>
}

export default NavBar