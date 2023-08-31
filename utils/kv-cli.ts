import * as path from "$std/path/mod.ts";
import { Command } from "cliffy/command/mod.ts";
import { Confirm } from "cliffy/prompt/mod.ts";

async function pathExists(path: string) {
  try {
    await Deno.stat(path);
    return true;
  } catch (_err) {
    return false;
  }
}

async function deleteFilesByPatternInDirectory(
  directoryName: string,
  pattern: string,
) {
  const directoryContent = Deno.readDir(directoryName);
  const regexp = new RegExp(pattern);

  for await (const fileOrDir of directoryContent) {
    if (!fileOrDir.isFile) {
      continue;
    }
    const filePath = `${directoryName}/${fileOrDir.name}`;
    if (!regexp.test(filePath)) {
      continue;
    }
    await Deno.remove(filePath);
  }
}

const createCommand = new Command()
  .description("Create Deno KV database")
  .arguments("<path_to_database:string>")
  .action(async (_options, pathToDatabase: string) => {
    if (await pathExists(pathToDatabase)) {
      if (
        !(await Confirm.prompt(
          `Database '${pathToDatabase}' already exists, overwrite?`,
        ))
      ) {
        return;
      }

      await deleteFilesByPatternInDirectory(
        path.dirname(pathToDatabase),
        `${pathToDatabase}($|-shm|-wal)`,
      );
    } else {
      console.log(`Create a new database ${pathToDatabase}`);
    }

    // @ts-expect-error `Deno.openKv` is unstable and I can't set this flag in VSCode
    //                  with a multi-root workspace
    await Deno.openKv(pathToDatabase);
  });

const deleteCommand = new Command()
  .description("Delete Deno KV database")
  .arguments("<path_to_database:string>")
  .action(async (_options, pathToDatabase: string) => {
    if (await pathExists(pathToDatabase)) {
      if (
        !(await Confirm.prompt(
          `Are you sure you want to delete '${pathToDatabase}'?`,
        ))
      ) {
        return;
      }
    } else {
      console.error(`There's nothing to delete on the path ${pathToDatabase}`);
    }

    await deleteFilesByPatternInDirectory(
      path.dirname(pathToDatabase),
      `${pathToDatabase}($|-shm|-wal)`,
    );
  });

const setCommand = new Command()
  .description("Add value to database")
  .arguments("<path_to_database:string> <key:string> <value>")
  .action(
    async (_options, pathToDatabase: string, key: string, value: string) => {
      if (!(await pathExists(pathToDatabase))) {
        console.error(`Can't open database ${pathToDatabase}`);
        return;
      }

      // @ts-expect-error `Deno.openKv` is unstable and I can't set this flag in VSCode
      //                  with a multi-root workspace
      const kv = await Deno.openKv(pathToDatabase);
      await kv.set(key.split(","), JSON.parse(value));
    },
  );

const getCommand = new Command()
  .description("Get value from database")
  .arguments("<path_to_database:string> <key:string>")
  .action(async (_options, pathToDatabase: string, key: string) => {
    if (!(await pathExists(pathToDatabase))) {
      console.error(`Can't open database ${pathToDatabase}`);
      return;
    }

    // @ts-expect-error `Deno.openKv` is unstable and I can't set this flag in VSCode
    //                  with a multi-root workspace
    const kv = await Deno.openKv(pathToDatabase);
    const entries = kv.list({ prefix: key.split(",") });

    let isEmpty = true;
    for await (const entry of entries) {
      isEmpty = false;
      console.log(entry);
    }

    if (!isEmpty) {
      return;
    }

    console.log(await kv.get(key.split(",")));
  });

const removeCommand = new Command()
  .description("Remove value from database")
  .arguments("<path_to_database:string> <key:string>")
  .action(async (_options, pathToDatabase: string, key: string) => {
    if (!(await pathExists(pathToDatabase))) {
      console.error(`Can't open database ${pathToDatabase}`);
      return;
    }

    // @ts-expect-error `Deno.openKv` is unstable and I can't set this flag in VSCode
    //                  with a multi-root workspace
    const kv = await Deno.openKv(pathToDatabase);
    await kv.delete(key.split(","));
    console.log("Key has been deleted");
  });

const listCommand = new Command()
  .description("Show all values in database")
  .arguments("<path_to_database:string>")
  .action(async (_options, pathToDatabase: string) => {
    if (!(await pathExists(pathToDatabase))) {
      console.error(`Can't open database ${pathToDatabase}`);
      return;
    }

    // @ts-expect-error `Deno.openKv` is unstable and I can't set this flag in VSCode
    //                  with a multi-root workspace
    const kv = await Deno.openKv(pathToDatabase);
    const entries = kv.list({ prefix: [] });

    for await (const entry of entries) {
      console.log(entry);
    }
  });

await new Command()
  .name("kv-cli")
  .version("0.1.0")
  .description("CLI util to work with Deno KV database")
  .arguments("<command>")
  .command("create", createCommand)
  .command("delete", deleteCommand)
  .command("set", setCommand)
  .command("get", getCommand)
  .command("remove", removeCommand)
  .command("list", listCommand)
  .parse(Deno.args);
