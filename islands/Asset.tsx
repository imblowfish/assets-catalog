import { ForwardedRef, forwardRef } from "preact/compat";

interface AssetProps {
  url?: string;
  maxHeight?: string;
}

export const Asset = forwardRef(
  (props: AssetProps, ref: ForwardedRef<HTMLImageElement>) => {
    return (
      <div
        class="flex justify-center cursor-pointer"
        onClick={() => {
          window.open(props.url);
        }}
        style={{ maxHeight: props.maxHeight ?? "100%" }}
      >
        <img
          class="object-contain"
          ref={ref}
          src={props.url}
        />
      </div>
    );
  },
);
