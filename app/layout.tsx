// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <title>出社できて偉いボタン</title>

        <meta property="og:title" content="出社できて偉いボタン" />
        <meta property="og:site_name" content="出社できて偉いボタン" />
        <meta property="og:url" content="https://office.cateiru.com/" />
        <meta
          property="og:image"
          content="https://office.cateiru.com/ogp.png"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
