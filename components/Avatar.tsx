export interface AvatarProps {
  sx?: string;
  userUrl: string;
}

export const Avatar = (props: AvatarProps) => {
  return (
    <a href={props.userUrl}>
      <div
        class={`cursor-pointer select-none w-8 h-8 bg-black rounded-full ${props.sx}`}
      />
    </a>
  );
};

export const AvatarFull = (props: AvatarProps) => {
  return (
    <a href={props.userUrl}>
      <div
        class={`cursor-pointer select-none w-40 h-40 bg-black rounded-full ${props.sx}`}
      />
    </a>
  );
};
