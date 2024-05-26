import { Button } from "$/components/Button.tsx";
import { ButtonGroup } from "$/components/ButtonGroup.tsx";
import { Dropdown, DropdownItem } from "$/components/Dropdown.tsx";
import { ChevronDownIcon, PlusIcon } from "$/components/Icons.tsx";

const NewButton = () => {
  return (
    <Dropdown
      button={
        <Button
          startIcon={<PlusIcon />}
          endIcon={<ChevronDownIcon />}
        />
      }
    >
      <DropdownItem
        onClick={() => {
          globalThis.location.href = "/new/asset";
        }}
      >
        New asset
      </DropdownItem>
    </Dropdown>
  );
};

export const ActionsButton = () => {
  return (
    <ButtonGroup>
      <NewButton />
    </ButtonGroup>
  );
};
