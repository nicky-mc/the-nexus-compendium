// layout.js
import GlobalDiceRoller from "./components/GlobalDiceRoller";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./components/Navbar";
import FullSidebarAccordion from "./components/SidebarAccordian";
import { CompendiumProvider } from './context/CompendiumContext';

export const metadata = {
  title: 'The Nexus',
  description: 'Your D&D companion app',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <CompendiumProvider>
        <html lang="en">
          <body>
            <Navbar />
            <GlobalDiceRoller />
            {children}
            <FullSidebarAccordion />
          </body>
        </html>
      </CompendiumProvider>
    </ClerkProvider>
  );
}