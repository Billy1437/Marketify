import { Link } from "react-router";
import { MessageCircleIcon } from "lucide-react";

const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

const ProductCard = ({ product }) => {
  const isNew = new Date(product.createdAt) > oneWeekAgo;

  return (
    <Link
      to={`/product/${product.id}`}
      className="block bg-white rounded-2xl shadow-sm border border-orange-100 hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden"
    >
      <div className="px-4 pt-4">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="rounded-xl h-44 w-full object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-bold text-stone-900 text-base leading-snug">
            {product.title}
          </h2>
          {isNew && (
            <span className="shrink-0 bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              NEW
            </span>
          )}
        </div>
        <p className="text-sm text-stone-500 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          {product.user && (
            <div className="flex items-center gap-2">
              <img
                src={product.user.imageUrl}
                alt={product.user.name}
                className="w-6 h-6 rounded-full ring-1 ring-orange-200"
              />
              <span className="text-xs text-stone-400">{product.user.name}</span>
            </div>
          )}
          {product.comments && (
            <div className="flex items-center gap-1 text-stone-400">
              <MessageCircleIcon className="size-3" />
              <span className="text-xs">{product.comments.length}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
