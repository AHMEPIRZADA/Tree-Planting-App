import "./globals.css";

export const metadata = {
  title: "Tree Planting Map",
  description: "Record your planted trees on an interactive map.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}