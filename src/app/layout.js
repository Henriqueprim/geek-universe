import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/cartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Geek Universe",
  description: "A sua loja geek",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
              {children}
            <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
