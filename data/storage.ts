import { load } from "$std/dotenv/mod.ts";

const config = await load({
  envPath: ".env",
  defaultsPath: ".env.defaults",
  examplePath: ".env.example",
  export: true,
});

const storagePath = Deno.env.get("STORAGE_PATH")! || config["STORAGE_PATH"];

console.log("Storage initialization");
console.log(`STORAGE_PATH=${storagePath}`);

await Deno.mkdir(storagePath, {
  recursive: true,
});

export async function saveToStorage(file: File, id: string) {
  return Deno.writeFile(
    `${storagePath}/${id}`,
    new Uint8Array(await file.arrayBuffer()),
  );
}

}
