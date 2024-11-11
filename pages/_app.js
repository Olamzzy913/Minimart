import "@/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { CartProvider } from "@/store/cart/cart.context";
import { trackUserStatus } from "@/utility/activeUser/updateLastSeen";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        trackUserStatus(user.uid);
      } else {
      }
    });
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && router.pathname !== "/signin") {
        router.push("/signin");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <Provider store={store}>
      <CartProvider>
        <ThemeProvider enableSystem={true} attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </CartProvider>
    </Provider>
  );
}
