import { IS_BROWSER } from "$fresh/runtime.ts";
import { VNode } from "preact";
import { ForwardedRef, forwardRef, HTMLAttributes } from "preact/compat";

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  startIcon?: VNode;
  endIcon?: VNode;
  sx?: string;
};

export const Button = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button
        ref={ref}
        class={`h-8 whitespace-nowrap border rounded border-black bg-white hover:bg-black hover:text-white flex justify-between gap-1 ${props.sx}`}
        {...props}
      >
        <div class="h-full flex items-center ml-2">{props.startIcon}</div>
        <div class="h-full flex justify-center items-center">
          {props.children}
        </div>
        <div class="h-full flex items-center mr-2">{props.endIcon}</div>
      </button>
    );
  },
);
