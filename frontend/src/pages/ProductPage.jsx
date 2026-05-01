import {
  ArrowLeftIcon,
  EditIcon,
  Trash2Icon,
  CalendarIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import CommentsSection from "../components/CommentsSection";
import { useAuth } from "@clerk/react";
import { useProduct, useDeleteProduct } from "../hooks/useProducts";
import { useParams, Link, useNavigate } from "react-router";

function ProductPage() {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProduct(id);
  const deleteProduct = useDeleteProduct();

  const handleDelete = () => {
    if (confirm("Delete this product permanently?")) {
      deleteProduct.mutate(id, { onSuccess: () => navigate("/") });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (error || !product) {
    return (
      <div className="bg-white rounded-2xl border border-orange-100 shadow-sm max-w-md mx-auto p-8 text-center space-y-3">
        <h2 className="font-bold text-red-500 text-lg">Product not found</h2>
        <Link
          to="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
        >
          Go Home
        </Link>
      </div>
    );
  }

  const isOwner = userId === product.userId;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors"
        >
          <ArrowLeftIcon className="size-4" /> Back
        </Link>
        {isOwner && (
          <div className="flex gap-2">
            <Link
              to={`/edit/${product.id}`}
              className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 text-sm font-medium px-3 py-1.5 rounded-full hover:bg-stone-100 transition-colors"
            >
              <EditIcon className="size-4" /> Edit
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-600 text-sm font-medium px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
              disabled={deleteProduct.isPending}
            >
              {deleteProduct.isPending ? (
                <LoaderIcon className="size-4 animate-spin" />
              ) : (
                <Trash2Icon className="size-4" />
              )}
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-4">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="rounded-xl w-full h-80 object-cover"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 space-y-4">
          <h1 className="text-2xl font-bold text-stone-900">{product.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-stone-400">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="size-4" />
              {new Date(product.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1.5">
              <UserIcon className="size-4" />
              {product.user?.name}
            </div>
          </div>

          <hr className="border-orange-100" />

          <p className="text-stone-600 leading-relaxed">{product.description}</p>

          {product.user && (
            <>
              <hr className="border-orange-100" />
              <div className="flex items-center gap-3">
                <img
                  src={product.user.imageUrl}
                  alt={product.user.name}
                  className="w-12 h-12 rounded-full ring-2 ring-orange-200 ring-offset-2"
                />
                <div>
                  <p className="font-semibold text-stone-900">{product.user.name}</p>
                  <p className="text-xs text-stone-400">Creator</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
        <CommentsSection
          productId={id}
          comments={product.comments}
          currentUserId={userId}
        />
      </div>
    </div>
  );
}

export default ProductPage;
