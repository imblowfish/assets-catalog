import { Head } from "$fresh/runtime.ts";
import { Header } from "$/components/Header.tsx";
import { CreateNewAsset } from "$/islands/Actions.tsx";

export default function NewAsset() {
  return (
    <>
      <Head>
        <title>New asset</title>
      </Head>
      <main>
        <Header
          actions
          avatar
        />
        <CreateNewAsset />
      </main>
    </>
  );
}
