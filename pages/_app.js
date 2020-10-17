import { useState, useEffect } from "react";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";

import { Magic } from "magic-sdk";
import { AuthContext } from "../context/authContext";
import { useRouter } from "next/router";

import "../styles/globals.css";

import { MAGIC_PUBLIC_KEY } from "../utils/urls";

let m;

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const loginUser = async (email) => {
    try {
      const token = await m.auth.loginWithMagicLink({ email });
      setUser({ token, email });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const logoutUser = async () => {
    await m.user.logout();
    setUser(null);
  };

  const persistUser = async () => {
    const { email, publicAddress } = await m.user.getMetadata();
    setUser({ email, token: publicAddress });
  };

  useEffect(() => {
    m = new Magic(MAGIC_PUBLIC_KEY);
    (async () => {
      const isLoggedIn = await m.user.isLoggedIn();

      if (isLoggedIn) {
        persistUser();
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      <content>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </content>
    </AuthContext.Provider>
  );
}

export default MyApp;
