import { useCallback, useRef } from "preact/hooks";
import { Button } from "$/components/Button.tsx";
import { Input } from "$/components/Input.tsx";
import { FileUploader } from "$/islands/FileUploader.tsx";

export function CreateNewAsset() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const assetTitleRef = useRef<HTMLInputElement | null>(null);
  const assetDescriptionRef = useRef<HTMLInputElement | null>(null);

  const uploadAsset = useCallback(async () => {
    if (!formRef.current) {
      return;
    }

    const fileFormData = new FormData(formRef.current);
    fileFormData.delete("title");
    fileFormData.delete("description");

    let resp = await fetch("/api/v0/storage", {
      method: "POST",
      body: fileFormData,
    });

    if (resp.status !== 200) {
      console.error(`API returned ${resp.status}: ${await resp.text()}`);
      return;
    }

    const assetFormData = new FormData(formRef.current);
    assetFormData.delete("file");
    assetFormData.set("url", ((await resp.json()) as { url: string }).url);

    resp = await fetch(`/api/v0/assets`, {
      method: "POST",
      body: assetFormData,
    });

    if (resp.status != 200) {
      console.error(`API returned ${resp.status}`);
      return;
    }

    globalThis.location.href = "/";
  }, []);

  return (
    <div class="flex justify-center m-4">
      <div class="flex flex-col w-[50%] gap-8">
        <p class="text-2xl">Create a new asset</p>
        <form
          ref={formRef}
          class="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            uploadAsset().catch((err) => {
              console.error(err);
            });
          }}
        >
          <Input
            ref={assetTitleRef}
            required
            name="title"
            placeholder="Asset title"
          />
          <Input
            ref={assetDescriptionRef}
            name="description"
            placeholder="Description(optional)"
          />
          <FileUploader
            name="file"
            required
          />
          <div class="flex flex-row content-end justify-end">
            <Button type="submit">Create asset</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
