import "./globals.css"

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
