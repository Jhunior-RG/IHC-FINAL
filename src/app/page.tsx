"use client";
import SectionDiscountedProducts from "@/components/SectionDiscountedProducts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
    return (
        <>
            <div className="bg-primary">
                <div className=" h-120 flex sm:flex-row flex-col-reverse justify-center">
                    <div className="relative h-full w-full">
                        <Image
                            className="absolute top-0 left-0"
                            src="/cloud.png"
                            alt="PawFuel"
                            width={500}
                            height={0}
                        />
                        <Image
                            className="absolute mt-auto left-0 bottom-0"
                            src="/dog1.png"
                            alt="PawFuel"
                            width={400}
                            height={400}
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2 w-full z-50">
                        <div className="flex items-center justify-center gap-2 w-full">
                            <Image
                                src="/logoWhite.png"
                                alt="PawFuel"
                                width={150}
                                height={80}
                            />
                            <div className="flex flex-col gap-2 ">
                                <h1 className="text-7xl font-bold text-white font-['Croissant_One']">
                                    PawFuel
                                </h1>
                                <p className="text-white ">
                                    La energía que tu mascota necesita
                                </p>
                            </div>
                        </div>
                        <Link href="/catalogo">
                            <Button
                                variant={"secondary"}
                                size={"sm"}
                                className="rounded-full text-xs"
                            >
                                Ver catalogo
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-white flex items-center justify-between pt-16 pb-0">
                <div className="pl-10 max-w-xl ml-10 xl:ml-52">
                    <h1 style={{ color: '#265B8F' }} className="text-5xl font-semibold">
                        Descubre el plan de
                    </h1>
                    <h1 style={{ color: '#265B8F' }} className="text-5xl font-semibold">
                        alimentación ideal
                    </h1>
                    <h1 style={{ color: '#265B8F' }} className="text-5xl font-semibold">
                        para tu mascota
                    </h1>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full text-xs mt-10 py-6 ml-10"
                    >
                        Descubre el alimento adecuado para tu mascota
                    </Button>
                </div>

                <Image
                    src="/perroJoy.png"
                    alt="PawFuel"
                    width={692.78}
                    height={686}
                    className="ml-auto object-contain w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[692.78px] h-auto"
                />
            </div>
            <div style={{ background: '#D5E5F4' }} className="m-0 p-0">
                <SectionDiscountedProducts />
            </div>

        </>
    );
};

export default Page;
