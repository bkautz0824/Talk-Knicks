import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem  // enable system theme
          disableTransitionOnChange
        >
          <header>
            <SiteHeader />
          </header>
          <main>{children}</main>
          <footer>{/* Add footer component here */}</footer>
        </ThemeProvider>
      </body>
    </html>
  )
}