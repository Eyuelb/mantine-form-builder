import React, { forwardRef, useState } from "react";
import {
  Table,
  Button,
  Group,
  ActionIcon,
  Stack,
  InputLabel,
  TextInputProps,
  InputDescription,
  InputError,
  InputWrapper,
  Modal,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import {
  ArrayPath,
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { TField } from "../model";
import RenderElements from "../render/render-elements";
interface TableFieldProps<T extends FieldValues> extends TextInputProps {
  field: TField<T>;
  methods: UseFormReturn<T>;
}
interface WithForwardRefType<T extends FieldValues>
  extends React.FC<TableFieldProps<T>> {
  <T extends FieldValues>(props: TableFieldProps<T>): ReturnType<
    React.FC<TableFieldProps<T>>
  >;
}

export const TableField: WithForwardRefType<FieldValues> = forwardRef<
  HTMLInputElement,
  TableFieldProps<FieldValues>
>(
  (
    {
      field: { name, group },
      label,
      error,
      description,
      methods,
      withAsterisk,
      inputWrapperOrder,
    },
    ref
  ) => {
    const { fields, append, remove, update } = useFieldArray<FieldValues>({
      control: methods.control,
      name: name as ArrayPath<FieldValues>,
      shouldUnregister:true,
      
    });
    const content = inputWrapperOrder!.map((part, key) => {
      switch (part) {
        case "label":
          return (
            <InputLabel required={withAsterisk} key="label">
              {label}
            </InputLabel>
          );
        case "input":
          return (
            <Stack
              key="input"
              className="border rounded-md p-3 py-2 "
              style={{
                borderColor: error ? "var(--mantine-color-error)" : "",
              }}
              gap="xs"
            >
              <Group justify="apart" className="w-full justify-between">
                <span />
                <Button
                  leftSection={<IconPlus size={16} stroke={2} />}
                  onClick={() =>
                    //   setModal(true)
                    modals.open({
                      title: "Add Item",
                      id: `${name as string}-mod-display`,
                      modalId: `${name as string}-mod-display`,
                      children: (
                        <Display
                          callback={(value) => append(value as any)}
                          group={group}
                          id={`${name as string}-mod-display`}
                          methods={methods}
                        />
                      ),
                    })
                  }
                  size="compact-xs"
                >
                  Add
                </Button>
              </Group>
              <Table.ScrollContainer minWidth={260} >
                <Table striped highlightOnHover withTableBorder withRowBorders withColumnBorders className=" rounded-md">
                  <Table.Thead>
                    <Table.Tr >
                      {group?.map((field, i) => (
                        <Table.Th fz={12} key={i}>{field.label}</Table.Th>
                      ))}
                      <Table.Th fz={12}>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {fields.map((value: any, index) => (
                      <Table.Tr key={index}>
                        {group?.map((field, i) => (
                          <Table.Td fz={12} key={i}>
                            {String(value[field.name])}
                          </Table.Td>
                        ))}
                        <Table.Td>
                          <Group gap="xs">
                            <ActionIcon
                              onClick={() =>
                                modals.open({
                                  title: "Edit Item",
                                  id: `${name as string}-mod-display-edit`,
                                  modalId: `${name as string}-mod-display-edit`,
                                  children: (
                                    <Display
                                      methods={methods}
                                      callback={(value) =>
                                        update(index, value as any)
                                      }
                                      value={value}
                                      group={group}
                                      id={`${name as string}-mod-display-edit`}
                                    />
                                  ),
                                })
                              }
                              variant="outline"
                              size="sm"
                            >
                              <IconEdit size={14} stroke={1.4} />
                            </ActionIcon>
                            <ActionIcon
                              color="red"
                              onClick={() => remove(index)}
                              size="sm"
                              variant="outline"
                            >
                              <IconTrash size={14} stroke={1.4} />
                            </ActionIcon>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </Stack>
          );
        case "description":
          return (
            <InputDescription key="description">{description}</InputDescription>
          );
        case "error":
          return (
            <InputError ta={"left"} key="error">
              {error}
            </InputError>
          );
        default:
          return null;
      }
    });

    return (
      <InputWrapper>
        <button ref={ref as any} />
        {content}
      </InputWrapper>
    );
  }
);
TableField.displayName = 'TableField'
const Display = <T extends FieldValues>({
  value,
  group,
  callback,
  id,
}: {
  value?: any;
  group?: TField<T>[];
  callback: (value: T) => void;
  id?: string;
  methods: UseFormReturn<T>;
}) => {
  const methods = useForm<T>({
    defaultValues: value,
  });

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={methods.handleSubmit((value) => {
          callback(value);
          id && modals.close(id);
        })}
      >
        <Stack>
          {group?.map((field, i) => (
            <RenderElements
              key={`${field.name as string}-${i}`}
              element={field}
              methods={methods}
            />
          ))}
          <Button mt="md" type="submit">
            save
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};
