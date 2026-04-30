# Frontend Redesign (Warm Minimal) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all DaisyUI theme classes with a "Warm Minimal" design system using Plus Jakarta Sans, amber/orange accents, and warm off-white backgrounds.

**Architecture:** Each file is restyled independently — no new files created, no logic changes. DaisyUI plugin is removed from index.css; all `bg-base-*`, `btn-*`, `card`, `badge`, `chat`, and other DaisyUI utility classes are replaced with plain Tailwind. ThemeSelector component is deleted.

**Tech Stack:** React 19, Tailwind CSS v4, Lucide React, Clerk auth, React Router v7

---

### Task 1: Foundation — index.css + App.jsx

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Update src/index.css**

Replace the entire file with:

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import "tailwindcss";

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #fdf8f3;
}
```

- [ ] **Step 2: Update src/App.jsx**

Replace the entire file with:

```jsx
import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProductPage from "./pages/EditProductPage";
import useAuthReq from "./hooks/useAuthReq";
import useUserSync from "./hooks/useUserSync";

function App() {
  const { isClerkLoaded, isSignedIn } = useAuthReq();
  useUserSync();

  if (!isClerkLoaded) return null;

  return (
    <div className="min-h-screen bg-[#fdf8f3]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route
            path="/profile"
            element={isSignedIn ? <ProfilePage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/create"
            element={isSignedIn ? <CreatePage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/edit/:id"
            element={isSignedIn ? <EditProductPage /> : <Navigate to={"/"} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Commit**

```bash
git add src/index.css src/App.jsx
git commit -m "feat: warm minimal foundation — font, background, layout width"
```

---

### Task 2: Delete ThemeSelector + restyle Navbar

**Files:**
- Delete: `src/components/ThemeSelector.jsx`
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Delete ThemeSelector.jsx**

```bash
git rm src/components/ThemeSelector.jsx
```

- [ ] **Step 2: Replace src/components/Navbar.jsx**

```jsx
import { Link } from "react-router";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/react";
import { ShoppingBagIcon, PlusIcon, UserIcon } from "lucide-react";

function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-amber-50 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBagIcon className="size-5 text-orange-500" />
          <span className="text-lg font-extrabold tracking-tight text-stone-900">
            Productify
          </span>
        </Link>

        <div className="flex gap-2 items-center">
          {isSignedIn ? (
            <>
              <Link
                to="/create"
                className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
              >
                <PlusIcon className="size-4" />
                <span className="hidden sm:inline">New Product</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 text-sm font-semibold px-3 py-2 rounded-full hover:bg-orange-100 transition-colors"
              >
                <UserIcon className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="text-stone-600 hover:text-stone-900 text-sm font-semibold px-3 py-2 rounded-full hover:bg-orange-100 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
                  Get Started
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: restyle Navbar and delete ThemeSelector — sticky amber bg, orange pill buttons"
```

---

### Task 3: Restyle LoadingSpinner

**Files:**
- Modify: `src/components/LoadingSpinner.jsx`

- [ ] **Step 1: Replace src/components/LoadingSpinner.jsx**

```jsx
import { LoaderIcon } from "lucide-react";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <LoaderIcon className="size-10 text-orange-500 animate-spin" />
    <p className="text-sm text-stone-400">Loading...</p>
  </div>
);

export default LoadingSpinner;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LoadingSpinner.jsx
git commit -m "feat: restyle LoadingSpinner with orange accent"
```

---

### Task 4: Restyle ProductCard

**Files:**
- Modify: `src/components/ProductCard.jsx`

- [ ] **Step 1: Replace src/components/ProductCard.jsx**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProductCard.jsx
git commit -m "feat: restyle ProductCard — white card, amber NEW badge, hover lift"
```

---

### Task 5: Restyle HomePage

**Files:**
- Modify: `src/pages/HomePage.jsx`

- [ ] **Step 1: Replace src/pages/HomePage.jsx**

```jsx
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
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10 px-10 py-12">
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "feat: restyle HomePage — warm gradient hero, orange CTA, updated product grid"
```

---

### Task 6: Restyle ProductPage

**Files:**
- Modify: `src/pages/ProductPage.jsx`

- [ ] **Step 1: Replace src/pages/ProductPage.jsx**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ProductPage.jsx
git commit -m "feat: restyle ProductPage — white cards, warm dividers, orange creator ring"
```

---

### Task 7: Restyle CreatePage

**Files:**
- Modify: `src/pages/CreatePage.jsx`

- [ ] **Step 1: Replace src/pages/CreatePage.jsx**

```jsx
import { Link, useNavigate } from "react-router";
import { useCreateProduct } from "../hooks/useProducts";
import { useState } from "react";
import {
  ArrowLeftIcon,
  FileTextIcon,
  ImageIcon,
  SparklesIcon,
  TypeIcon,
} from "lucide-react";

function CreatePage() {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.imageUrl) {
      alert("Please fill in all fields");
      return;
    }
    createProduct.mutate(formData, {
      onSuccess: () => navigate("/"),
    });
  };

  return (
    <div className="max-w-lg mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 text-sm font-medium mb-4 transition-colors"
      >
        <ArrowLeftIcon className="size-4" /> Back
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8">
        <h1 className="text-xl font-bold text-stone-900 flex items-center gap-2 mb-6">
          <SparklesIcon className="size-5 text-orange-500" />
          New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                onError={(e) => (e.target.style.display = "none")}
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

          {createProduct.isError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
              Failed to create. Try again.
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-colors disabled:opacity-60"
            disabled={createProduct.isPending}
          >
            {createProduct.isPending ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              "Create Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePage;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/CreatePage.jsx
git commit -m "feat: restyle CreatePage — white card, warm inputs, orange submit button"
```

---

### Task 8: Restyle EditProductForm + EditProductPage

**Files:**
- Modify: `src/components/EditProductForm.jsx`
- Modify: `src/pages/EditProductPage.jsx`

- [ ] **Step 1: Replace src/components/EditProductForm.jsx**

```jsx
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
```

- [ ] **Step 2: Replace src/pages/EditProductPage.jsx**

```jsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/EditProductForm.jsx src/pages/EditProductPage.jsx
git commit -m "feat: restyle EditProductForm and EditProductPage — warm inputs, orange submit"
```

---

### Task 9: Restyle ProfilePage

**Files:**
- Modify: `src/pages/ProfilePage.jsx`

- [ ] **Step 1: Replace src/pages/ProfilePage.jsx**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ProfilePage.jsx
git commit -m "feat: restyle ProfilePage — amber stats card, warm product list"
```

---

### Task 10: Restyle CommentsSection

**Files:**
- Modify: `src/components/CommentsSection.jsx`

- [ ] **Step 1: Replace src/components/CommentsSection.jsx**

```jsx
import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/react";
import { useCreateComment, useDeleteComment } from "../hooks/useComments";
import {
  SendIcon,
  Trash2Icon,
  MessageSquareIcon,
  LogInIcon,
} from "lucide-react";

function CommentsSection({ productId, comments = [], currentUserId }) {
  const { isSignedIn } = useAuth();
  const [content, setContent] = useState("");
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment(productId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    createComment.mutate(
      { productId, content },
      { onSuccess: () => setContent("") }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquareIcon className="size-5 text-orange-500" />
        <h3 className="font-bold text-stone-900">Comments</h3>
        <span className="bg-stone-100 text-stone-500 text-xs font-semibold px-2 py-0.5 rounded-full">
          {comments.length}
        </span>
      </div>

      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all bg-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={createComment.isPending}
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-xl transition-colors disabled:opacity-50"
            disabled={createComment.isPending || !content.trim()}
          >
            {createComment.isPending ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <SendIcon className="size-4" />
            )}
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between bg-amber-50 border border-orange-100 rounded-xl p-3">
          <span className="text-sm text-stone-500">
            Sign in to join the conversation
          </span>
          <SignInButton mode="modal">
            <button className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-colors">
              <LogInIcon className="size-4" />
              Sign In
            </button>
          </SignInButton>
        </div>
      )}

      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <MessageSquareIcon className="size-8 mx-auto text-stone-200" />
            <p className="text-sm text-stone-400">No comments yet. Be first!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <img
                src={comment.user?.imageUrl}
                alt={comment.user?.name}
                className="w-8 h-8 rounded-full shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-stone-700">
                    {comment.user?.name}
                  </span>
                  <span className="text-xs text-stone-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="bg-stone-50 rounded-xl rounded-tl-sm px-3 py-2 text-sm text-stone-700">
                  {comment.content}
                </div>
              </div>
              {currentUserId === comment.userId && (
                <button
                  onClick={() =>
                    confirm("Delete?") &&
                    deleteComment.mutate({ commentId: comment.id })
                  }
                  className="text-stone-300 hover:text-red-400 transition-colors mt-1 shrink-0"
                  disabled={deleteComment.isPending}
                >
                  <Trash2Icon className="size-3.5" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentsSection;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CommentsSection.jsx
git commit -m "feat: restyle CommentsSection — custom comment bubbles, orange accents"
```

---

### Task 11: Verify in browser

- [ ] **Step 1: Start the dev server**

```bash
cd /Users/billy/codes/website/product_store/frontend && npm run dev
```

- [ ] **Step 2: Check each page visually**

Open `http://localhost:5173` and verify:
- HomePage: warm off-white background, amber gradient hero, orange "Start Selling" button, product cards with soft shadows
- Navbar: amber-50 background, orange logo icon, pill-shaped buttons
- ProductPage: white cards, orange creator ring, warm dividers
- CreatePage: white card form, warm input focus rings, orange submit button
- ProfilePage: amber stats card, horizontal product list
- No DaisyUI theme remnants (no blue primary buttons, no gray base colors)

- [ ] **Step 3: Final commit if any tweaks were needed**

```bash
git add -p
git commit -m "fix: address visual tweaks after browser verification"
```
