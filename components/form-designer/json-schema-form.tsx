import React, { useState } from "react";
import { Stack, Textarea, Group, Button, Code } from "@mantine/core";
import { FieldValues } from "react-hook-form";
import { modals } from "@mantine/modals";

interface JsonSchemaFormProps<T extends FieldValues> {
  onSubmit: (value: T) => void;
}

const JsonSchemaForm = <T extends FieldValues>({ onSubmit }:JsonSchemaFormProps<T>) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    try {
      // Auto-correct the JSON string
      let correctedValue = value;
      // Add double quotes around keys
      correctedValue = correctedValue.replace(
        /(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
        '"$2":'
      );
      correctedValue = correctedValue.replace(/,(\s*[\]}])/g, "$1");
      const jsonValue = JSON.parse(correctedValue);
      onSubmit(jsonValue);
      setError(null); // Reset error state if JSON is valid
      modals.closeAll()
    } catch (e) {
      console.log(e);
      setError("Invalid JSON format");
    }
  };
  return (
    <Stack>
      <Textarea
        label="Json Schema"
        rows={4}
        value={value}
        error={error}
        onChange={(event) => setValue(event.target.value)}
      />
      <Group justify="flex-end">
        <Button disabled={!value} onClick={handleSubmit}>
          Add
        </Button>
      </Group>
    </Stack>
  );
};

export default JsonSchemaForm;
