import { ThemeProvider } from '@/context/ThemeContext';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';
import './globals.css';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const font = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: "500"
})

export const metadata = {
  title: "MyBlog",
  description: "Created by Enzo",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider>
          <AuthProvider>
            <div className="container">
              <NavBar />

                {children}

              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
