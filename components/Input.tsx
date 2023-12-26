import { VNode } from "preact";
import { ForwardedRef, forwardRef, HTMLAttributes } from "preact/compat";

export type InputProps = HTMLAttributes<HTMLInputElement> & {
  startIcon?: VNode;
  endIcon?: VNode;
  sx?: string;
};

export const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div class="h-8 bg-white border focus-within:border-black flex gap-1">
        <div class="h-full flex items-center ml-2">{props?.startIcon}</div>
        <input
          class={`h-full w-full focus:outline-none ${props.sx}`}
          ref={ref}
          {...props}
        />
        <div class="h-full flex items-center mr-2">{props?.endIcon}</div>
      </div>
    );
  },
);
