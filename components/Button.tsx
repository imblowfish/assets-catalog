import { ComponentChildren, VNode } from "preact";

interface ButtonProps {
  children?: ComponentChildren;
  startIcon?: VNode;
  endIcon?: VNode;
  onFocus?: () => void;
  onBlur?: () => void;
  sx?: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      class={`h-8 whitespace-nowrap border-2 rounded border-black bg-white hover:bg-black hover:text-white flex justify-between gap-1 ${props.sx}`}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      <div class="h-full flex items-center ml-2">{props.startIcon}</div>
      <div class="h-full flex justify-center items-center">
        {props.children}
      </div>
      <div class="h-full flex items-center mr-2">{props.endIcon}</div>
    </button>
  );
};
