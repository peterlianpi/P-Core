/**
 * Library Management API Exports
 * Centralized exports for all library management API hooks
 */

// Book API hooks
export {
  useBooks,
  useBook,
  useCreateBook,
  useUpdateBook,
  useDeleteBook,
  useBookStats,
  usePopularBooks,
  useLowStockBooks,
  useBooksByGenre,
  useBooksByAuthor,
} from './books';

// Re-export types for convenience
export type {
  Book,
  BookLoan,
  BookReservation,
  LibrarySection,
  LibraryStaff,
  CreateBookRequest,
  UpdateBookRequest,
  CheckoutBookRequest,
  ReturnBookRequest,
  ReserveBookRequest,
  BookFilters,
  LoanFilters,
  ReservationFilters,
  LibraryStats,
  LibraryDashboard,
  MemberLibraryDashboard,
} from '../types';
