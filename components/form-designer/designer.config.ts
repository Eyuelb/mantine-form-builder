import { FieldValues } from "react-hook-form";
import { DataItem, TField } from "../form-builder/model";
type FormConfig = {
  id: string;
  position: number;
  name: TField<FieldValues>["name"];
  label: string;
  type: TField<FieldValues>["type"];
  icon: {};
  placeholder: string;
  description: string;
  disabled: boolean;
  validation: boolean;
  rules: {
    required: string;
    min: string;
    max: string;
    pattern: string;
  };
  data: DataItem[];
};

export const fieldConfigForm: TField<FormConfig>[] = [
  {
    type: "text",
    name: "label",
    label: "Label",
  },
  {
    type: "text",
    name: "placeholder",
    label: "Placeholder",
  },
  {
    type: "text",
    name: "description",
    label: "Description",
  },
  {
    type: "checkbox",
    name: "disabled",
    label: "Disabled",
  },
  {
    type: "checkbox",
    name: "validation",
    label: "Validation",
    defaultValue: false,
  },
  {
    type: "table",
    name: "data",
    label: "Options",
    group: [
      {
        type: "text",
        name: "label",
        label: "Label",
        rules: {
          required: true,
        },
      },
      {
        type: "text",
        name: "value",
        label: "Value",
      },
    ],
    showWhen: ({ watch }) => {
      const v = ["select", "multiselect", "radio",'segment'].includes(watch("type"));
      return v;
    },
  },
  {
    type: "panel",
    name: "rules",
    label: "Rules",
    defaultValue: undefined,
    group: [
      {
        type: "checkbox",
        name: "required",
        label: "Required",
      },
      {
        type: "number",
        name: "min",
        label: "min",
      },
      {
        type: "number",
        name: "max",
        label: "Max",
      },
      {
        type: "text",
        name: "pattern",
        label: "Pattern",
      },
    ],
    showWhen: ({ watch, unregister }) => {
      const v = watch("validation");
      if (!v && watch("rules"))
        unregister("rules", {
          keepDefaultValue: false,
          keepValue: false,
        });
      return v;
    },
    panelProps: {
      wrapper: {
        gap: "xs",
      },
    },
  },
];
