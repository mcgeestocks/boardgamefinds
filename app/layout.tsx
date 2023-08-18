import "./globals.css";

import GoogleAnalytics from "@/components/google-analytics";
import Link from "next/link";
import Search from "@/components/search";
import { Suspense } from "react";

export const metadata = {
  title: "Home | BoardGameFinds",
  description:
    "Explore popular Board Game mechanics, from Catan to Gloomhave Iummerse yourself in an library of more than 4,000+ games",
  openGraph: {
    title: "Home | BoardGameFinds",
    description:
      "Explore popular Board Game mechanics, from Catan to Gloomhave Iummerse yourself in an library of more than 4,000+ games",
    type: "website",
    url: "https://boardgamefinds.com",
    locale: "en_US",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_TRACKING_ID={process.env.GA_TRACKING_ID as string} />
      <body
        className={`antialiased min-h-screen bg-black text-slate-50 flex flex-col`}
      >
        <div className="max-w-2xl w-full mx-auto py-10 px-4 sm:px-8 bg-slate-950 border-x border-slate-900 flex-grow">
          <header>
            <div className="flex items-center justify-between pb-6">
              <nav className="mr-auto text-sm font-bold space-x-6 select-none cursor-pointer">
                <Link
                  className="text-slate-50 hover:text-yellow-500 transition-all
                hover:shadow-orange-900 ease-in-out delay-50"
                  href="/"
                >
                  Boardgame
                  <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-amber-600">
                    Finds
                  </em>
                </Link>
              </nav>
              <Suspense>
                <Search />
              </Suspense>
            </div>
          </header>
          <main className="flex-grow">
            <Suspense>{children}</Suspense>
          </main>
        </div>
        <footer className="bg-slate-950 border-t border-x border-slate-900 py-4 px-4 sm:px-8 max-w-2xl w-full mx-auto">
          <div className=" flex w-full justify-end">
            <a href="https://www.linkedin.com/in/mcgeestocks/">
              <span className="text-slate-50 hover:text-yellow-500 transition-all">
                Made By{" "}
                <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-amber-600">
                  Conrad
                </em>
              </span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
