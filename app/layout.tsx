import type {Metadata} from 'next';
import { Cinzel, Inter } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-cinzel',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Finanzas Espirituales - Prosperidad Bíblica | Paquete Completo',
  description: 'Página de venta de alta conversión para el paquete completo de 5 libros de Finanzas Espirituales y Código Divino basados en principios bíblicos.',
  openGraph: {
    title: 'Finanzas Espirituales - Prosperidad Bíblica | Paquete Completo',
    description: 'Descubre los principios bíblicos para transformar tu vida financiera, romper la escasez y multiplicar bendiciones con propósito.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finanzas Espirituales - Prosperidad Bíblica | Paquete Completo',
    description: 'Descubre los principios bíblicos para transformar tu vida financiera, romper la escasez y multiplicar bendiciones con propósito.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${cinzel.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://pay.hotmart.com" />
        <link rel="dns-prefetch" href="https://pay.hotmart.com" />
      </head>
      <body suppressHydrationWarning className="bg-[#060B19] text-slate-100 font-sans antialiased selection:bg-[#D4AF37] selection:text-[#060B19]">
        {children}
      </body>
    </html>
  );
}

