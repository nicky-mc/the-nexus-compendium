// app/layout.js
import Navbar from './components/Navbar';
import GlobalDiceRoller from './components/GlobalDiceRoller';
import './globals.css'

export const metadata = {
  title: 'The  Nexus',
  description: 'Your D&D companion app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <GlobalDiceRoller />
        {children}
      </body>
    </html>
  )
}