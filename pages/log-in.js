import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

import { useAuth } from "../context/authContext";

export default function Home({ products }) {
  const [input, setInput] = useState("");
  const { loginUser } = useAuth();

  return (
    <div>
      <Head>
        <title>Entreprenerd Store</title>
        <meta
          name="description"
          content="Alex The Entreprenerd E-Commerce with Next Strapi and Stripe"
        />
      </Head>

      <h2>Login</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="email"
      />
      <button onClick={() => loginUser(input)}>Log In</button>
    </div>
  );
}
