// lib/api-endpoints.ts
import { client } from "@/lib/hono";

export const endpointMap = {
  upload: client.api.upload,
  uploadImage: client.api["upload-image"],
  org: client.api.org,
  versionInfo: client.api.versionInfo,
  feedback: client.api.feedback,
  invite: client.api.invite,
  students: client.api.students,
  studentCourses: client.api.studentCourses,
  courses: client.api.courses,
  lessonBooks: client.api.lessonBooks,
  purchases: client.api.purchases,
  courseStatusLogs: client.api.courseStatusLogs,
} as const;

export type EndpointKey = keyof typeof endpointMap;
