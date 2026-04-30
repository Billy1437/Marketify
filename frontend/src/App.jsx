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
    // min h screen means => minimum height of screen should be 100% of screen height
    // this is done so that even if we dont add content in a page
    // the background color should be visible
    <div className="min-h-screen bg-base-100">
      <Navbar />
      {/* this main acts like a page wrapper, we will render our pages in this main */}
      <main className="max-w-5xl mx-auto px-4 py-8">
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
