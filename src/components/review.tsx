import Image from "next/image";
import { Card } from "./ui/card";

const review = () => {
    return (
        <Card>
            <Image src={"/logoWhite.png"} alt="logo" width={100} height={100} />
        </Card>
    );
};

export default review;
