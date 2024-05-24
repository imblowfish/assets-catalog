import { Head } from "$fresh/runtime.ts";
import { Header } from "$/components/Header.tsx";
import { Registration } from "$/islands/Registration.tsx";

export default function Register() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <main>
        <Header />
        <Registration />
      </main>
    </>
  );
}
