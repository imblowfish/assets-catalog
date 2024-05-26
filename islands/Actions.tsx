import { useCallback, useRef } from "preact/hooks";
import { Button } from "$/components/Button.tsx";
import { Input } from "$/components/Input.tsx";
import { FileUploader } from "$/islands/FileUploader.tsx";
import { HttpCode } from "$/data/http_codes.ts";
import {
  AssetCreationRequest,
  FileCreationResponse,
} from "$/data/responses.ts";

interface CreateNewAssetProps {
  username: string;
}

export function CreateNewAsset(props: CreateNewAssetProps) {
  const inputTitleRef = useRef<HTMLInputElement | null>(null);
  const inputDescriptionRef = useRef<HTMLInputElement | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const onSubmitCallback = useCallback(async () => {
    if (
      !inputTitleRef.current ||
      !inputDescriptionRef.current ||
      !inputFileRef.current
    ) {
      throw new Error("Can't get all necessary data to submit");
    }

    const title = inputTitleRef.current.value;
    const description = inputDescriptionRef.current.value;
    const files = inputFileRef.current.files;
    if (!files) {
      throw new Error("User didn't choose any file");
    }
    const file = files[0];

    const formData = new FormData();
    formData.set("file", file);

    let resp = await fetch(
      `http://localhost:8000/api/v0/user/${props.username}/files`,
      {
        method: "POST",
        body: formData,
      },
    );
    if (resp.status !== HttpCode.Created) {
      throw new Error(`API returned [${resp.status}]: ${await resp.text()}`);
    }
    const fileResponse = (await resp.json()) as FileCreationResponse;

    resp = await fetch(
      `http://localhost:8000/api/v0/user/${props.username}/assets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            title,
            description,
            objectUrl: fileResponse.url,
          } satisfies AssetCreationRequest,
        ),
      },
    );
    if (resp.status !== HttpCode.Created) {
      throw new Error(`API returned [${resp.status}]: ${await resp.text()}`);
    }
  }, []);

  return (
    <div class="flex justify-center m-4">
      <div class="flex flex-col w-[50%] gap-8">
        <p class="text-2xl">Create a new asset</p>
        <form
          class="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmitCallback()
              .then(() => {
                globalThis.location.href = "/";
              })
              .catch((err) => {
                throw err;
              });
          }}
        >
          <Input
            ref={inputTitleRef}
            required
            name="title"
            placeholder="Title"
          />
          <Input
            ref={inputDescriptionRef}
            name="description"
            placeholder="Description"
          />
          <FileUploader
            ref={inputFileRef}
            required
            name="file"
          />
          <div class="flex flex-row content-end justify-end">
            <Button type="submit">Create asset</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
