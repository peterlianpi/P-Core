/**
 * Library Management Types
 * Type definitions for library management domain
 */

export interface Book {
  id: string;
  isbn?: string;
  title: string;
  author: string;
  description?: string;
  publisher?: string;
  publicationYear?: number;
  genre?: string;
  language: string;
  pages?: number;
  coverImageUrl?: string;
  totalCopies: number;
  availableCopies: number;
  status: 'AVAILABLE' | 'CHECKED_OUT' | 'RESERVED' | 'LOST' | 'DAMAGED' | 'ARCHIVED';
  location?: string;
  shelf?: string;
  tags?: string[];
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookLoan {
  id: string;
  bookId: string;
  book: Book;
  memberId: string;
  member: {
    id: string;
    firstName: string;
    lastName: string;
    number: string;
  };
  checkoutDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'ACTIVE' | 'RETURNED' | 'OVERDUE' | 'LOST';
  fineAmount?: number;
  finePaid: boolean;
  notes?: string;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookReservation {
  id: string;
  bookId: string;
  book: Book;
  memberId: string;
  member: {
    id: string;
    firstName: string;
    lastName: string;
    number: string;
  };
  reservationDate: Date;
  expiryDate: Date;
  status: 'ACTIVE' | 'FULFILLED' | 'EXPIRED' | 'CANCELLED';
  queuePosition: number;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LibrarySection {
  id: string;
  name: string;
  description?: string;
  location?: string;
  capacity?: number;
  currentBooks: number;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LibraryStaff {
  id: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  role: 'LIBRARIAN' | 'ASSISTANT' | 'VOLUNTEER';
  permissions: string[];
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  hireDate: Date;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Request/Response Types
export interface CreateBookRequest {
  isbn?: string;
  title: string;
  author: string;
  description?: string;
  publisher?: string;
  publicationYear?: number;
  genre?: string;
  language: string;
  pages?: number;
  totalCopies: number;
  location?: string;
  shelf?: string;
  tags?: string[];
}

export interface UpdateBookRequest extends Partial<CreateBookRequest> {
  status?: 'AVAILABLE' | 'CHECKED_OUT' | 'RESERVED' | 'LOST' | 'DAMAGED' | 'ARCHIVED';
  availableCopies?: number;
}

export interface CheckoutBookRequest {
  bookId: string;
  memberId: string;
  dueDate: string;
  notes?: string;
}

export interface ReturnBookRequest {
  loanId: string;
  condition?: 'GOOD' | 'DAMAGED' | 'LOST';
  notes?: string;
}

export interface ReserveBookRequest {
  bookId: string;
  memberId: string;
  expiryHours?: number;
}

// Filter and Search Types
export interface BookFilters {
  status?: string;
  genre?: string;
  author?: string;
  language?: string;
  available?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface LoanFilters {
  status?: string;
  overdue?: boolean;
  memberId?: string;
  bookId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface ReservationFilters {
  status?: string;
  memberId?: string;
  bookId?: string;
  page?: number;
  limit?: number;
}

// Statistics Types
export interface LibraryStats {
  totalBooks: number;
  availableBooks: number;
  checkedOutBooks: number;
  overdueBooks: number;
  totalLoans: number;
  activeLoans: number;
  totalReservations: number;
  activeReservations: number;
  totalMembers: number;
  activeMembers: number;
  totalFines: number;
  collectedFines: number;
  popularGenres: Array<{
    genre: string;
    count: number;
  }>;
  monthlyLoans: Array<{
    month: string;
    loans: number;
    returns: number;
  }>;
}

// Dashboard Types
export interface LibraryDashboard {
  recentLoans: BookLoan[];
  overdueBooks: BookLoan[];
  popularBooks: Book[];
  upcomingDueDates: BookLoan[];
  lowStockBooks: Book[];
}

export interface MemberLibraryDashboard {
  currentLoans: BookLoan[];
  overdueLoans: BookLoan[];
  reservations: BookReservation[];
  loanHistory: BookLoan[];
  recommendedBooks: Book[];
}
