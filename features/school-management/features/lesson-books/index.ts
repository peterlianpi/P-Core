// Lesson Books Feature - School Management
// Export lesson book components and functionality

export * from "./components/lesson-books-dashboard";
export * from "./components/lesson-book-form";
export * from "./api/use-lesson-books";

// Feature configuration
export const LessonBooksFeature = {
  name: 'lesson-books',
  enabled: true,
  version: '1.0.0',
  routes: [
    { path: '/school-management/lesson-books', name: 'Lesson Books' },
    { path: '/school-management/lesson-books/new', name: 'Add Lesson Book' },
  ],
  permissions: ['VIEW_LESSON_BOOKS', 'MANAGE_LESSON_BOOKS'],
};
