import FullSidebarAccordion from "./components/SidebarAccordian";
import GlobalDiceRoller from "./components/GlobalDiceRoller";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          <FullSidebarAccordion />
          <GlobalDiceRoller />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
