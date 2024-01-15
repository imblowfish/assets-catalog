import { ComponentChildren } from "preact";

interface ButtonGroupProps {
  children: ComponentChildren;
  vertical?: boolean;
  sx?: string;
}

export const ButtonGroup = (props: ButtonGroupProps) => {
  return (
    <div class={`flex ${props.vertical ? "flex-col" : "flex-row"} ${props.sx}`}>
      {props.children}
    </div>
  );
};
