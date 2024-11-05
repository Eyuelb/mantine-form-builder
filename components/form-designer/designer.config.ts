import { FieldValues } from "react-hook-form";
import { DataItem, TField } from "../form-builder/model";
import { elementsConfig } from "./designer.utils";
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
  validationRules: TField<FormConfig>["validationRules"];
  data: DataItem[];
  visibility: boolean;
  visibleRules: TField<FormConfig>["visibleRules"];
  as: TField<FormConfig>[];
};
const validationConfig: TField<FormConfig>[] = [
  {
    type: "checkbox",
    name: "validation",
    label: "Validation",
    defaultValue: false,
  },
  {
    type: "panel",
    name: "validationRules",
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
      if (!v && watch("validationRules"))
        unregister("validationRules", {
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
const optionsConfig: TField<FormConfig>[] = [
  {
    type: "table",
    name: "data",
    label: "Options",
    group: [
      {
        type: "text",
        name: "label",
        label: "Label",
        validationRules: {
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
      const v = ["select", "multiselect", "radio", "segment"].includes(
        watch("type")
      );
      return v;
    },
  },
];
const asyncDataSourceConfig: TField<FormConfig>[] = [
  {
    type: "panel",
    name: "asyncDataSource",
    label: "Async Data Source",
    group: [
      {
        type: "text",
        name: "valueKey",
        label: "Value Key",
        defaultValue: "username",
      },
      {
        type: "text",
        name: "labelKey",
        label: "Label Key",
        defaultValue: "name",
      },
      {
        type: "text",
        name: "url",
        label: "URL",
        defaultValue: "https://jsonplaceholder.typicode.com/users",
      },
      {
        type: "text",
        name: "method",
        label: "Method",
        defaultValue: "GET",
      },
    ],
    showWhen: ({ watch }) => {
      const v = ["async-select"].includes(watch("type"));
      return v;
    },
    panelProps: {
      wrapper: {
        gap: "xs",
      },
    },
  },
];

const visibilityConfig = (fields: DataItem[]): TField<FormConfig>[] => [
  {
    type: "checkbox",
    name: "visibility",
    label: "Manage Visibility",
    defaultValue: false,
  },
  {
    type: "panel",
    name: "visibleRules",
    label: "Visible Rules",
    defaultValue: undefined,
    group: [
      {
        type: "select",
        name: "fieldName",
        label: "Field Name",
        data: fields,
        validationRules: {
          required: true,
        },
      },
      {
        type: "select",
        name: "comparison",
        label: "Comparison",
        data: [
          {
            value: "equals",
            label: "Equals",
          },
          {
            value: "notEquals",
            label: "Not Equals",
          },
          {
            value: "contains",
            label: "Contains",
          },
          {
            value: "notContains",
            label: "Not Contains",
          },
          {
            value: "startsWith",
            label: "Starts With",
          },
          {
            value: "endsWith",
            label: "Ends With",
          },
        ],
        validationRules: {
          required: true,
        },
      },
      {
        type: "text",
        name: "fieldValue",
        label: "Value",
      },
      {
        type: "checkbox",
        name: "caseSensitivity",
        label: "Case Sensitivity?",
        defaultValue: false,
      },
      {
        type: "radio",
        name: "whenVisibleRulesPass",
        label: "Select an action when rules pass.",
        validationRules: {
          required: true,
        },
        defaultValue: "showField",
        data: [
          {
            label: "Show field",
            value: "showField",
          },
          {
            label: "Hide field",
            value: "hideField",
          },
        ],
      },
    ],
    showWhen: ({ watch, unregister }) => {
      const v = watch("visibility");
      if (!v && watch("visibleRules"))
        unregister("visibleRules", {
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

const tableGroupConfig: TField<FormConfig>[] =  [
  {
    type: "table",
    name: "group",
    label: "Table Rows",
    group: [
      {
        type:'select',
        name:'type',
        label:'Field Type',
        data:elementsConfig.map((f)=>({
          label:f.label,
          value:f.type
        }))
      },
      {
        type: "text",
        name: "name",
        label: "Id",
        validationRules:{
          required: true
        }
      },
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
    ],
    showWhen: ({ watch }) => {
      const v = ["table"].includes(watch("type"));
      return v;
    },
    tableProps: {
      root: {
        w: 260,
      },
    },
  },
];
export const fieldConfigForm = (fields: DataItem[]): TField<FormConfig>[] => [
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
  ...optionsConfig,
  ...asyncDataSourceConfig,
  ...tableGroupConfig,
  ...validationConfig,
  ...visibilityConfig(fields),
];
