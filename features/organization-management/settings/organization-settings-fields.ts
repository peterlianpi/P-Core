// Field config for organization settings (reusable for DynamicForm)
export const organizationSettingsFields = [
  { name: "name", label: "Organization Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "logoImage", label: "Logo Image", type: "image" },
  { name: "type", label: "Organization Type", type: "select", options: [
    { value: "SCHOOL", label: "School" },
    { value: "TRAINING_CENTER", label: "Training Center" },
    { value: "CORPORATE", label: "Corporate" },
    { value: "CHURCH", label: "Church" },
    { value: "OTHER", label: "Other" },
  ] },
  { name: "startedAt", label: "Started At", type: "date" },
];
