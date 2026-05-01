import { useProducts } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import { PackageIcon, SparklesIcon } from "lucide-react";
import { SignInButton } from "@clerk/react";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { data: products = [], isLoading, isError } = useProducts();

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm">
        Something went wrong. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-3xl overflow-hidden">
        <div className="flex flex-col lg:flex-row-reverse lg:justify-center items-center gap-10 px-10 py-12">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-orange-300/30 blur-3xl rounded-full scale-110" />
            <img
              src="/image_icon.png"
              alt="Creator"
              className="relative h-64 lg:h-72 rounded-2xl shadow-2xl"
            />
          </div>
          <div className="text-center lg:text-left space-y-4">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
              Share Your <span className="text-orange-500">Products</span>
            </h1>
            <p className="text-stone-500 text-lg">
              Upload, discover, and connect with creators.
            </p>
            <SignInButton mode="modal">
              <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-sm">
                <SparklesIcon className="size-4" />
                Start Selling
              </button>
            </SignInButton>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
          <PackageIcon className="size-5 text-orange-500" />
          All Products
        </h2>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-orange-100 shadow-sm">
            <div className="flex flex-col items-center text-center py-16 px-6 space-y-3">
              <PackageIcon className="size-16 text-stone-200" />
              <h3 className="font-bold text-stone-400">No products yet</h3>
              <p className="text-stone-400 text-sm">Be the first to share something!</p>
              <Link
                to="/create"
                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
              >
                Create Product
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
