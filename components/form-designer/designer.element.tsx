import { useDraggable, useDroppable } from "@dnd-kit/core";
import { memo, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useDesigner from "./designer.hook";
import { TField } from "../form-builder/model";
import { ActionIcon, Box, Group, Paper, Stack } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import RenderElements from "../form-builder/render/render-elements";
const Element = memo(({ element }: { element: TField<any> }) => {
  const methods = useForm();

  const memoizedElement = useMemo(() => element, [element]);

  return (
    <Box className="p-3">
      <RenderElements element={memoizedElement} methods={methods} editing />
    </Box>
  );
});
Element.displayName = "Elements";

function DesignerElementWrapper<T extends FieldValues>({
  element,
}: {
  element: TField<T>;
}) {
  const [hovered, setHovered] = useState(false);

  const { removeElement, setSelectedElement } = useDesigner<T>();
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });
  if (draggable.isDragging) return null;
  return (
    <Stack className="relative">
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      />
      <Paper
        shadow="xs"
        ref={draggable.setNodeRef}
        {...draggable.listeners}
        {...draggable.attributes}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex flex-col hover:cursor-pointer rounded-md"
      >
        {hovered && (
          <Group
            justify="right"
            gap={4}
            style={{ position: "absolute", top: 5, right: 5 }}
          >
            <ActionIcon
              size={"sm"}
              color="red"
              onClick={() => removeElement(element.id ?? "hello")}
            >
              <IconTrash size={14} />
            </ActionIcon>
            <ActionIcon
              size="sm"
              color="blue"
              onClick={() => {
                setSelectedElement(element);
              }}
            >
              <IconEdit size={14} />
            </ActionIcon>
          </Group>
        )}
        <Element element={element}/>
      </Paper>
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-[var(--mantine-color-primary-7)] rounded-b-none" />
      )}
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-[var(--mantine-color-primary-7)] rounded-t-none" />
      )}
    </Stack>
  );
}

export default DesignerElementWrapper;
