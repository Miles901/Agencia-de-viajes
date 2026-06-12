import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Airvon - Reserva de Vuelos y Tours',
  description: 'Encuentra y reserva los mejores vuelos, tours y paquetes a Colombia y Perú. Operadores verificados, mejores precios garantizados.',
  keywords: 'vuelos Colombia, tours Peru, agencia de viajes, Cartagena, Machu Picchu, Medellin, Cusco',
  openGraph: {
    title: 'Airvon - Tu Agencia de Viajes a Colombia y Perú',
    description: 'Reserva vuelos, tours y paquetes completos con los mejores operadores verificados.',
    type: 'website',
    locale: 'es_CO',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
