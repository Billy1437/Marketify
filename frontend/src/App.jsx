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
