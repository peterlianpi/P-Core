/**
 * Books Management Page
 * Complete library book management interface with CRUD operations
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Library,
  Calendar,
  MapPin,
  Tag,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useBooks,
  useCreateBook,
  useUpdateBook,
  useDeleteBook,
  useBookStats,
  useLowStockBooks,
  type Book,
  type CreateBookRequest,
  type UpdateBookRequest
} from '@/features/library-management';

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [availableFilter, setAvailableFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [createForm, setCreateForm] = useState<CreateBookRequest>({
    isbn: '',
    title: '',
    author: '',
    description: '',
    publisher: '',
    publicationYear: new Date().getFullYear(),
    genre: '',
    language: 'English',
    pages: 0,
    totalCopies: 1,
    location: '',
    shelf: '',
    tags: []
  });

  // API hooks
  const { data: books = [], isLoading: booksLoading } = useBooks({
    search: searchTerm || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    genre: genreFilter !== 'all' ? genreFilter : undefined,
    available: availableFilter === 'available' ? true : availableFilter === 'unavailable' ? false : undefined,
  });

  const { data: stats } = useBookStats();
  const { data: lowStockBooks = [] } = useLowStockBooks(1);
  const createBook = useCreateBook();
  const updateBook = useUpdateBook();
  const deleteBook = useDeleteBook();

  // Filter books based on current filters
  const filteredBooks = books.filter(book => {
    const matchesSearch = !searchTerm ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
    const matchesGenre = genreFilter === 'all' || book.genre === genreFilter;
    const matchesAvailable = availableFilter === 'all' ||
      (availableFilter === 'available' && book.availableCopies > 0) ||
      (availableFilter === 'unavailable' && book.availableCopies === 0);

    return matchesSearch && matchesStatus && matchesGenre && matchesAvailable;
  });

  const handleCreateBook = async () => {
    try {
      await createBook.mutateAsync(createForm);
      setCreateForm({
        isbn: '',
        title: '',
        author: '',
        description: '',
        publisher: '',
        publicationYear: new Date().getFullYear(),
        genre: '',
        language: 'English',
        pages: 0,
        totalCopies: 1,
        location: '',
        shelf: '',
        tags: []
      });
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Failed to create book:', error);
    }
  };

  const handleUpdateBook = async (data: UpdateBookRequest) => {
    if (!editingBook) return;

    try {
      await updateBook.mutateAsync({ id: editingBook.id, data });
      setEditingBook(null);
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'default';
      case 'CHECKED_OUT': return 'secondary';
      case 'RESERVED': return 'outline';
      case 'LOST': return 'destructive';
      case 'DAMAGED': return 'destructive';
      case 'ARCHIVED': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'CHECKED_OUT': return <Clock className="h-3 w-3 text-blue-500" />;
      case 'RESERVED': return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
      case 'LOST': return <AlertTriangle className="h-3 w-3 text-red-500" />;
      case 'DAMAGED': return <AlertTriangle className="h-3 w-3 text-orange-500" />;
      default: return <BookOpen className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Library className="h-8 w-8 text-blue-600" />
                Book Management
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage library book catalog, inventory, and availability
              </p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Book
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Book</DialogTitle>
                  <DialogDescription>
                    Enter the book information to add it to the library catalog.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      value={createForm.isbn}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, isbn: e.target.value }))}
                      placeholder="978-0-123456-78-9"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={createForm.title}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={createForm.author}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, author: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input
                      id="publisher"
                      value={createForm.publisher}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, publisher: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publicationYear">Publication Year</Label>
                    <Input
                      id="publicationYear"
                      type="number"
                      value={createForm.publicationYear}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, publicationYear: parseInt(e.target.value) || new Date().getFullYear() }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Input
                      id="genre"
                      value={createForm.genre}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, genre: e.target.value }))}
                      placeholder="Fiction, Science, History..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={createForm.language} onValueChange={(value) =>
                      setCreateForm(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pages">Pages</Label>
                    <Input
                      id="pages"
                      type="number"
                      value={createForm.pages}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, pages: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalCopies">Total Copies *</Label>
                    <Input
                      id="totalCopies"
                      type="number"
                      value={createForm.totalCopies}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, totalCopies: parseInt(e.target.value) || 1 }))}
                      min="1"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={createForm.location}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Main Library, Science Section..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shelf">Shelf</Label>
                    <Input
                      id="shelf"
                      value={createForm.shelf}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, shelf: e.target.value }))}
                      placeholder="A-001, CS-101..."
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={createForm.description}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the book..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateBook} disabled={createBook.isPending}>
                    {createBook.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Add Book
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.totalCopies || 0} total copies
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats?.available || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.availableCopies || 0} copies available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checked Out</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats?.checkedOut || 0}</div>
              <p className="text-xs text-muted-foreground">
                Currently borrowed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{lowStockBooks.length}</div>
              <p className="text-xs text-muted-foreground">
                Books with ≤1 copy
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        {lowStockBooks.length > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-5 w-5" />
                Low Stock Alert
              </CardTitle>
              <CardDescription className="text-orange-700">
                These books have limited availability and may need restocking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lowStockBooks.slice(0, 6).map((book) => (
                  <div key={book.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{book.title}</p>
                      <p className="text-xs text-muted-foreground">by {book.author}</p>
                      <p className="text-xs text-orange-600 font-medium">
                        {book.availableCopies} of {book.totalCopies} available
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters & Search</CardTitle>
            <CardDescription>Filter and search library books by various criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search books by title, author, ISBN, or genre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="AVAILABLE">Available</SelectItem>
                    <SelectItem value="CHECKED_OUT">Checked Out</SelectItem>
                    <SelectItem value="RESERVED">Reserved</SelectItem>
                    <SelectItem value="LOST">Lost</SelectItem>
                    <SelectItem value="DAMAGED">Damaged</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger className="w-full sm:w-[130px]">
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="Fiction">Fiction</SelectItem>
                    <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Literature">Literature</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={availableFilter} onValueChange={setAvailableFilter}>
                  <SelectTrigger className="w-full sm:w-[130px]">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Books</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Books Table */}
        <Card>
          <CardHeader>
            <CardTitle>Books ({filteredBooks.length})</CardTitle>
            <CardDescription>
              Complete library book catalog with availability and location information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {booksLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading books...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Genre</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBooks.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-gray-500" />
                            </div>
                            <div>
                              <div className="font-medium max-w-[200px] truncate">
                                {book.title}
                              </div>
                              {book.isbn && (
                                <div className="text-sm text-muted-foreground">
                                  ISBN: {book.isbn}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{book.author}</div>
                          {book.publicationYear && (
                            <div className="text-sm text-muted-foreground">
                              {book.publicationYear}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{book.genre || 'Uncategorized'}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(book.status)}
                            <div>
                              <Badge variant={getStatusBadgeVariant(book.status)}>
                                {book.status.replace('_', ' ')}
                              </Badge>
                              <div className="text-sm text-muted-foreground mt-1">
                                {book.availableCopies} of {book.totalCopies} available
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {book.location && (
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="h-3 w-3" />
                                {book.location}
                              </div>
                            )}
                            {book.shelf && (
                              <div className="flex items-center gap-1 text-sm">
                                <Tag className="h-3 w-3" />
                                Shelf: {book.shelf}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setEditingBook(book)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Book
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteBook(book.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Book
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {filteredBooks.length === 0 && !booksLoading && (
              <div className="text-center py-8">
                <Library className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  No books found
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== 'all' || genreFilter !== 'all' || availableFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by adding your first book to the library.'}
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Book
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Book Dialog */}
      {editingBook && (
        <Dialog open={!!editingBook} onOpenChange={() => setEditingBook(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Book</DialogTitle>
              <DialogDescription>
                Update the book information.
              </DialogDescription>
            </DialogHeader>
            {/* Edit form would go here - simplified for brevity */}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingBook(null)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdateBook({ status: 'AVAILABLE' })}>
                Update Book
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
