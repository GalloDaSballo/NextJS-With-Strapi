import { useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { MAGIC_PUBLIC_KEY } from "../utils/urls";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";

let m;
export const AuthProvider = (props) => {
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
    try {
      await m.user.logout();
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const persistUser = async () => {
    try {
      const { email, publicAddress } = await m.user.getMetadata();
      setUser({ email, token: publicAddress });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    m = new Magic(MAGIC_PUBLIC_KEY);
    (async () => {
      try {
        const isLoggedIn = await m.user.isLoggedIn();

        if (isLoggedIn) {
          persistUser();
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logoutUser, loginUser, persistUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
