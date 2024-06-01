import { Spectral, Belleza } from "next/font/google";

export const spectral_init = Spectral({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-spectral",
});
export const belleza_init = Belleza({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-belleza",
});

export const spectral = spectral_init.variable;
export const belleza = belleza_init.variable;
