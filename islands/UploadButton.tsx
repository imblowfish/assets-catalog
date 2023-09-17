import { JSX } from "preact";
import IconUpload from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/upload.tsx";

async function uploadFile() {
  // @ts-expect-error Deno shows error here because FileSystem API still doesn't supported
  //                  by several browsers, but it works in the Chrome browser
  //                  More info https://developer.mozilla.org/en-US/docs/Web/API/File_System_API
  const [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();

  const bodyContent = new FormData();
  bodyContent.append("title", "Asset title");
  bodyContent.append("description", "Asset description");
  bodyContent.append("file", file);

  const resp = await fetch(`/api/v0/assets`, {
    method: "POST",
    body: bodyContent,
  });

  if (resp.status !== 200) {
    throw new Error(`API returned ${resp.status} status`);
  }
}

export const UploadButton = (props: JSX.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      onClick={() => {
        uploadFile().catch((err) => {
          console.error(`Failed to upload asset: ${(err as Error).message}`);
        });
      }}
      class="flex flex-row cursor-pointer rounded bg-blue-300 hover:bg-blue-400 px-3 py-2"
    >
      <IconUpload />
      Upload
    </button>
  );
};
