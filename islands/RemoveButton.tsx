import IconTrash from "icons/trash.tsx";

async function deleteAsset(assetId: string) {
  const resp = await fetch(`/api/v0/assets/${assetId}`, {
    method: "DELETE",
  });

  if (resp.status !== 200) {
    throw new Error("Can't delete asset");
  }

  window.location.href = "/";
}

export interface DeleteButtonProps {
  assetId: string;
}

export const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <button
      onClick={() => {
        deleteAsset(props.assetId).catch((err) => {
          console.error(`Can't delete asset ${(err as Error).message}`);
        });
      }}
    >
      <IconTrash class="mt-2 w-8 h-8" />
    </button>
  );
};
