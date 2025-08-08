import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
import "../globals.css";
import { LoginProvider } from "@/context/LoginContext"; // Import LoginProvider
import LoginCard from "@/components/LoginCard";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";
import ReviewModal from "@/components/ReviewModel";
import FacebookPixel from "@/components/FacebookPixel";

// const poppins = Poppins({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "GharPadharo",
  description:
    "Ghar Padharo is your all-in-one solution for finding and listing rental rooms, PGs, and shared accommodations across India. Whether you're a student, working professional, or property owner, our platform makes renting seamless and hassle-free. Easily post your property, discover affordable housing options near you, connect with trusted tenants or landlords, and manage listings effortlessly — all in one place. With Ghar Padharo, renting becomes faster, smarter, and stress-free. Join thousands already finding their perfect space!",
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
  ],
  metadataBase: new URL("https://www.gharpadharo.com"),
  openGraph: {
    title: "Ghar Padharo",
    description:
      "A smart real estate platform helping you find and list rooms for rent across India with ease.",
    url: "https://www.gharpadharo.com",
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
    <div className={`overflow-hidden `}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <LoginProvider>
        <ReviewModal />
        <Navbar /> {/* Wrap children with LoginProvider */}
        {children}
        <Footer />
        <LoginCard /> {/* Global Login Component */}
        <FacebookPixel
          pixelId={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || ""}
        />
      </LoginProvider>
    </div>
  );
}
