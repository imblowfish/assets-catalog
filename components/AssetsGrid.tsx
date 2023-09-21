import { Asset } from "$/data/database.ts";

interface AssetProps {
  id: string;
  title: string;
}

const AssetCard = (props: AssetProps) => {
  return (
    <div class="select-none cursor-pointer flex flex-col border(gray-300 2) rounded-md">
      <a href={`/assets/${props.id}`}>
        <img
          class="aspect-square overflow-hidden"
          src={`api/v0/assets/preview/${props.id}`}
        />
        <p class="ml-4 py-2 text-gray-800">{props.title}</p>
      </a>
    </div>
  );
};

export interface AssetsGridProps {
  assets: Asset[];
}

export const AssetsGrid = (props: AssetsGridProps) => {
  const cards = [];

  for (const asset of props.assets) {
    cards.push(
      <AssetCard
        id={asset.id}
        title={asset.title}
      />,
    );
  }

  return <div class="p-3 grid grid-cols-8 gap-2">{cards}</div>;
};
