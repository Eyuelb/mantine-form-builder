"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { TField } from "../form-builder/model";
import { FieldValues } from "react-hook-form";
import { useLocalStorage } from "@mantine/hooks";

export type DesignerContextType<T extends FieldValues> = {
  elements: TField<T>[];
  addElement: (index: number, element: TField<T>) => void;
  removeElement: (id: string) => void;
  selectedElement: TField<T> | null;
  setSelectedElement: Dispatch<SetStateAction<TField<T> | null>>;
  updateElement: (id: string, element: TField<T>) => void;
  setElements: Dispatch<SetStateAction<TField<T>[]>>;
};

export const DesignerContext = createContext<DesignerContextType<any> | null>(
  null
);

export default function DesignerContextProvider<T extends FieldValues>({
  children,
  initValue = [],
}: {
  children: ReactNode;
  initValue?: TField<T>[];
}) {
  const [elements, setElements] = useState<TField<T>[]>(initValue ?? []);
  const [selectedElement, setSelectedElement] = useState<TField<T> | null>(
    null
  );

  const addElement = useCallback((index: number, element: TField<T>) => {
    setElements((prev) => {
      const newElements = [...prev];
      const { icon, ...other } = element;
      newElements.splice(index, 0, other);

      return newElements;
    });
  }, []);

  const removeElement = useCallback((id: string) => {
    setElements((prev) => prev.filter((el) => String(el.id) !== id));
  }, []);

  const updateElement = useCallback((id: string, element: TField<T>) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => String(el.id) === id);
      newElements[index] = element;

      return newElements;
    });
  }, []);

  const memoElements = useMemo(() => elements, [elements]);
  const memoSelectedElement = useMemo(() => selectedElement, [selectedElement]);
  return (
    <DesignerContext.Provider
      value={{
        elements: memoElements,
        addElement,
        removeElement,
        selectedElement: memoSelectedElement,
        setSelectedElement,
        updateElement,
        setElements,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
