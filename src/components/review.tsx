"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import {
    differenceInDays,
    differenceInMonths,
    differenceInYears,
} from "date-fns";

export interface ReviewProps {
    name: string;
    description: string;
    image: string;
    rating: number;
    date: string;
}

const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const years = differenceInYears(now, date);
    if (years > 0) return `hace ${years} año${years > 1 ? "s" : ""}`;
    const months = differenceInMonths(now, date);
    if (months > 0) return `hace ${months} mes${months > 1 ? "es" : ""}`;
    const days = differenceInDays(now, date);
    if (days > 0) return `hace ${days} día${days > 1 ? "s" : ""}`;
    return "hoy";
};

const Review = ({ review }: { review: ReviewProps }) => {
    return (
        <Card className="rounded-2xl p-2">
            <CardContent className="flex gap-4 p-0">
                <Image
                    className="rounded-full h-15 w-15"
                    src={review.image}
                    alt="imagen de perfil"
                    width={50}
                    height={50}
                />
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between">
                        <h3 className="text-lg font-bold w-full">
                            {review.name}
                        </h3>
                        <div className="flex w-full justify-center">
                            {Array.from({ length: review.rating }).map(
                                (_, index) => (
                                    <Star
                                        key={index}
                                        className="w-4 h-4 text-yellow-500 fill-yellow-500"
                                    />
                                )
                            )}
                            {Array.from({ length: 5 - review.rating }).map(
                                (_, index) => (
                                    <Star
                                        key={index}
                                        className="w-4 h-4 text-yellow-500"
                                    />
                                )
                            )}
                        </div>
                        <p className="text-sm text-gray-500 w-full text-end">
                            {getRelativeTime(review.date)}
                        </p>
                    </div>
                    <p className="text-sm text-gray-500">
                        {review.description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default Review;
