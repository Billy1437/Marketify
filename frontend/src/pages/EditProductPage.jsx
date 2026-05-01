import { useNavigate, useParams, Link } from "react-router";
import { useAuth } from "@clerk/react";
import { useProduct, useUpdateProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import EditProductForm from "../components/EditProductForm";

function EditProductPage() {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data: product = [], isLoading } = useProduct(id);
  const updateProduct = useUpdateProduct();

  if (isLoading) return <LoadingSpinner />;

  if (!product || product.userId !== userId) {
    return (
      <div className="bg-white rounded-2xl border border-orange-100 shadow-sm max-w-md mx-auto p-8 text-center space-y-3">
        <h2 className="font-bold text-red-500 text-lg">
          {!product ? "Not found" : "Access denied"}
        </h2>
        <Link
          to="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <EditProductForm
      product={product}
      isPending={updateProduct.isPending}
      isError={updateProduct.isError}
      onSubmit={(formData) => {
        updateProduct.mutate(
          { id, ...formData },
          { onSuccess: () => navigate(`/product/${id}`) }
        );
      }}
    />
  );
}

export default EditProductPage;
