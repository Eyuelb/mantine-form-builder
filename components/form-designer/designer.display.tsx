"use client";
import React from "react";
import useDesigner from "./designer.hook";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { randomId } from "@mantine/hooks";
import { TField } from "../form-builder/model";
import { FieldValues } from "react-hook-form";
import { cn } from "@/utils/class";
import DesignerElementWrapper from "./designer.element";
import DesignerSidebarElementsMenu from "./designer.sidebar";
import { getElConfigByType } from "./designer.utils";
import { Flex } from "@mantine/core";

const DesignerDisplay: React.FC = () => {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });
  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const {
        isDesignerBtnElement,
        type,
        isDesignerElement,
        elementId: activeId,
      } = active.data?.current || {};
      const {
        isDesignerDropArea,
        isTopHalfDesignerElement,
        isBottomHalfDesignerElement,
        elementId: overId,
      } = over.data?.current || {};
      // Dropping a sidebar btn element over the designer drop area
      const droppingSidebarBtnOverDesignerDropArea =
        isDesignerBtnElement && isDesignerDropArea;

      if (droppingSidebarBtnOverDesignerDropArea) {
        const el = getElConfigByType(type);
        if (el) {
          const newElement: TField<FieldValues> = {
            id: `${elements.length}-${type}-${randomId()}`,
            position: elements.length,
            ...el,
            name: `${elements.length}-${type}-${randomId()}`,
          };

          addElement(elements.length, newElement);
        }

        return;
      }
      const isDroppingOverDesignerElementBottomHalf =
        isBottomHalfDesignerElement;
      const isDroppingOverDesignerElement =
        isTopHalfDesignerElement || isBottomHalfDesignerElement;

      const droppingSidebarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      if (droppingSidebarBtnOverDesignerElement) {
        const el = getElConfigByType(type);

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (overElementIndex === -1) {
          throw new Error("element not found");
        }

        let indexForNewElement = overElementIndex; // assuming im on the top half 😏
        if (isBottomHalfDesignerElement) {
          indexForNewElement = overElementIndex + 1;
        }
        if (el) {
          const newElement: TField<FieldValues> = {
            id: `${elements.length}-${type}-${randomId()}`,
            position: elements.length,
            ...el,
            name: `${elements.length}-${type}-${randomId()}`,
          };

          addElement(indexForNewElement, newElement);
        }
        return;
      }

      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not foun");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex; // assuming im on the top half 😏
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <Flex className="flex w-full h-full divide-x-2">
      <DesignerSidebarElementsMenu />

      <div
        ref={droppable.setNodeRef}
        className={cn(
          "h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
          droppable.isOver && "ring-4 ring-primary ring-inset"
        )}
      >
        {!droppable.isOver && elements.length === 0 && (
          <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
            Drop Here
          </p>
        )}

        {droppable.isOver && elements.length === 0 && (
          <div className="p-4 w-full">
            <div className="h-[120px] rounded-md bg-primary/20"></div>
          </div>
        )}

        {elements.length > 0 && (
          <div className="flex flex-col w-full gap-2 p-4">
            {elements.map((element) => (
              <DesignerElementWrapper key={element.id} element={element} />
            ))}
          </div>
        )}
      </div>
      <DesignerSidebarElementsMenu.DesignerSidebarElementConfig />
    </Flex>
  );
};

export default DesignerDisplay;
