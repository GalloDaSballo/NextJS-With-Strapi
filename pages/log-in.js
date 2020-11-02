import Head from "next/head";
import styles from "../styles/Auth.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home({ products }) {
  const [input, setInput] = useState("");
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser(input)
  }
  
  return (
    <div className={styles.auth}>
      <Head>
        <title>Entreprenerd Store</title>
        <meta
          name="description"
          content="Alex The Entreprenerd E-Commerce with Next Strapi and Stripe"
        />
      </Head>

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="email"
          placeholder="Email address..."
        />
        <button type="submit">Log In</button>
      </form>

    </div>
  );
}
