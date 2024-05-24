import { User } from "$/data/database/database.ts";

export interface AvatarProps {
  sx?: string;
  user: User;
}

export const Avatar = (props: AvatarProps) => {
  return (
    <a href={props.user.htmlUrl}>
      <div
        class={`cursor-pointer select-none w-8 h-8 bg-black rounded-full ${props.sx}`}
      />
    </a>
  );
};

export const AvatarFull = (props: AvatarProps) => {
  return (
    <a href={props.user.htmlUrl}>
      <div
        class={`cursor-pointer select-none w-40 h-40 bg-black rounded-full ${props.sx}`}
      />
    </a>
  );
};
