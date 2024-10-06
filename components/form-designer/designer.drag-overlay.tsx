import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import useDesigner from "./designer.hook";
import { FieldValues, useForm } from "react-hook-form";
import { getElConfigByType } from "./designer.utils";
import DesignerSidebar from "./designer.sidebar";
import RenderElements from "../form-builder/render/render-elements";

const DragOverlayWrapper = <T extends FieldValues>() => {
  const methods = useForm<T>();
  const { elements } = useDesigner<T>();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => setDraggedItem(event.active),
    onDragCancel: () => setDraggedItem(null),
    onDragEnd: () => setDraggedItem(null),
  });

  if (!draggedItem) return null;

  const { isDesignerBtnElement, isDesignerElement, type, elementId } =
    draggedItem.data?.current || {};

  if (isDesignerBtnElement) {
    const el = getElConfigByType(type);
    if (el)
      return (
        <DragOverlay>
          <DesignerSidebar.ListButtonDragOverlay formElement={el} />
        </DragOverlay>
      );
  }

  if (isDesignerElement) {
    const element = elements.find((el) => el.id === elementId);
    if (element) {
      return (
        <DragOverlay>
          <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer pointer-events-none">
            <RenderElements element={element} methods={methods} />
          </div>
        </DragOverlay>
      );
    } else {
      return (
        <DragOverlay>
          <div>Element not found</div>
        </DragOverlay>
      );
    }
  }

  return (
    <DragOverlay>
      <div>No drag overlay</div>
    </DragOverlay>
  );
};

export default DragOverlayWrapper;
