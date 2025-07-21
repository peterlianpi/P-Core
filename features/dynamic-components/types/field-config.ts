// types/field-config.ts
export type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "number"
  | "date"
  | "select"
  | "checkbox"
  | "checkbox-group"
  | "switch";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[] | { label: string; value: string }[];
  multiple?: boolean; // for multiselect if needed
}
