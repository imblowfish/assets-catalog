export interface LogoProps {
  sx?: string;
}

export const Logo = (props: LogoProps) => {
  return (
    <img
      class={`cursor-pointer select-none w-8 h-8 ${props.sx}`}
      src="/logo.svg"
    />
  );
};
