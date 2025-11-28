import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { ApolloClientProvider } from '@/lib/apollo/apollo-provider';
import { ConfigProvider } from '@/context/ConfigContext';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { getRestaurantConfig } from '@/hooks/useRestaurantConfig';
import { getRestaurantStructuredData } from '@/lib/constants/structured-data';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getRestaurantConfig();
  const siteUrl = 'https://lejardinelegant.com'; // Update with actual domain

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${config.branding.name} | Fine Dining in ${config.contact.address.city}`,
      template: `%s | ${config.branding.name}`,
    },
    description: `${config.branding.description}. Located in ${config.contact.address.city}, offering exquisite cuisine and an unforgettable dining experience.`,
    keywords: config.seo.keywords,
    authors: [{ name: config.branding.name }],
    creator: config.branding.name,
    publisher: config.branding.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: config.branding.name,
      title: `${config.branding.name} | Fine Dining Experience`,
      description: config.branding.description,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&q=80&auto=format&fit=crop',
          width: 1200,
          height: 630,
          alt: config.branding.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${config.branding.name} | Fine Dining Experience`,
      description: config.branding.description,
      images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&q=80&auto=format&fit=crop'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getRestaurantConfig();
  const structuredData = getRestaurantStructuredData(config);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <ConfigProvider initialConfig={config}>
          <ThemeProvider>
            <ApolloClientProvider>{children}</ApolloClientProvider>
          </ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
