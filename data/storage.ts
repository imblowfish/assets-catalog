import { ulid } from "ulid/mod.ts";
import { load } from "$std/dotenv/mod.ts";

const config = await load({
  envPath: ".env",
  defaultsPath: ".env.defaults",
  examplePath: ".env.example",
  export: true,
});

export const storagePath = Deno.env.get("STORAGE_PATH")! ||
  config["STORAGE_PATH"];

console.log("Storage initialization");
console.log(`STORAGE_PATH=${storagePath}`);

await Deno.mkdir(storagePath, {
  recursive: true,
});

export async function saveToStorage(file: File) {
  const filename = `${ulid()}_${file.name}`;
  await Deno.writeFile(
    `${storagePath}/${filename}`,
    new Uint8Array(await file.arrayBuffer()),
  );
  return filename;
}

export function getFromStorage(filename: string) {
  return Deno.readFile(`${storagePath}/${filename}`);
}

export function deleteFromStorage(id: string) {
  return Deno.remove(`${storagePath}/${id}`);
}
