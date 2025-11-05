/**
 * Book Management API Hooks
 * React Query hooks for library book CRUD operations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Book,
  CreateBookRequest,
  UpdateBookRequest,
  BookFilters
} from '../types';

// Mock data for development
const mockBooks: Book[] = [
  {
    id: '1',
    isbn: '978-0-123456-78-9',
    title: 'Introduction to Computer Science',
    author: 'John Smith',
    description: 'A comprehensive guide to computer science fundamentals',
    publisher: 'Tech Books Inc.',
    publicationYear: 2023,
    genre: 'Technology',
    language: 'English',
    pages: 450,
    coverImageUrl: 'https://via.placeholder.com/200x300',
    totalCopies: 5,
    availableCopies: 3,
    status: 'AVAILABLE',
    location: 'Main Library',
    shelf: 'CS-001',
    tags: ['programming', 'computer science', 'education'],
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    isbn: '978-0-987654-32-1',
    title: 'World History: Ancient Civilizations',
    author: 'Sarah Johnson',
    description: 'An exploration of ancient civilizations and their impact on modern society',
    publisher: 'History Press',
    publicationYear: 2022,
    genre: 'History',
    language: 'English',
    pages: 380,
    coverImageUrl: 'https://via.placeholder.com/200x300',
    totalCopies: 3,
    availableCopies: 1,
    status: 'AVAILABLE',
    location: 'Main Library',
    shelf: 'HIS-002',
    tags: ['history', 'ancient', 'civilizations'],
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    isbn: '978-0-555666-77-8',
    title: 'Mathematics for Engineers',
    author: 'Dr. Michael Chen',
    description: 'Advanced mathematical concepts for engineering students',
    publisher: 'Engineering Books Ltd.',
    publicationYear: 2024,
    genre: 'Mathematics',
    language: 'English',
    pages: 520,
    coverImageUrl: 'https://via.placeholder.com/200x300',
    totalCopies: 4,
    availableCopies: 0,
    status: 'CHECKED_OUT',
    location: 'Science Section',
    shelf: 'MATH-003',
    tags: ['mathematics', 'engineering', 'advanced'],
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    isbn: '978-0-111222-33-4',
    title: 'Literature and Society',
    author: 'Prof. Emily Davis',
    description: 'How literature reflects and shapes societal values',
    publisher: 'Literary Press',
    publicationYear: 2021,
    genre: 'Literature',
    language: 'English',
    pages: 290,
    coverImageUrl: 'https://via.placeholder.com/200x300',
    totalCopies: 2,
    availableCopies: 2,
    status: 'AVAILABLE',
    location: 'Arts Section',
    shelf: 'LIT-001',
    tags: ['literature', 'society', 'cultural studies'],
    orgId: 'org1',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// API Functions
const fetchBooks = async (filters: BookFilters = {}): Promise<Book[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredBooks = [...mockBooks];

  // Apply filters
  if (filters.status) {
    filteredBooks = filteredBooks.filter(b => b.status === filters.status);
  }
  if (filters.genre) {
    filteredBooks = filteredBooks.filter(b => b.genre === filters.genre);
  }
  if (filters.author) {
    filteredBooks = filteredBooks.filter(b =>
      b.author.toLowerCase().includes(filters.author!.toLowerCase())
    );
  }
  if (filters.language) {
    filteredBooks = filteredBooks.filter(b => b.language === filters.language);
  }
  if (filters.available !== undefined) {
    filteredBooks = filteredBooks.filter(b =>
      filters.available ? b.availableCopies > 0 : b.availableCopies === 0
    );
  }
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredBooks = filteredBooks.filter(b =>
      b.title.toLowerCase().includes(searchLower) ||
      b.author.toLowerCase().includes(searchLower) ||
      b.isbn?.toLowerCase().includes(searchLower) ||
      b.genre?.toLowerCase().includes(searchLower) ||
      b.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  return filteredBooks;
};

const fetchBookById = async (id: string): Promise<Book | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockBooks.find(b => b.id === id) || null;
};

const createBook = async (data: CreateBookRequest): Promise<Book> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const newBook: Book = {
    id: Date.now().toString(),
    isbn: data.isbn,
    title: data.title,
    author: data.author,
    description: data.description,
    publisher: data.publisher,
    publicationYear: data.publicationYear,
    genre: data.genre,
    language: data.language,
    pages: data.pages,
    totalCopies: data.totalCopies,
    availableCopies: data.totalCopies, // All copies available initially
    status: 'AVAILABLE',
    location: data.location,
    shelf: data.shelf,
    tags: data.tags,
    orgId: 'org1', // In real app, get from context
    createdAt: new Date(),
    updatedAt: new Date()
  };

  mockBooks.push(newBook);
  return newBook;
};

const updateBook = async (id: string, data: UpdateBookRequest): Promise<Book> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockBooks.findIndex(b => b.id === id);
  if (index === -1) {
    throw new Error('Book not found');
  }

  const updatedBook = {
    ...mockBooks[index],
    ...data,
    updatedAt: new Date()
  };

  mockBooks[index] = updatedBook;
  return updatedBook;
};

const deleteBook = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockBooks.findIndex(b => b.id === id);
  if (index === -1) {
    throw new Error('Book not found');
  }

  mockBooks.splice(index, 1);
};

// React Query Hooks
export const useBooks = (filters: BookFilters = {}) => {
  return useQuery({
    queryKey: ['books', filters],
    queryFn: () => fetchBooks(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useBook = (id: string) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBookById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookRequest }) =>
      updateBook(id, data),
    onSuccess: (updatedBook) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.setQueryData(['book', updatedBook.id], updatedBook);
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

// Utility hooks
export const useBookStats = () => {
  return useQuery({
    queryKey: ['book-stats'],
    queryFn: async () => {
      const books = await fetchBooks();
      return {
        total: books.length,
        available: books.filter(b => b.status === 'AVAILABLE').length,
        checkedOut: books.filter(b => b.status === 'CHECKED_OUT').length,
        reserved: books.filter(b => b.status === 'RESERVED').length,
        lost: books.filter(b => b.status === 'LOST').length,
        damaged: books.filter(b => b.status === 'DAMAGED').length,
        totalCopies: books.reduce((sum, b) => sum + b.totalCopies, 0),
        availableCopies: books.reduce((sum, b) => sum + b.availableCopies, 0),
        lowStock: books.filter(b => b.availableCopies <= 1).length,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const usePopularBooks = (limit: number = 5) => {
  return useQuery({
    queryKey: ['popular-books', limit],
    queryFn: async () => {
      const books = await fetchBooks({ status: 'AVAILABLE' });
      // In real app, sort by checkout frequency
      return books.slice(0, limit);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useLowStockBooks = (threshold: number = 1) => {
  return useQuery({
    queryKey: ['low-stock-books', threshold],
    queryFn: async () => {
      const books = await fetchBooks();
      return books.filter(b => b.availableCopies <= threshold);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useBooksByGenre = (genre: string) => {
  return useQuery({
    queryKey: ['books-by-genre', genre],
    queryFn: () => fetchBooks({ genre }),
    enabled: !!genre,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBooksByAuthor = (author: string) => {
  return useQuery({
    queryKey: ['books-by-author', author],
    queryFn: () => fetchBooks({ author }),
    enabled: !!author,
    staleTime: 5 * 60 * 1000,
  });
};
