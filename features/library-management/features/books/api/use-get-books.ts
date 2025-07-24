// Enhanced Library Books Fetching Hook
// Book management with loan tracking and inventory management
// Integrates with RLS-based security for automatic tenant isolation

import { useQuery } from "@tanstack/react-query";
import { client, apiUtils } from "@/lib/api/hono-client";
import type { InferResponseType } from "hono";

// Type inference for better TypeScript support
type BooksResponse = InferResponseType<typeof client.api.books["$get"]>;

export interface UseGetBooksParams {
  orgId: string;
  libraryId?: string;
  take?: number;
  skip?: number;
  searchQuery?: string;
  category?: string;
  author?: string;
  isActive?: boolean;
  availableOnly?: boolean;
  includeLoans?: boolean;
  sortBy?: 'title' | 'author' | 'category' | 'publishYear' | 'available';
  sortOrder?: 'asc' | 'desc';
  enabled?: boolean;
}

/**
 * Hook to fetch library books with organization context
 * Features:
 * - Automatic tenant isolation via RLS
 * - Enhanced filtering by category, author, availability
 * - Loan tracking and availability management
 * - Inventory statistics
 * - Enhanced error handling with specific error types
 * - Pagination and sorting support
 * - Type-safe response handling
 * - Optimized caching strategy
 */
export const useGetBooks = ({
  orgId,
  libraryId,
  take = 20,
  skip = 0,
  searchQuery,
  category,
  author,
  isActive = true,
  availableOnly = false,
  includeLoans = false,
  sortBy = 'title',
  sortOrder = 'asc',
  enabled = true,
}: UseGetBooksParams) => {
  const query = useQuery({
    // Enable query only if orgId is provided and enabled is true
    enabled: enabled && !!orgId,
    
    // Structured query key for better cache management
    queryKey: [
      "books", 
      { 
        orgId,
        libraryId,
        take, 
        skip, 
        searchQuery, 
        category,
        author,
        isActive,
        availableOnly,
        includeLoans,
        sortBy,
        sortOrder
      }
    ] as const,
    
    // Enhanced query function with comprehensive error handling
    queryFn: async (): Promise<BooksResponse> => {
      // Validation
      if (!orgId) {
        throw new Error("Organization ID is required");
      }

      try {
        // Build query parameters
        const queryParams: Record<string, string> = {
          take: take.toString(),
          skip: skip.toString(),
          isActive: isActive.toString(),
          availableOnly: availableOnly.toString(),
          includeLoans: includeLoans.toString(),
          sortBy,
          sortOrder,
        };

        // Add optional filters
        if (libraryId) queryParams.libraryId = libraryId;
        if (searchQuery) queryParams.searchQuery = searchQuery;
        if (category) queryParams.category = category;
        if (author) queryParams.author = author;

        // API request with RLS-enabled security context
        const response = await client.api.books.$get({
          query: apiUtils.createOrgQuery(orgId, queryParams),
        });

        // The client now handles error responses automatically
        return await response.json();

      } catch (error) {
        // Enhanced error handling with specific error types
        if (apiUtils.isAPIError(error)) {
          const errorCode = apiUtils.getErrorCode(error);
          
          switch (errorCode) {
            case 'ACCESS_DENIED':
              throw new Error('You do not have access to view library books');
            case 'INVALID_ORGANIZATION':
              throw new Error('Invalid organization context');
            case 'INVALID_LIBRARY':
              throw new Error('The specified library does not exist or is not accessible');
            case 'INVALID_PAGINATION':
              throw new Error('Invalid pagination parameters');
            case 'INVALID_SORT':
              throw new Error('Invalid sort parameters');
            case 'LIBRARY_NOT_ENABLED':
              throw new Error('Library system is not enabled for this organization');
            default:
              throw new Error(apiUtils.getErrorMessage(error));
          }
        }
        
        // Handle network errors
        if (apiUtils.isNetworkError(error)) {
          throw new Error('Network connection failed. Please check your internet connection.');
        }
        
        // Re-throw other errors
        throw error;
      }
    },
    
    // Cache configuration for optimal performance
    staleTime: 10 * 60 * 1000, // 10 minutes (book data changes less frequently)
    gcTime: 30 * 60 * 1000,    // 30 minutes (formerly cacheTime)
    
    // Retry configuration for resilience
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx)
      if (apiUtils.isAPIError(error) && error.apiError.statusCode < 500) {
        return false;
      }
      
      // Retry up to 3 times for server errors
      return failureCount < 3;
    },
    
    // Retry delay with exponential backoff
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    
    // Keep previous data when refetching (for better UX during pagination)
    placeholderData: (previousData) => previousData,
  });

  // Return enhanced query result with additional utilities
  return {
    ...query,
    
    // Convenience properties for common use cases
    books: query.data?.data || [],
    totalBooks: query.data?.totalItems || 0,
    activeBooks: query.data?.active || 0,
    inactiveBooks: query.data?.inactive || 0,
    availableBooks: query.data?.available || 0,
    loanedBooks: query.data?.loaned || 0,
    overdueBooks: query.data?.overdue || 0,
    
    // Category statistics
    categoryStats: query.data?.categoryStats || {},
    authorStats: query.data?.authorStats || {},
    
    // Inventory statistics
    inventoryStats: query.data?.inventoryStats || {
      totalCopies: 0,
      availableCopies: 0,
      loanedCopies: 0,
      overdueCopies: 0,
      lostCopies: 0,
    },
    
    // Popular books
    popularBooks: query.data?.popularBooks || [],
    recentlyAdded: query.data?.recentlyAdded || [],
    
    // Pagination utilities
    hasNextPage: skip + take < (query.data?.totalItems || 0),
    hasPreviousPage: skip > 0,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil((query.data?.totalItems || 0) / take),
    
    // Filter utilities
    hasActiveFilter: isActive !== undefined,
    hasSearchFilter: !!searchQuery,
    hasCategoryFilter: !!category,
    hasAuthorFilter: !!author,
    hasLibraryFilter: !!libraryId,
    hasAvailabilityFilter: availableOnly,
    
    // Sorting utilities
    currentSort: { field: sortBy, order: sortOrder },
    isAscending: sortOrder === 'asc',
    isDescending: sortOrder === 'desc',
    
    // Error utilities
    errorMessage: query.error ? apiUtils.getErrorMessage(query.error) : undefined,
    errorCode: query.error ? apiUtils.getErrorCode(query.error) : undefined,
    isAccessDenied: apiUtils.isErrorCode(query.error, 'ACCESS_DENIED'),
    isInvalidLibrary: apiUtils.isErrorCode(query.error, 'INVALID_LIBRARY'),
    isInvalidPagination: apiUtils.isErrorCode(query.error, 'INVALID_PAGINATION'),
    isInvalidSort: apiUtils.isErrorCode(query.error, 'INVALID_SORT'),
    isLibraryNotEnabled: apiUtils.isErrorCode(query.error, 'LIBRARY_NOT_ENABLED'),
  };
};

