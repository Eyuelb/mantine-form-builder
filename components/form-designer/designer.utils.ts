import {
  IconCheckbox,
  IconInputSearch,
  IconSelect,
  IconSwitch,
  IconTable,
} from "@tabler/icons-react";

import { TFieldType, TField } from "../form-builder/model";
export const elementsConfig: TField<any>[] = [
  {
    name: "Text Input",
    label: "Text Input",
    type: "text",
    icon: IconInputSearch,
  },
  {
    name: "Textarea",
    label: "Textarea",
    type: "textarea",
    icon: IconInputSearch,
  },
  {
    name: "Rich Text",
    label: "Rich Text",
    type: "richtext",
    icon: IconInputSearch,
  },
  { name: "Number", label: "Number", type: "number", icon: IconInputSearch },
  {
    name: "DateTime",
    label: "DateTime",
    type: "datetime",
    icon: IconInputSearch,
  },
  { name: "Select", label: "Select", type: "select", icon: IconSelect },
  {
    name: "Multi-Select",
    label: "Multi-Select",
    type: "multiselect",
    icon: IconSelect,
  },
  { name: "File", label: "File", type: "file", icon: IconInputSearch },
  { name: "Radio", label: "Radio", type: "radio", icon: IconInputSearch },
  { name: "Checkbox", label: "Checkbox", type: "checkbox", icon: IconCheckbox },
  { name: "Label", label: "Label", type: "label", icon: IconInputSearch },
  { name: "Panel", label: "Panel", type: "panel", icon: IconInputSearch },
  { name: "Table", label: "Table", type: "table", icon: IconTable },
  { name: "Switch", label: "Switch", type: "switch", icon: IconSwitch },
  { name: "Segment", label: "Segment", type: "segment", icon: IconSwitch },
  {
    name: "Async Select",
    label: "Async Select",
    type: "async-select",
    icon: IconSelect,
  },
];
export const getElConfigByType = (type: TFieldType) => elementsConfig.find((f) => f.type === type);
