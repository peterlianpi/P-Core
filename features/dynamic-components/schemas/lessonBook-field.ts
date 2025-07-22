import { useData } from "@/providers/data-provider";
import { FieldConfig } from "../types/field-config";
import { useGetCourses } from "@/features/school-management/features/courses/api/use-get-courses";

export const useLessonBookFields = () => {
  const { orgId } = useData();
  const { data: courses } = useGetCourses({ orgId });

  const lessonBookFields: FieldConfig[] = [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter lesson book title",
    },
    {
      name: "author",
      label: "Author",
      type: "text",
      placeholder: "Author's name (optional)",
    },
    {
      name: "price",
      label: "Price",
      type: "text",
      placeholder: "Enter price",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Brief description (optional)",
    },
    {
      name: "courseId",
      label: "Related Course",
      type: "select",
      options:
        courses?.map((c) => ({
          label: c.name,
          value: c.id,
        })) || [],
    },

    {
      name: "publicationDate",
      label: "Publication Date",
      type: "date",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["ACTIVE", "ARCHIVED"],
    },
  ];

  return lessonBookFields;
};