// Additional specialized hooks for common use cases

/**
 * Hook to get available books only
 */
export const useGetAvailableBooks = (orgId: string, libraryId?: string) => {
  return useGetBooks({ 
    orgId, 
    libraryId,
    availableOnly: true,
    isActive: true,
    take: 50,
  });
};

/**
 * Hook to get books by category
 */
export const useGetBooksByCategory = (orgId: string, category: string, libraryId?: string) => {
  return useGetBooks({ 
    orgId, 
    libraryId,
    category,
    enabled: !!category,
    take: 30,
  });
};

/**
 * Hook to get books by author
 */
export const useGetBooksByAuthor = (orgId: string, author: string, libraryId?: string) => {
  return useGetBooks({ 
    orgId, 
    libraryId,
    author,
    enabled: !!author,
    take: 30,
  });
};

/**
 * Hook to search books
 */
export const useSearchBooks = (orgId: string, searchQuery: string, libraryId?: string) => {
  return useGetBooks({ 
    orgId, 
    libraryId,
    searchQuery,
    enabled: !!searchQuery && searchQuery.length >= 2, // Only search if query is at least 2 characters
    take: 20,
  });
};

/**
 * Hook to get overdue books
 */
export const useGetOverdueBooks = (orgId: string, libraryId?: string) => {
  return useGetBooks({ 
    orgId, 
    libraryId,
    availableOnly: false,
    includeLoans: true,
    sortBy: 'title',
    take: 100, // Get more overdue books for reporting
  });
};

/**
 * Hook to get recently added books
 */
export const useGetRecentBooks = (orgId: string, libraryId?: string, days: number = 30) => {
  return useGetBooks({ 
    orgId, 
    libraryId,
    sortBy: 'title', // Will be overridden by backend to sort by creation date
    sortOrder: 'desc',
    take: 20,
  });
};

/**
 * Hook to get library statistics
 */
export const useGetLibraryStats = (orgId: string, libraryId?: string) => {
  return useGetBooks({ 
    orgId, 
    libraryId,
    take: 1, // We only need the stats, not the actual books
    includeLoans: true,
  });
};
