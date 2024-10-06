import { TField } from "@/components/form-builder/model";
import showNotification from "@/utils/notification";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useCallback } from "react";

type TPersistForm = {
  id: string;
  name: string;
  elements: TField<any>[];
};

const usePersistForm = () => {
  const [value, setValue, removeValue] = useLocalStorage<TPersistForm[]>({
    key: "form-config",
    defaultValue: [],
  });

  const getAll = useCallback((): TPersistForm[] => {
    return value;
  }, [value]);

  const getById = useCallback(
    (id: string): TPersistForm | undefined => {
      return value.find((field) => field.id === id);
    },
    [value]
  );

  const create = useCallback(
    (field: TPersistForm) => {
      setValue([...value, field]);
      showNotification({
        message:"Form Created Successfully"
      })
    },
    [value, setValue]
  );

  const update = useCallback(
    (updatedField: Partial<TPersistForm>) => {
      setValue(
        value.map((field) =>
          field.id === updatedField.id
            ? {
                ...field,
                ...updatedField,
              }
            : field
        )
      );
      showNotification({
        message:"Form Updated Successfully"
      })
    },
    [value, setValue]
  );

  const remove = useCallback(
    (id: string) => {
      setValue(value.filter((field) => field.id !== id));
      showNotification({
        message:"Form Deleted Successfully"
      })
    },
    [value, setValue]
  );
  const clear = useCallback(() => {
    removeValue();
    showNotification({
        message:"Form Cleared Successfully"
      })
  }, [removeValue]);
  return { getAll, getById, create, update, remove, clear };
};

export default usePersistForm;
