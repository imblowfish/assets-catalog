import type { User } from "$/data/database/database.ts";
import { Avatar } from "$/components/Avatar.tsx";
import { Input } from "$/components/Input.tsx";
import { SearchIcon } from "$/components/Icons.tsx";
import { ActionsButton } from "$/islands/ActionsButton.tsx";

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
  showSearch?: boolean;
  showActions?: boolean;
  user?: User;
}

export const Header = (props: HeaderProps) => {
  return (
    <header class="border bg-white h-16 sticky top-0 z-50 w-full">
      <div class="h-full flex justify-between items-center ml-4 mr-4">
        <Logo />
        <div class="flex flex-row items-center gap-4">
          {props.showSearch && (
            <Input
              placeholder="Search"
              endIcon={<SearchIcon />}
            />
          )}
          {props.showActions && <ActionsButton />}
          {props.user && <Avatar userUrl={props.user.htmlUrl} />}
        </div>
      </div>
    </header>
  );
};
