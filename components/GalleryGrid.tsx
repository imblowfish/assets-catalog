import { ComponentChildren } from "preact";
import { Avatar } from "$/components/Avatar.tsx";

interface ThumbnailProps {
  sx?: string;
  url: string;
}

const Thumbnail = (props: ThumbnailProps) => {
  return (
    <div class={`h-full flex ${props.sx}`}>
      <img
        class="object-cover"
        src={props.url}
      />
    </div>
  );
};

interface GalleryGridOverlayProps {
  sx?: string;
  title: string;
  author: string;
}

const GridOverlay = (props: GalleryGridOverlayProps) => {
  return (
    <div class={props.sx}>
      <div class="bottom-0 left-0 w-full h-full opacity-70 absolute bg-gradient-to-t from-black" />
      <div class="bottom-1 w-full absolute flex flex-row">
        <Avatar sx="ml-1" />
        <div class="ml-1">
          <p class="text-[16px] text-white font-semibold">{props.title}</p>
          <p class="text-[12px] text-white">{props.author}</p>
        </div>
      </div>
    </div>
  );
};

export interface GalleryGridItemProps {
  thumbnailUrl: string;
}

export const GalleryGridItem = (props: GalleryGridItemProps) => {
  return (
    <a href="/assets/123">
      <div class="group rounded-md cursor-pointer select-none overflow-hidden w-60 h-60 relative">
        <Thumbnail
          sx="transition duration-500 easy-in-out group-hover:scale-110"
          url={props.thumbnailUrl}
        />
        <GridOverlay
          sx="opacity-0 transition duration-300 group-hover:opacity-100"
          title="Some title"
          author="Some Author"
        />
      </div>
    </a>
  );
};

export interface GalleryGridProps {
  sx?: string;
  children: ComponentChildren;
}

export const GalleryGrid = (props: GalleryGridProps) => {
  return (
    <div class="flex flex-row flex-wrap justify-center gap-1 m-4">
      {props.children}
    </div>
  );
};
