"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  FileText, 
  Users, 
  BookOpen, 
  Calendar,
  DollarSign,
  AlertCircle,
  Inbox,
  Database,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary";
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary";
  };
  className?: string;
  type?: 
    | "no-data" 
    | "no-results" 
    | "no-access" 
    | "error" 
    | "empty-collection"
    | "filtered-empty";
}

const iconMap = {
  "no-data": <Database className="w-12 h-12 text-muted-foreground" />,
  "no-results": <Search className="w-12 h-12 text-muted-foreground" />,
  "no-access": <AlertCircle className="w-12 h-12 text-yellow-500" />,
  "error": <AlertCircle className="w-12 h-12 text-red-500" />,
  "empty-collection": <Inbox className="w-12 h-12 text-muted-foreground" />,
  "filtered-empty": <Filter className="w-12 h-12 text-muted-foreground" />,
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  type = "no-data",
}) => {
  const defaultIcon = icon || iconMap[type];

  return (
    <Card className={cn("border-dashed", className)}>
      <CardContent className="flex flex-col items-center justify-center text-center py-12 px-6">
        <div className="mb-4">{defaultIcon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
        
        {(action || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-3">
            {action && (
              <Button
                onClick={action.onClick}
                variant={action.variant || "default"}
              >
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                onClick={secondaryAction.onClick}
                variant={secondaryAction.variant || "outline"}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Specific empty state components for common use cases

export const NoStudentsEmpty: React.FC<{
  onAddStudent?: () => void;
  className?: string;
}> = ({ onAddStudent, className }) => (
  <EmptyState
    icon={<Users className="w-12 h-12 text-muted-foreground" />}
    title="No Students Found"
    description="Get started by adding your first student to the system."
    action={onAddStudent ? {
      label: "Add Student",
      onClick: onAddStudent,
    } : undefined}
    className={className}
    type="empty-collection"
  />
);

export const NoCoursesEmpty: React.FC<{
  onAddCourse?: () => void;
  className?: string;
}> = ({ onAddCourse, className }) => (
  <EmptyState
    icon={<BookOpen className="w-12 h-12 text-muted-foreground" />}
    title="No Courses Available"
    description="Create your first course to start managing educational content."
    action={onAddCourse ? {
      label: "Create Course",
      onClick: onAddCourse,
    } : undefined}
    className={className}
    type="empty-collection"
  />
);

export const NoTeachersEmpty: React.FC<{
  onAddTeacher?: () => void;
  className?: string;
}> = ({ onAddTeacher, className }) => (
  <EmptyState
    icon={<Users className="w-12 h-12 text-muted-foreground" />}
    title="No Teachers Found"
    description="Add teachers to your faculty to manage courses and students."
    action={onAddTeacher ? {
      label: "Add Teacher",
      onClick: onAddTeacher,
    } : undefined}
    className={className}
    type="empty-collection"
  />
);

export const NoTransactionsEmpty: React.FC<{
  onAddTransaction?: () => void;
  className?: string;
}> = ({ onAddTransaction, className }) => (
  <EmptyState
    icon={<DollarSign className="w-12 h-12 text-muted-foreground" />}
    title="No Transactions Found"
    description="Start tracking your financial activities by recording transactions."
    action={onAddTransaction ? {
      label: "Add Transaction",
      onClick: onAddTransaction,
    } : undefined}
    className={className}
    type="empty-collection"
  />
);

export const NoLessonBooksEmpty: React.FC<{
  onAddLessonBook?: () => void;
  className?: string;
}> = ({ onAddLessonBook, className }) => (
  <EmptyState
    icon={<FileText className="w-12 h-12 text-muted-foreground" />}
    title="No Lesson Books Found"
    description="Build your educational library by adding lesson books and learning materials."
    action={onAddLessonBook ? {
      label: "Add Lesson Book",
      onClick: onAddLessonBook,
    } : undefined}
    className={className}
    type="empty-collection"
  />
);

export const NoScheduleEmpty: React.FC<{
  onAddSchedule?: () => void;
  className?: string;
}> = ({ onAddSchedule, className }) => (
  <EmptyState
    icon={<Calendar className="w-12 h-12 text-muted-foreground" />}
    title="No Schedule Items"
    description="Create your first class schedule to organize your educational activities."
    action={onAddSchedule ? {
      label: "Add Schedule",
      onClick: onAddSchedule,
    } : undefined}
    className={className}
    type="empty-collection"
  />
);

export const SearchResultsEmpty: React.FC<{
  searchTerm?: string;
  onClearSearch?: () => void;
  onCreateNew?: () => void;
  createLabel?: string;
  className?: string;
}> = ({ searchTerm, onClearSearch, onCreateNew, createLabel = "Create New", className }) => (
  <EmptyState
    title="No Results Found"
    description={
      searchTerm 
        ? `No results found for "${searchTerm}". Try adjusting your search terms.`
        : "No results match your current filters. Try adjusting your criteria."
    }
    action={onClearSearch ? {
      label: "Clear Search",
      onClick: onClearSearch,
      variant: "outline" as const,
    } : undefined}
    secondaryAction={onCreateNew ? {
      label: createLabel,
      onClick: onCreateNew,
    } : undefined}
    className={className}
    type="no-results"
  />
);

export const AccessDeniedEmpty: React.FC<{
  onGoBack?: () => void;
  onContactSupport?: () => void;
  className?: string;
}> = ({ onGoBack, onContactSupport, className }) => (
  <EmptyState
    title="Access Denied"
    description="You don't have permission to view this content. Contact your administrator if you believe this is an error."
    action={onGoBack ? {
      label: "Go Back",
      onClick: onGoBack,
    } : undefined}
    secondaryAction={onContactSupport ? {
      label: "Contact Support",
      onClick: onContactSupport,
      variant: "outline" as const,
    } : undefined}
    className={className}
    type="no-access"
  />
);

export const FilteredEmpty: React.FC<{
  onClearFilters?: () => void;
  onAddNew?: () => void;
  addNewLabel?: string;
  className?: string;
}> = ({ onClearFilters, onAddNew, addNewLabel = "Add New", className }) => (
  <EmptyState
    title="No Items Match Your Filters"
    description="Try adjusting your filters to see more results, or add new content."
    action={onClearFilters ? {
      label: "Clear Filters",
      onClick: onClearFilters,
      variant: "outline" as const,
    } : undefined}
    secondaryAction={onAddNew ? {
      label: addNewLabel,
      onClick: onAddNew,
    } : undefined}
    className={className}
    type="filtered-empty"
  />
);

export const ErrorState: React.FC<{
  title?: string;
  description?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  className?: string;
}> = ({ 
  title = "Something went wrong",
  description = "An error occurred while loading this content. Please try again.",
  onRetry,
  onGoHome,
  className 
}) => (
  <EmptyState
    title={title}
    description={description}
    action={onRetry ? {
      label: "Try Again",
      onClick: onRetry,
    } : undefined}
    secondaryAction={onGoHome ? {
      label: "Go Home",
      onClick: onGoHome,
      variant: "outline" as const,
    } : undefined}
    className={className}
    type="error"
  />
);

export default EmptyState;
