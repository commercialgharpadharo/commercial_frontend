import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { LoginProvider } from "../context/LoginContext"; // Import LoginProvider
import LoginCard from "@/components/LoginCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script"; // Import Next.js Script component
import Image from "next/image";

const manrope = Manrope({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GharPadharo Commercial",
  description:
    "Ghar Padharo Commercial is your all-in-one solution for finding and listing commercial properties for rent and lease across India. Whether you're a business owner, entrepreneur, or property investor, our platform makes commercial leasing seamless and hassle-free. Easily post your property, discover affordable office spaces, retail shops, warehouses, and more near you, connect with verified tenants or landlords, and manage listings effortlessly — all in one place. With Ghar Padharo, leasing commercial spaces becomes faster, smarter, and stress-free. Join thousands of businesses already finding their ideal space with us!",
  keywords: [
    "Ghar Padharo",
    "room for rent",
    "rental rooms",
    "real estate app",
    "rent a room",
    "list rental property",
    "student housing",
    "PG near me",
    "roommate finder",
    "affordable rentals",
    "property near me",
    "rental listings",
    "online rental platform",
    "rent your home",
    "find PG rooms",
    "monthly rentals",
    "shared accommodation",
    "flat for rent",
    "room booking app",
    "tenants and landlords",
    "rooms in dehradun",
    "rooms for rent in dehradun",
"pg for dehradun for students",
"hostels in dehradun near university",
"owner listed PG in Dehradun",
"best PG in Dehradun for boys/girls",
"cheap flats in Dehradun without brokerage",
"Hostel/Pg near Upes college",

  ],
  metadataBase: new URL("https://commercial.gharpadharo.com/"),
  openGraph: {
    title: "Ghar Padharo Commercial",
    description:
      "A smart real estate platform helping you find and list rooms for rent across India with ease.",
    url: "https://commercial.gharpadharo.com/",
    siteName: "Ghar Padharo",
    images: [
      {
        url: "/assets/logo.png", // Correct path for public assets
        width: 800,
        height: 600,
        alt: "Ghar Padharo Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghar Padharo",
    description:
      "List or rent rooms quickly with Ghar Padharo — your trusted rental housing platform.",
    images: ["/assets/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Google Analytics scripts */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-SW5JEC866F"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SW5JEC866F');
          `,
        }}
      />

      <body className={`bg-background ${manrope.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://commercial.gharpadharo.com/",
              logo: "https://commercial.gharpadharo.com/android-chrome-192x192.png",
              name: "Ghar Padharo",
            }),
          }}
        />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          // pauseOnFocusLoss
          // draggable
          // pauseOnHover
          theme="light"
        />
        <LoginProvider>
          {children}
          <LoginCard /> {/* Global Login Component */}
          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/917903269007"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed left-4 bottom-4 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-all"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </a>
          {/* Floating WhatsApp Button */}
        </LoginProvider>
      </body>
    </html>
  );
}
