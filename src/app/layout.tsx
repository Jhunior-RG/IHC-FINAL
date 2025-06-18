"use client";
import Footer from "@/components/Footer";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={poppins.className}>
            <body className="font-normal">
                <NavBar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
