import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
// Set default values using destructuring
const Layout = ({
  children,
  title = "Ecommerce App-BuyIt",
  description = "mern stack ecommerce project",
  keywords = "react,mongodb,express,node,mern",
  author = "Archit"
}) => {
  // for SEO
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};
// Removed Layout.defaultProps
export default Layout;
