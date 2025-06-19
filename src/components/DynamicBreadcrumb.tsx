"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DynamicBreadcrumb = () => {
    const pathname = usePathname();

    const generateBreadcrumbs = () => {
        const segments = pathname
            .split("/")
            .filter((segment) => segment !== "");

        if (segments.length === 0) {
            return [{ href: "/", label: "Inicio", isCurrent: true }];
        }

        const breadcrumbs = [{ href: "/", label: "Inicio", isCurrent: false }];

        let currentPath = "";

        segments.forEach((segment, index) => {
            currentPath += `/${segment}`;

            // Mapeo de rutas a nombres más amigables
            const routeLabels: { [key: string]: string } = {
                catalogo: "Catálogo",
                product: "Producto",
                payment: "Pago",
                perfil: "Perfil",
                configuracion: "Configuración",
                direcciones: "Direcciones",
                informacion: "Información",
                pedidos: "Pedidos",
                favoritos: "Favoritos",
                recomendaciones: "Recomendaciones",
            };

            const label =
                routeLabels[segment] ||
                segment.charAt(0).toUpperCase() + segment.slice(1);
            const isCurrent = index === segments.length - 1;

            breadcrumbs.push({
                href: currentPath,
                label,
                isCurrent,
            });
        });

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    // No mostrar breadcrumb en la página de inicio si solo tiene "Inicio"
    if (breadcrumbs.length === 1 && breadcrumbs[0].href === "/") {
        return null;
    }

    return (
        <Breadcrumb className="px-10 pt-5">
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={breadcrumb.href}>
                        <BreadcrumbItem>
                            {breadcrumb.isCurrent ? (
                                <BreadcrumbPage>
                                    {breadcrumb.label}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={breadcrumb.href}>
                                    {breadcrumb.label}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && (
                            <BreadcrumbSeparator />
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default DynamicBreadcrumb;
