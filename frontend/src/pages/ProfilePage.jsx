import { Link, useNavigate } from "react-router";
import { useMyProducts, useDeleteProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  PlusIcon,
  PackageIcon,
  EyeIcon,
  EditIcon,
  Trash2Icon,
} from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useMyProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id) => {
    if (confirm("Delete this product?")) deleteProduct.mutate(id);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">My Products</h1>
          <p className="text-stone-500 text-sm">Manage your listings</p>
        </div>
        <Link
          to="/create"
          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
        >
          <PlusIcon className="size-4" /> New
        </Link>
      </div>

      <div className="bg-amber-50 border border-orange-100 rounded-2xl p-6">
        <p className="text-sm text-stone-500 mb-1">Total Products</p>
        <p className="text-4xl font-bold text-orange-500">
          {products?.length || 0}
        </p>
      </div>

      {products?.length === 0 ? (
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm">
          <div className="flex flex-col items-center text-center py-16 px-6 space-y-3">
            <PackageIcon className="size-16 text-stone-200" />
            <h3 className="font-bold text-stone-400">No products yet</h3>
            <p className="text-stone-400 text-sm">
              Start by creating your first product
            </p>
            <Link
              to="/create"
              className="mt-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              Create Product
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-orange-100 flex overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-28 shrink-0 object-cover"
              />
              <div className="p-4 flex-1 min-w-0">
                <h2 className="font-bold text-stone-900 text-base">
                  {product.title}
                </h2>
                <p className="text-sm text-stone-500 line-clamp-1 mt-0.5">
                  {product.description}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-900 text-xs font-medium px-2 py-1 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <EyeIcon className="size-3" /> View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${product.id}`)}
                    className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-900 text-xs font-medium px-2 py-1 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <EditIcon className="size-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="inline-flex items-center gap-1 text-red-400 hover:text-red-600 text-xs font-medium px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
                    disabled={deleteProduct.isPending}
                  >
                    <Trash2Icon className="size-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
