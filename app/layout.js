import localFont from "next/font/local";
import "./globals.css";

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
      </body>
    </html>
  );
}
