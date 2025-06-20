import CardProduct from "../../components/horizontalCard";
import { Heart } from "lucide-react";
import { products } from "@/constant/products";

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Mis Favoritos
                    </h1>
                    <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
                        {products.length} productos
                    </span>
                </div>

                <div className="space-y-4 max-w-4xl mx-auto">
                    {products.map((product) => (
                        <CardProduct key={product.id} product={product} />
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Heart className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No tienes productos favoritos
                        </h3>
                        <p className="text-gray-600">
                            Explora nuestro catálogo y agrega productos a tus
                            favoritos
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
