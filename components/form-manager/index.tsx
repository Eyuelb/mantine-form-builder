"use client";
import usePersistForm from "@/hooks/usePersistForm";
import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Table,
  TextInput,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import React from "react";
import { TField } from "../form-builder/model";
import { IconEye, IconForms, IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { formatDate } from "@/utils/helper";
import { FieldValues } from "react-hook-form";
import { modals } from "@mantine/modals";
import FormBuilder from "../form-builder/builder";
type TPersistForm = {
  id: string;
  name: string;
  elements: TField<any>[];
};
const FormManager = () => {
  const { getAll, create, remove } = usePersistForm();

  const handleCreate = () => {};

  const handleDelete = (id: string) => {
    remove(id);
  };

  const allFields = getAll();

  return (
    <div className="w-full">
      <Table striped captionSide="top">
        <Table.Caption>
          <Button
            onClick={() =>
              modals.open({
                children: (
                  <FormBuilder
                    fields={[
                      {
                        type: "text",
                        name: "name",
                        label: "Form Name",
                      },
                    ]}
                    onSubmit={(values) => {
                      create({
                        ...values,
                        id: randomId(),
                        elements: [],
                        created_at: new Date().toString(),
                        updated_at: new Date().toString(),
                      });
                      modals.closeAll();
                    }}
                  >
                    <Group justify="flex-end" mt={20}>
                      <Button type="submit">Submit</Button>
                    </Group>
                  </FormBuilder>
                ),
              })
            }
          >
            Create Field
          </Button>
        </Table.Caption>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>No</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Created at</Table.Th>
            <Table.Th>Updated at</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {allFields.map((row, i) => (
            <Table.Tr key={row.id}>
              <Table.Td>{i + 1}</Table.Td>
              <Table.Td>{row.name}</Table.Td>
              <Table.Td>{formatDate(row.created_at!)}</Table.Td>
              <Table.Td>{formatDate(row.updated_at!)}</Table.Td>
              <Table.Td>
                <Group gap={4}>
                  <ActionIcon
                    size="sm"
                    color="blue"
                    component={Link}
                    href={`/form/${row.id}`}
                  >
                    <IconEye size={14} />
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    color="blue"
                    component={Link}
                    href={`/designer/${row.id}`}
                  >
                    <IconPencil size={14} />
                  </ActionIcon>
                  <ActionIcon
                    size={"sm"}
                    color="red"
                    onClick={() => handleDelete(row.id)}
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};
interface FormProps<T extends FieldValues> {
  onSubmit: (value: T) => void;
}

export default FormManager;
