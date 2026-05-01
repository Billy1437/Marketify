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
