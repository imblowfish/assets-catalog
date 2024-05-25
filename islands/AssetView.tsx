import { useCallback } from "preact/compat";
import { Button } from "$/components/Button.tsx";
import { ButtonGroup } from "$/components/ButtonGroup.tsx";
import { DownloadIcon, TrashIcon, XIcon } from "$/components/Icons.tsx";
import type { Asset } from "$/data/database/backend/db_api.ts";

interface AssetImageProps {
  url: string;
}

const AssetImage = (props: AssetImageProps) => {
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

type SidebarProps = Asset;

export const Sidebar = (props: SidebarProps) => {
  const deleteAsset = useCallback(async () => {
    let resp = await fetch(`/api/v0.1/asset/${props.id}`, {
      method: "DELETE",
    });

    if (resp.status !== 200) {
      throw new Error(`API returned [${resp.status}]: ${await resp.text()}`);
    }

    resp = await fetch(props.objectUrl, {
      method: "DELETE",
    });

    if (resp.status !== 200) {
      throw new Error(`API returned [${resp.status}]: ${await resp.text()}`);
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
                "Are you sure you want to delete this asset? This action is permanent"
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
            anchor.href = props.objectUrl;
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

type AssetViewProps = Asset;

export const AssetView = (props: AssetViewProps) => {
  return (
    <div class="grid grid-cols-4">
      <div class={`bg-black flex flex-col items-center gap-2 col-span-3`}>
        <AssetImage url={props.objectUrl} />
        {/* <Asset url="/test_asset_1.jpg" /> */}
      </div>
      <Sidebar {...props} />
    </div>
  );
};
