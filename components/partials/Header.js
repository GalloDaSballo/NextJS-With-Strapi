import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Header.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default () => {
  const router = useRouter();
  console.log("router", router);

  // logic for logout is in place, potentially add a button ?
  const { user, logoutUser } = useContext(AuthContext);
  const isHome = router.pathname === "/";

  const goBack = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.masthead}>
        <div className={styles.back}>
          {!isHome && <a onClick={goBack}>{"<"} Go Back</a>}
        </div>

        <div className={styles.title}>
          <h1>
            <Link href="/">
              <a>The E-Commerce</a>
            </Link>
          </h1>
        </div>

        <div className={styles.auth}>
          {user ? (
            <img src="/user_avatar.png" alt={user.email} />
          ) : (
            <Link href="/log-in">
              <a>Log In</a>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.links}>
        <Link href="/products/chart">
          <a className={styles.link}>Best Sellers</a>
        </Link>
      </div>
    </nav>
  );
};
