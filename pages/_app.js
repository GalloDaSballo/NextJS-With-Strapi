import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";

import { AuthProvider } from "../components/AuthProvider";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <content>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </content>
    </AuthProvider>
  );
}

export default MyApp;
