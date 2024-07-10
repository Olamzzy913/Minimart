import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { CartProvider } from '@/store/cart/cart.context';

export default function App({ Component, pageProps }) {
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
