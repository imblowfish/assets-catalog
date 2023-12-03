import { Avatar } from "$/components/Avatar.tsx";
import { Input } from "$/components/Input.tsx";
import { SearchIcon } from "$/components/Icons.tsx";

export interface LogoProps {
  sx?: string;
}

export const Logo = (props: LogoProps) => {
  return (
    <a href="/">
      <img
        class={`cursor-pointer select-none w-8 h-8 ${props.sx}`}
        src="/logo.svg"
      />
    </a>
  );
};

export interface HeaderProps {
  search?: boolean;
  avatar?: boolean;
}

export const Header = (props: HeaderProps) => {
  return (
    <header class="border bg-white h-16 sticky top-0 z-50 w-full">
      <div class="h-full flex justify-between items-center">
        <Logo sx="ml-4" />
        {props.search && (
          <Input
            placeholder="Search"
            endIcon={<SearchIcon />}
          />
        )}
        {props.avatar && <Avatar sx="mr-4" />}
      </div>
    </header>
  );
};
