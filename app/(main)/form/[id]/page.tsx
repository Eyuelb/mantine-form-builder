"use client";
import FormBuilder from "@/components/form-builder/builder";
import usePersistForm from "@/hooks/usePersistForm";
import {
  Box,
  Button,
  Card,
  Center,
  Code,
  Container,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { modals } from "@mantine/modals";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { getById } = usePersistForm();

  const form = getById(params.id);

  if (!form) {
    return <LoadingOverlay visible />;
  }
  return (
    <Container className="w-full">
      <Card shadow="md" withBorder>
        <Card.Section withBorder p={10}>
          
          <Center>{form?.name}</Center>
        </Card.Section>
        <FormBuilder
          fields={form?.elements}
          onSubmit={(values) =>
            modals.open({
              children: <pre>{JSON.stringify(values, null, 2)}</pre>,
            })
          }
        >
          <Group justify="flex-end" mt={20}>
            <Button type="submit">Submit</Button>
          </Group>
        </FormBuilder>
      </Card>
    </Container>
  );
}
