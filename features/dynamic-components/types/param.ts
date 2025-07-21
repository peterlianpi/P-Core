// Param types (path parameters)
export type EndpointParams = {
  courses: undefined; // No path param
  courseStatusLogs: { id: string } | undefined; // id param only on /:id routes
  lessonBooks: { id: string } | undefined;
  purchases: { id: string } | undefined;
  studentCourses: { id: string } | undefined;
};

// Query parameters types (for GET or query on POST)
export type EndpointQuery = {
  courses: { orgId: string };
  courseStatusLogs: { studentCourseId?: string };
  lessonBooks: { courseId: string };
  purchases: { studentId?: string; courseId?: string };
  studentCourses: { courseId?: string; studentId?: string };
};

// Request body (JSON) types for POST / PATCH
export type EndpointBody = {
  courses: undefined; // no POST/PATCH shown for courses
  courseStatusLogs: {
    studentCourseId: string;
    status: "ENROLLED" | "PAUSED" | "RESUMED" | "FINISHED" | "CANCELLED";
    note?: string;
  };
  lessonBooks: {
    title: string;
    author?: string;
    price: number;
    courseId: string;
  };
  purchases: {
    studentId: string;
    courseId?: string;
    type: "MONTHLY_FEE" | "LESSON_BOOK" | "OTHER";
    amount: number;
    description?: string;
    forMonth?: string;
    method: "CASH" | "BANK" | "ONLINE" | "TRANSFER";
    invoiceId?: string;
  };
  studentCourses: {
    studentId: string;
    courseId: string;
    status: "ENROLLED" | "PAUSED" | "RESUMED" | "FINISHED" | "CANCELLED";
  };
};

export type EndpointKey = keyof EndpointParams; // "courses" | "courseStatusLogs" | ...

export type ParamsOf<T extends EndpointKey> =
  EndpointParams[T] extends undefined ? unknown : EndpointParams[T];

export type QueryOf<T extends EndpointKey> = EndpointQuery[T] extends undefined
  ? unknown
  : EndpointQuery[T];

export type BodyOf<T extends EndpointKey> = EndpointBody[T] extends undefined
  ? unknown
  : EndpointBody[T];
