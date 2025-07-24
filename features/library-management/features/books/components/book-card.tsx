// Enhanced Book Card Component
// Displays library book information with loan status and availability
// Integrates with the new unified architecture

'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Book, 
  Users, 
  Calendar,
  MoreHorizontal,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  User,
  Building
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author?: string | null;
    isbn?: string | null;
    publisher?: string | null;
    publishYear?: number | null;
    category?: string | null;
    description?: string | null;
    copies: number;
    available: number;
    price?: number | null;
    isActive: boolean;
    createdAt: string;
    library: {
      id: string;
      name: string;
    };
    loans?: Array<{
      id: string;
      loanDate: string;
      dueDate: string;
      status: string;
      student: {
        id: string;
        name: string;
        phone?: string | null;
        email?: string | null;
      };
    }>;
  };
  onEdit?: (book: any) => void;
  onDelete?: (bookId: string) => void;
  onViewDetails?: (bookId: string) => void;
  onLoan?: (bookId: string) => void;
  onReturn?: (loanId: string) => void;
  className?: string;
}

export function BookCard({ 
  book, 
  onEdit, 
  onDelete, 
  onViewDetails,
  onLoan,
  onReturn,
  className 
}: BookCardProps) {
  const activeLoans = book.loans?.filter(loan => loan.status === "ACTIVE") || [];
  const isAvailable = book.available > 0;
  const utilizationRate = book.copies > 0 ? ((book.copies - book.available) / book.copies) * 100 : 0;
  
  // Check for overdue loans
  const overdueLoans = activeLoans.filter(loan => new Date(loan.dueDate) < new Date());
  const hasOverdue = overdueLoans.length > 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getAvailabilityStatus = () => {
    if (!book.isActive) return { text: "Inactive", color: "text-muted-foreground", icon: XCircle };
    if (book.available === 0) return { text: "Not Available", color: "text-red-600", icon: XCircle };
    if (book.available === book.copies) return { text: "Available", color: "text-green-600", icon: CheckCircle };
    return { text: `${book.available} Available`, color: "text-yellow-600", icon: AlertTriangle };
  };

  const status = getAvailabilityStatus();
  const StatusIcon = status.icon;

  return (
    <Card className={cn(
      "group hover:shadow-md transition-all duration-200",
      !book.isActive && "opacity-60 bg-muted/30",
      hasOverdue && "border-red-200 bg-red-50/30",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Book className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg leading-tight line-clamp-2">
                {book.title}
              </CardTitle>
            </div>
            
            {book.author && (
              <p className="text-sm text-muted-foreground font-medium mb-1">
                by {book.author}
              </p>
            )}

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              {book.publishYear && <span>{book.publishYear}</span>}
              {book.publisher && (
                <>
                  {book.publishYear && <span>•</span>}
                  <span>{book.publisher}</span>
                </>
              )}
            </div>

            {book.category && (
              <Badge variant="outline" className="text-xs w-fit mb-2">
                {book.category}
              </Badge>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails?.(book.id)}>
                View Details
              </DropdownMenuItem>
              {isAvailable && (
                <DropdownMenuItem onClick={() => onLoan?.(book.id)}>
                  Loan Book
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit?.(book)}>
                Edit Book
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(book.id)}
                className="text-destructive"
              >
                Delete Book
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Availability Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusIcon className={cn("h-4 w-4", status.color)} />
            <span className={cn("text-sm font-medium", status.color)}>
              {status.text}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {book.copies} {book.copies === 1 ? 'copy' : 'copies'}
          </div>
        </div>

        {/* Utilization Progress */}
        {book.copies > 1 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Utilization</span>
              <span className="font-medium">
                {book.copies - book.available}/{book.copies}
              </span>
            </div>
            <Progress 
              value={utilizationRate} 
              className={cn(
                "h-2",
                utilizationRate === 100 && "bg-red-100",
                utilizationRate > 80 && utilizationRate < 100 && "bg-yellow-100"
              )}
            />
          </div>
        )}

        {/* Library Information */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building className="h-4 w-4" />
          <span>{book.library.name}</span>
        </div>

        {/* ISBN */}
        {book.isbn && (
          <div className="text-xs text-muted-foreground">
            ISBN: {book.isbn}
          </div>
        )}

        {/* Price */}
        {book.price && (
          <div className="text-sm font-medium">
            ${book.price.toFixed(2)}
          </div>
        )}

        {/* Active Loans */}
        {activeLoans.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Loans</span>
              {hasOverdue && (
                <Badge variant="destructive" className="text-xs">
                  {overdueLoans.length} Overdue
                </Badge>
              )}
            </div>
            
            <div className="space-y-2 max-h-24 overflow-y-auto">
              {activeLoans.map((loan) => {
                const isOverdue = new Date(loan.dueDate) < new Date();
                return (
                  <div 
                    key={loan.id} 
                    className={cn(
                      "flex items-center justify-between p-2 rounded-md text-xs",
                      isOverdue ? "bg-red-50 border border-red-200" : "bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <User className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-medium truncate">
                          {loan.student.name}
                        </div>
                        <div className={cn(
                          "flex items-center gap-1",
                          isOverdue ? "text-red-600" : "text-muted-foreground"
                        )}>
                          <Clock className="h-3 w-3" />
                          <span>Due {formatDate(loan.dueDate)}</span>
                          {isOverdue && <AlertTriangle className="h-3 w-3 text-red-500" />}
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant={isOverdue ? "destructive" : "outline"}
                      size="sm"
                      className="text-xs h-6 px-2"
                      onClick={() => onReturn?.(loan.id)}
                    >
                      Return
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Description */}
        {book.description && (
          <div className="text-sm text-muted-foreground line-clamp-2">
            {book.description}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails?.(book.id)}
          >
            Details
          </Button>
          {isAvailable ? (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onLoan?.(book.id)}
            >
              Loan Book
            </Button>
          ) : (
            <Button 
              variant="secondary" 
              size="sm" 
              className="flex-1"
              disabled
            >
              Not Available
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Book list component for displaying multiple cards
interface BookListProps {
  books: Array<any>;
  onEdit?: (book: any) => void;
  onDelete?: (bookId: string) => void;
  onViewDetails?: (bookId: string) => void;
  onLoan?: (bookId: string) => void;
  onReturn?: (loanId: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function BookList({ 
  books, 
  onEdit, 
  onDelete, 
  onViewDetails,
  onLoan,
  onReturn,
  isLoading = false,
  className 
}: BookListProps) {
  if (isLoading) {
    return (
      <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="space-y-2">
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded" />
                <div className="h-2 bg-muted rounded" />
                <div className="h-8 bg-muted rounded" />
                <div className="flex gap-2">
                  <div className="h-8 bg-muted rounded flex-1" />
                  <div className="h-8 bg-muted rounded flex-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <Book className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No books found</h3>
        <p className="text-muted-foreground">
          No books match your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewDetails={onViewDetails}
          onLoan={onLoan}
          onReturn={onReturn}
        />
      ))}
    </div>
  );
}
