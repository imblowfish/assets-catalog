import { Avatar } from "$/components/Avatar.tsx";
import { Logo } from "$/components/Logo.tsx";
import IconSearch from "icons/search.tsx";

export const Header = () => {
  return (
    <header class="bg-[#444444] h-16 sticky top-0 z-50">
      <div class="h-full flex justify-between items-center">
        <Logo sx="ml-4" />
        <div class="w-1/2 border border-gray-100 rounded-full flex flex-row items-center transition focus-within:border-sky-500">
          <IconSearch class="w-5 h-5 ml-2 mr-2 text-gray-100" />
          <input
            class="w-full h-9 bg-transparent focus:outline-none text-gray-100"
            placeholder="Search"
            type="search"
          />
        </div>
        <Avatar sx="mr-4" />
      </div>
    </header>
  );
};
