export interface AvatarProps {
  sx?: string;
}

export const Avatar = (props: AvatarProps) => {
  return (
    <a href="/users/some_user">
      <div class={`cursor-pointer select-none w-8 h-8 bg-black rounded-full ${props.sx}`} />
    </a>
  );
};
