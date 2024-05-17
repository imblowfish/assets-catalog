import { useCallback } from "preact/compat";
import { Button } from "$/components/Button.tsx";
import { ButtonGroup } from "$/components/ButtonGroup.tsx";
import { DownloadIcon, TrashIcon, XIcon } from "$/components/Icons.tsx";
import type { AssetData } from "$/data/database.ts";

interface AssetProps {
  url: string;
}

const Asset = (props: AssetProps) => {
  return (
    <div
      class="flex justify-center cursor-pointer"
      onClick={() => {
        globalThis.open(props.url);
      }}
      style={{ maxHeight: "calc(100vh - 64px)" }}
    >
      <img
        class="object-contain"
        src={props.url}
      />
    </div>
  );
};

type SidebarProps = AssetData;

export const Sidebar = (props: SidebarProps) => {
  const deleteAsset = useCallback(async () => {
    const resp = await fetch(`/api/v0/assets/${props.id}`, {
      method: "DELETE",
    });

    if (resp.status !== 200) {
      console.error(`API returned ${resp.status}: ${await resp.text()}`);
      return;
    }

    globalThis.location.href = "/";
  }, []);

  return (
    <div
      class={`sticky flex flex-col overflow-auto p-2 gap-2 top-16`}
      style={{ height: "calc(100vh - 64px)" }}
    >
      <ButtonGroup sx="justify-end">
        <Button
          onClick={() => {
            location.replace("/");
          }}
        >
          <XIcon />
        </Button>
      </ButtonGroup>
      <>
        <p>{props.title}</p>
        <p>{props.description}</p>
      </>
      <ButtonGroup sx="justify-end gap-1">
        <Button
          onClick={() => {
            if (
              !confirm(
                "Are you sure you want to delete this asset? This action is permanent",
              )
            ) {
              return;
            }
            deleteAsset().catch((err) => {
              console.error(err);
            });
          }}
        >
          <TrashIcon />
        </Button>
        <Button
          onClick={() => {
            const anchor = document.createElement("a");
            document.body.appendChild(anchor);
            anchor.download = props.url.split("/").at(-1)!;
            anchor.href = props.url;
            anchor.click();
            document.body.removeChild(anchor);
          }}
        >
          <DownloadIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

type AssetViewProps = AssetData;

export const AssetView = (props: AssetViewProps) => {
  return (
    <div class="grid grid-cols-4">
      <div class={`bg-black flex flex-col items-center gap-2 col-span-3`}>
        <Asset url={props.url} />
        {/* <Asset url="/test_asset_1.jpg" /> */}
      </div>
      <Sidebar {...props} />
    </div>
  );
};
