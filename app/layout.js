import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Speaking Midterm Exam",
  description: "Speaking questions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
