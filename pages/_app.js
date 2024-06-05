import "../styles/globals.scss";
import Navbar from "../components/Navbar";
import { Spectral, Belleza } from "next/font/google";
import Footer from "../components/Footer";

export const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-spectral",
});
export const belleza = Belleza({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-belleza",
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${spectral.variable} ${belleza.variable} font-sans`}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
