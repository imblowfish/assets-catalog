export interface AvatarProps {
  sx?: string;
}

export const Avatar = (props: AvatarProps) => {
  return (
    <div
      class={`cursor-pointer select-none w-8 h-8 bg-black rounded-full ${props.sx}`}
    />
  );
};
