import { FieldConfig } from "../types/field-config";

export const useCourseFields = () => {
  const courseFields: FieldConfig[] = [
    {
      name: "name",
      label: "Course Name",
      type: "text",
      placeholder: "Enter course name",
    },
    {
      name: "level",
      label: "Level",
      type: "select",
      options: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter course description",
    },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" },
    {
      name: "duration",
      label: "Duration (weeks)",
      type: "number",
      placeholder: "Enter duration in weeks",
    },
    {
      name: "price",
      label: "Price ($)",
      type: "number",
      placeholder: "Enter course price",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["ACTIVE", "ARCHIVED"],
    },
  ];
  return courseFields;
};
