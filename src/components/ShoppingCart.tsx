import React from "react";

import {  ShoppingCartIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const ShoppingCart = () => {
    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <ShoppingCartIcon />
                </PopoverTrigger>
                <PopoverContent>
                    Place content for the popover here.
                </PopoverContent>
            </Popover>
        </>
    );
};

export default ShoppingCart;
