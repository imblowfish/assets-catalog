import { ComponentChildren } from "preact";

export interface DividerProps {
  children?: ComponentChildren;
}

export const Divider = (props: DividerProps) => {
  return (
    <h1 class="w-full text-gray-500 flex">
      <span class="grow border-b h-[50%] border-gray-400" />
      {props.children && <div class="ml-1 mr-1">{props.children}</div>}
      <span class="grow border-b h-[50%] border-gray-400" />
    </h1>
  );
};
