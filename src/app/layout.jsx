import "./globals.css"

// Note: This is adapted from Next.js but won't actually use the font loading
// In a real Vite project, you'd use different font loading methods
const geistSans = {
  variable: "--font-geist-sans",
}
const geistMono = {
  variable: "--font-geist-mono",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
