import { Avatar } from "$/components/Avatar.tsx";
import { Logo } from "$/components/Logo.tsx";
import IconSearch from "icons/search.tsx";

export interface HeaderProps {
  search?: boolean;
}

export const Header = (props: HeaderProps) => {
  return (
    <header class="border bg-white h-16 sticky top-0 z-50 w-full">
      <div class="h-full flex justify-between items-center">
        <Logo sx="ml-4" />
        {props.search && (
          <div class="border focus-within:border-black flex flex-row items-center">
            <input
              class="w-full ml-2 h-8 bg-transparent focus:outline-none"
              placeholder="Search"
              type="search"
            />
            <IconSearch class="w-5 h-5 ml-2 mr-2" />
          </div>
        )}
        <Avatar sx="mr-4" />
      </div>
    </header>
  );
};
