import { useCallback, useState } from "preact/compat";
import { Button } from "$/components/Button.tsx";
import { Input } from "$/components/Input.tsx";
import { ButtonGroup } from "$/components/ButtonGroup.tsx";
import { EditIcon } from "$/components/Icons.tsx";
import { CheckIcon } from "$/components/Icons.tsx";
import { XIcon } from "$/components/Icons.tsx";
import { DownloadIcon } from "$/components/Icons.tsx";
import { TrashIcon } from "$/components/Icons.tsx";

interface SidebarProps {
  height: string;
  sx?: string;
  assetId: string;
}

const Content = () => {
  return (
    <>
      <p>Title</p>
      <p>Description</p>
    </>
  );
};

const ContentEditable = () => {
  return (
    <>
      <Input
        value="Title"
        placeholder="Title"
      />
      <Input
        value="Description"
        placeholder="Description"
      />
    </>
  );
};

export const Sidebar = (props: SidebarProps) => {
  const [editMode, setEditMode] = useState(false);

  const deleteAsset = useCallback(async () => {
    const resp = await fetch(`/api/v0/assets/${props.assetId}`, {
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
      class={`sticky flex flex-col overflow-auto p-2 gap-2 ${props.sx}`}
      style={{ height: props.height }}
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
      {editMode ? <ContentEditable /> : <Content />}
      <ButtonGroup sx="justify-end gap-1">
        <Button
          onClick={() => {
            setEditMode((value) => !value);
          }}
        >
          {editMode ? <CheckIcon /> : <EditIcon />}
        </Button>
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
            anchor.download = "test_asset_1.jpg";
            anchor.href = "/test_asset_1.jpg";
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
