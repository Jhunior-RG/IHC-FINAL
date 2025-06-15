import { Button } from "@/components/ui/button";
import Image from "next/image";

const Page = () => {
    return (
        <>
            <div className="bg-primary">
                <div className="  h-120 flex justify-center">
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

                    <div className="flex flex-col items-center justify-center gap-2 w-full">
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
                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className="rounded-full text-xs"
                        >
                            Ver catalogo
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
