import { useCallback, useRef } from "preact/hooks";
import { Button } from "$/components/Button.tsx";
import { Input } from "$/components/Input.tsx";
import { FileUploader } from "$/islands/FileUploader.tsx";

function CreateNewAsset() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  const uploadAsset = useCallback(async () => {
    if (!formRef.current) {
      return;
    }

    const resp = await fetch(`/api/v0/assets`, {
      method: "POST",
      body: new FormData(formRef.current),
    });

    if (resp.status != 200) {
      console.error(`API returned ${resp.status}`);
      return;
    }

    window.location.href = "/";
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
            ref={nameRef}
            required
            name="title"
            placeholder="Asset title"
          />
          <Input
            ref={descriptionRef}
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

export const Actions = {
  CreateNewAsset: CreateNewAsset,
};
