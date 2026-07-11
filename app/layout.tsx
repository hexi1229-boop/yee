import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hexi1229-boop.github.io/yee";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "无忧城外 · 城里没有梦",
  description: "一部关于梦、失去与看见的原创全年龄视觉故事。",
  openGraph: {
    title: "无忧城外 · 城里没有梦",
    description: "翻开无忧城的第一夜，追回一场正在熄灭的梦。",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "无忧城外 · 城里没有梦",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "无忧城外 · 城里没有梦",
    description: "翻开无忧城的第一夜，追回一场正在熄灭的梦。",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
