import { FieldConfig } from "../types/field-config";

export const studentFields: FieldConfig[] = [
  { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
  },
  { name: "birthDate", label: "Date of Birth", type: "date" },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["MALE", "FEMALE", "OTHER"],
  },
  { name: "isActive", label: "Active", type: "checkbox" },
  { name: "isArchived", label: "Archived", type: "checkbox" },
  { name: "isDeleted", label: "Deleted", type: "checkbox" },
  { name: "isProspect", label: "Prospect", type: "checkbox" },
  {
    name: "courseIds",
    label: "Select Courses",
    type: "checkbox-group",
    options: ["Piano", "Guitar", "Drums"],
  },
  { name: "address", label: "Address", type: "textarea" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "rollNumber", label: "Roll Number", type: "text" },
  { name: "parentName", label: "Parent Name", type: "text" },
  { name: "parentPhone", label: "Parent Phone", type: "text" },
  { name: "notes", label: "Notes", type: "textarea" },
  { name: "joinedAt", label: "Joined Date", type: "date" },
];
