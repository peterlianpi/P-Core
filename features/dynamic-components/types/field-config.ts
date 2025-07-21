// types/field-config.ts
export type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "number"
  | "date"
  | "select"
  | "checkbox"
  | "checkbox-group";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[]; // for select/checkbox-group
  multiple?: boolean; // for multiselect if needed
}
