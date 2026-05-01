import {
  ArrowLeftIcon,
  ImageIcon,
  TypeIcon,
  FileTextIcon,
  SaveIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

function EditProductForm({ product, isPending, isError, onSubmit }) {
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
  });

  return (
    <div className="max-w-lg mx-auto">
      <Link
        to="/profile"
        className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 text-sm font-medium mb-4 transition-colors"
      >
        <ArrowLeftIcon className="size-4" /> Back
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8">
        <h1 className="text-xl font-bold text-stone-900 flex items-center gap-2 mb-6">
          <SaveIcon className="size-5 text-orange-500" />
          Edit Product
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 border border-stone-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-200 focus-within:border-orange-400 bg-white transition-all">
            <TypeIcon className="size-4 text-stone-400 shrink-0" />
            <input
              type="text"
              placeholder="Product title"
              className="grow outline-none text-stone-900 placeholder:text-stone-400 text-sm bg-transparent"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center gap-2 border border-stone-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-200 focus-within:border-orange-400 bg-white transition-all">
            <ImageIcon className="size-4 text-stone-400 shrink-0" />
            <input
              type="url"
              placeholder="Image URL"
              className="grow outline-none text-stone-900 placeholder:text-stone-400 text-sm bg-transparent"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              required
            />
          </div>

          {formData.imageUrl && (
            <div className="rounded-xl overflow-hidden">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-full h-40 object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}

          <div className="flex items-start gap-2 border border-stone-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-200 focus-within:border-orange-400 bg-white transition-all">
            <FileTextIcon className="size-4 text-stone-400 shrink-0 mt-0.5" />
            <textarea
              placeholder="Description"
              className="grow outline-none text-stone-900 placeholder:text-stone-400 text-sm bg-transparent resize-none min-h-24"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
              Failed to update. Try again.
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-colors disabled:opacity-60"
            disabled={isPending}
          >
            {isPending ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProductForm;
