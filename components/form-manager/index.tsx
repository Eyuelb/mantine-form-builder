"use client";
import usePersistForm from "@/hooks/usePersistForm";
import { ActionIcon, Button, Group, Table } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import React from "react";
import { TField } from "../form-builder/model";
import { IconEye, IconForms, IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
type TPersistForm = {
  id: string;
  name: string;
  elements: TField<any>[];
};
const FormManager = () => {
  const { getAll, getById, create, update, remove } = usePersistForm();

  // Example usage
  const handleCreate = () => {
    create({
      id: randomId(),
      name: "new-name",
      elements: [],
    });
  };

  const handleUpdate = (d: TPersistForm) => {
    update(d);
  };

  const handleDelete = (id: string) => {
    remove(id);
  };

  const allFields = getAll();
  //   const singleField = getById("existing-id");

  return (
    <div className="w-full">
      <Table striped captionSide="top">
        <Table.Caption>
          <Button onClick={handleCreate}>Create Field</Button>
        </Table.Caption>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {allFields.map((row) => (
            <Table.Tr key={row.id}>
              <Table.Td>{row.id}</Table.Td>
              <Table.Td>{row.name}</Table.Td>
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

export default FormManager;
