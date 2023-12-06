import { useState } from "preact/hooks";
import { Button } from "$/components/Button.tsx";
import { ButtonGroup } from "$/components/ButtonGroup.tsx";
import { ChevronDownIcon, PlusIcon } from "$/components/Icons.tsx";

const CreateButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div class="relative">
      <Button
        startIcon={<PlusIcon />}
        endIcon={<ChevronDownIcon />}
        onFocus={() => {
          setModalVisible(true);
        }}
        onBlur={() => {
          setModalVisible(false);
        }}
      />
      {modalVisible && (
        <ButtonGroup
          vertical
          sx="absolute right-0 p-2 gap-1 rounded border border-black bg-white"
        >
          <Button>New asset</Button>
        </ButtonGroup>
      )}
    </div>
  );
};

export const ActionsButton = () => {
  return (
    <ButtonGroup>
      <CreateButton />
    </ButtonGroup>
  );
};
