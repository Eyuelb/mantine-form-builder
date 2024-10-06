import { Box, Button, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { elementsConfig } from "./designer.utils";
import { FieldValues } from "react-hook-form";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/utils/class";

import { fieldConfigForm } from "./designer.config";
import useDesigner from "./designer.hook";
import { TField } from "@/components/form-builder/model";
import FormBuilder from "@/components/form-builder/builder";

const ListButton = <T extends FieldValues>({
  element,
}: {
  element: Partial<TField<T>>;
}) => {
  const { label, icon: Icon } = element;
  const draggable = useDraggable({
    id: `designer-btn-${element.type}`,
    data: {
      type: element.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <Button
      leftSection={<Icon size={14} className="cursor-grab" />}
      size="compact-sm"
      variant="outline"
      fullWidth
      fz={12}
      ref={draggable.setNodeRef}
      className={cn("cursor-grab", draggable.isDragging && "ring-2 ")}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      {label}
    </Button>
  );
};

function DragOverlay<T extends FieldValues>({
  formElement,
}: {
  formElement: TField<T>;
}) {
  const { label, icon: Icon } = formElement;

  return (
    <Button
      leftSection={<Icon size={14} className="cursor-grab" />}
      size="compact-sm"
      variant="light"
      fz={12}
      className="flex flex-col gap-2 h-[80px] w-[120px] cursor-grab opacity-80"
    >
      {label}
    </Button>
  );
}

const DesignerSidebarElementsMenu = () => {
  return (
    <Stack gap={6}>
      <Text ta="center" fw={500} mt={10} fz={14}>
        Components
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center px-2">
        {elementsConfig.map((el, i) => (
          <ListButton key={i} element={el} />
        ))}
      </div>
    </Stack>
  );
};
const DesignerSidebarElementConfig = <T extends FieldValues>() => {
  const { updateElement, selectedElement } = useDesigner<T>();
  return (
    <Box className="w-[300px] p-3 py-2">
      <Stack gap={2}>
        <Text ta="center" fw={500} mt={10} fz={14}>
          Config
        </Text>
        <ScrollArea h={500} w={240} scrollbars="y">
          <Box w={220}>
            {selectedElement && (
              <FormBuilder<any>
                key={selectedElement?.id}
                fields={fieldConfigForm}
                defaultValues={selectedElement}
                onChange={(v) => {
                  selectedElement?.id && updateElement(selectedElement.id, v);
                }}
                // onChange={console.log}
              />
            )}{" "}
          </Box>
        </ScrollArea>
      </Stack>
    </Box>
  );
};

DesignerSidebarElementsMenu.DesignerSidebarElementConfig =
  DesignerSidebarElementConfig;

DesignerSidebarElementsMenu.ListButtonDragOverlay = DragOverlay;

export default DesignerSidebarElementsMenu;
