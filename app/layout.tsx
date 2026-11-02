import type { Metadata } from "next";
import "@fontsource-variable/nunito-sans";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "PontoAmado | Programa de fidelidade para o comércio local",
    template: "%s | PontoAmado",
  },
  description:
    "Crie um programa de fidelidade para seu comércio, valorize seus clientes e incentive novas visitas. Seu negócio pode se transformar em um PontoAmado.",
  applicationName: "PontoAmado",
  keywords: [
    "programa de fidelidade",
    "fidelização de clientes",
    "fidelidade para comércio local",
    "clube de vantagens",
    "programa de pontos para lojas",
    "fidelização para pequenos negócios",
  ],
  openGraph: {
    title: "PontoAmado | Mais motivos para voltar",
    description:
      "Fidelidade simples para comércios que fazem parte da vida das pessoas. Crie seu programa e transforme compras em relacionamentos.",
    siteName: "PontoAmado",
    locale: "pt_BR",
    type: "website",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary",
    title: "PontoAmado | Mais motivos para voltar",
    description:
      "Crie um programa de fidelidade para seu comércio e dê aos clientes mais motivos para voltar.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
