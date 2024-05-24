import { Head } from "$fresh/runtime.ts";
import { Header } from "$/components/Header.tsx";
import { Login } from "$/islands/Login.tsx";

export default function Register() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <main>
        <Header />
        <Login />
      </main>
    </>
  );
}
