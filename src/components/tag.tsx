import React from "react";
import { Badge } from "./ui/badge";

const tag = ({ text }: { text: string }) => {
    return <Badge>{text}</Badge>;
};

export default tag;
