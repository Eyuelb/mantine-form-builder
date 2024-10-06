"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useDesigner from "./designer.hook";
import Designer from "./designer.display";
import DragOverlayWrapper from "./designer.drag-overlay";
import { FieldValues } from "react-hook-form";
import DesignerContextProvider from "./designer.context";
import {
  ActionIcon,
  Button,
  CopyButton,
  Group,
  LoadingOverlay,
  Stack,
  Textarea,
} from "@mantine/core";
import TooltipButton from "@/components/common/tooltip-button";
import {
  IconCopy,
  IconCopyCheckFilled,
  IconDeviceFloppy,
  IconEye,
  IconJson,
} from "@tabler/icons-react";
import { iconDefaultProps } from "@/config/icon";
import { modals } from "@mantine/modals";
import JsonSchemaForm from "./json-schema-form";
import usePersistForm from "@/hooks/usePersistForm";

const FormDesignerComponent = <T extends FieldValues>({
  id,
  name
}: {
  id: string;
  name:string
}) => {
  const { update } = usePersistForm();

  const { setElements, elements } = useDesigner<T>();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full min-h-screen">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {name}
          </h2>
          <div className="flex items-center gap-2">
            <Group className="mb-3  mt-1 gap-1">
              <CopyButton value={JSON.stringify(elements)} timeout={2000}>
                {({ copied, copy }) => (
                  <TooltipButton
                    color={copied ? "teal" : ""}
                    variant="subtle"
                    tooltip={copied ? "Copied" : "Copy"}
                    onClick={copy}
                  >
                    {copied ? (
                      <IconCopyCheckFilled {...iconDefaultProps} />
                    ) : (
                      <IconCopy {...iconDefaultProps} />
                    )}{" "}
                  </TooltipButton>
                )}
              </CopyButton>
              <TooltipButton
                variant="subtle"
                tooltip={"Add Json Schema"}
                onClick={() =>
                  modals.open({
                    children: <JsonSchemaForm onSubmit={setElements} />,
                  })
                }
              >
                <IconJson {...iconDefaultProps} />
              </TooltipButton>
              <TooltipButton
                variant="subtle"
                tooltip={"Save"}
                onClick={() =>
                  update({
                    id: id,
                    elements: elements,
                    updated_at: new Date().toString(),
                  })
                }
              >
                <IconDeviceFloppy {...iconDefaultProps} />
              </TooltipButton>
              <ActionIcon
                size="sm"
                variant="subtle"
                component={Link}
                href={`/form/${id}`}
                onClick={() =>
                  update({
                    id: id,
                    elements: elements,
                    updated_at: new Date().toString(),                  })
                }
              >
                <IconEye {...iconDefaultProps} />
              </ActionIcon>
            </Group>
          </div>
        </nav>

        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] ">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default function FormDesigner({ id }: { id: string }) {
  const { getById } = usePersistForm();
  const form = getById(id);
  if (!form) {
    return <LoadingOverlay visible />;
  }

  return (
    <DesignerContextProvider initValue={form?.elements}>
      <FormDesignerComponent id={id} name={form.name} />
    </DesignerContextProvider>
  );
}
