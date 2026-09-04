import type {Metadata} from 'next';
import './globals.css';

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
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-[#060B19] text-slate-100 font-sans antialiased selection:bg-[#D4AF37] selection:text-[#060B19]">
        {children}
      </body>
    </html>
  );
}

