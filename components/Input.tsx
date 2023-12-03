import { VNode } from "preact";

export interface InputProps {
  type?: "email" | "password";
  placeholder?: string;
  startIcon?: VNode;
  endIcon?: VNode;
  sx?: string;
}

export const Input = (props: InputProps) => {
  return (
    <div class="h-8 bg-white border focus-within:border-black flex gap-1">
      <div class="h-full flex items-center ml-2">{props?.startIcon}</div>
      <input
        class={`h-full w-full focus:outline-none ${props.sx}`}
        placeholder={props.placeholder}
        type={props.type}
      />
      <div class="h-full flex items-center mr-2">{props?.endIcon}</div>
    </div>
  );
};
