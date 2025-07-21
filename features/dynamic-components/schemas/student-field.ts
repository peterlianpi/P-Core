import { useGetCourses } from "@/features/music-school-management/features/courses/api/use-get-courses";
import { FieldConfig } from "../types/field-config";
import { useData } from "@/providers/data-provider";

export const useStudentFields = () => {
  const { orgId } = useData();
  const { data: courses } = useGetCourses({ orgId });
  const studentFields: FieldConfig[] = [
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
    { name: "isActive", label: "Active", type: "switch" },
    { name: "isArchived", label: "Archived", type: "switch" },
    { name: "isDeleted", label: "Deleted", type: "switch" },
    { name: "isProspect", label: "Prospect", type: "switch" },
    {
      name: "courseIds",
      label: "Select Courses",
      type: "checkbox-group",
      options:
        courses?.map((c) => ({
          label: c.name,
          value: c.id,
        })) || [],
    },
    { name: "address", label: "Address", type: "textarea" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "rollNumber", label: "Roll Number", type: "text" },
    { name: "parentName", label: "Parent Name", type: "text" },
    { name: "parentPhone", label: "Parent Phone", type: "text" },
    { name: "notes", label: "Notes", type: "textarea" },
    { name: "joinedAt", label: "Joined Date", type: "date" },
  ];
  return studentFields;
};
