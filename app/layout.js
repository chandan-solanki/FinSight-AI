import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "FinSight AI",
  description:
    "Master your money with FinSight AI — the smart way to track expenses, plan budgets, and unlock powerful financial insights powered by artificial intelligence.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body>
          <Header />
          <main className="min-h-screen flex flex-col">
            <div>Main Page</div>
            {children}
          </main>

          <footer className="bg-gray-100 border-t border-gray-200 py-10">
            <div className="text-center p-4">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} FinSight AI. All rights reserved.
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
