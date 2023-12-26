import { ComponentChildren } from "preact";

export interface DividerProps {
  children?: ComponentChildren;
}

export const Divider = (props: DividerProps) => {
  return (
    <h1 class="w-full text-gray-500 flex items-center">
      <span class="grow border-b border-gray-400" />
      {props.children && <div class="ml-1 mr-1">{props.children}</div>}
      <span class="grow border-b border-gray-400" />
    </h1>
  );
};
