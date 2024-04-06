import Footer from "../components/Footer";
import Header from "../components/Header";
import './globals.css'

export const metadata = {
  title: "GenZid",
  description: "A digital id for GenZs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="" suppressHydrationWarning={true}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
