import { useCallback } from "preact/compat";
import { AssetData } from "$/data/database.ts";
import { Button } from "$/components/Button.tsx";
// import { Input } from "$/components/Input.tsx";
import { ButtonGroup } from "$/components/ButtonGroup.tsx";
// import { EditIcon } from "$/components/Icons.tsx";
// import { CheckIcon } from "$/components/Icons.tsx";
import { XIcon } from "$/components/Icons.tsx";
import { DownloadIcon } from "$/components/Icons.tsx";
import { TrashIcon } from "$/components/Icons.tsx";

type ContentProps = Pick<AssetData, "title" | "description">;

const Content = (props: ContentProps) => {
  return (
    <>
      <p>{props.title}</p>
      <p>{props.description}</p>
    </>
  );
};

// const ContentEditable = (props: ContentProps) => {
//   return (
//     <>
//       <Input
//         value={props.title}
//         placeholder="Title"
//       />
//       <Input
//         value={props.description}
//         placeholder="Description"
//       />
//     </>
//   );
// };

interface SidebarProps {
  height: string;
  sx?: string;
  assetData: AssetData;
}

export const Sidebar = (props: SidebarProps) => {
  const msg = 10;
  // const [editMode, setEditMode] = useState(false);

  const deleteAsset = useCallback(async () => {
    const resp = await fetch(`/api/v0/assets/${props.assetData.id}`, {
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
      {
        /* {editMode
        ? <ContentEditable {...props.assetData} />
        : <Content {...props.assetData} /> */
      }
      <Content {...props.assetData} />
      <ButtonGroup sx="justify-end gap-1">
        {
          /* <Button
          onClick={() => {
            setEditMode((value) => !value);
          }}
        >
          {editMode ? <CheckIcon /> : <EditIcon />}
        </Button> */
        }
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
            anchor.download = props.assetData.url.split("/").at(-1)!;
            anchor.href = props.assetData.url;
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
