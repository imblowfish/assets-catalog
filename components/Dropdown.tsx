import { ComponentChildren, VNode } from "preact";
import { Button } from "$/components/Button.tsx";
import { ButtonGroup } from "$/components/ButtonGroup.tsx";

interface DropdownProps {
  button: VNode;
  dropSide?: "left" | "right";
  children: ComponentChildren;
}

export const DropdownItem = Button;

export const Dropdown = (props: DropdownProps) => {
  return (
    <div class="group relative">
      {props.button}
      <ButtonGroup
        sx={`absolute p-2 gap-1 rounded border border-black bg-white invisible group-hover:visible ${
          props.dropSide === "right" ? "left-0" : "right-0 "
        }`}
        vertical
      >
        {props.children}
      </ButtonGroup>
    </div>
  );
};
