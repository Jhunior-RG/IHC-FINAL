"use client";
import Image from "next/image";

const Footer = () => {
    return (
        <div className="bg-primary text-primary-foreground flex p-2 justify-between">
            <div className="flex gap-4 items-center">
                <Image
                    className="p-3 object-cover w-20"
                    alt="Logo PawFuel"
                    src={"/logoWhite.png"}
                    width={50}
                    height={50}
                />
                <div>
                    <h2 className="text-2xl font-bold font-['Croissant_One']">
                        PawFuel
                    </h2>
                    <p className="text-sm text-wrap">
                        Encuentra los mejores productos para tu mascota con
                        envio a domicilio a la puerta de tu casa.
                    </p>
                </div>
            </div>
            <div>
                <div className="flex items-end h-full text-white gap-4 ">
                    <Image
                        src={"/facebook.png"}
                        alt="facebook"
                        width={20}
                        height={20}
                    />
                    <Image
                        src={"/instagram.png"}
                        alt="instagram"
                        width={20}
                        height={20}
                    />
                    <Image
                        src={"/call-center.png"}
                        alt="call center"
                        width={20}
                        height={20}
                    />
                </div>
            </div>
        </div>
    );
};

export default Footer;
