import "./globals.css"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({ subsets: ["latin"] })

export const viewport = {
  themeColor: "#8B5CF6",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
