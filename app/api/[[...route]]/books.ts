// // Enhanced Books API Routes
// // Library management with loan tracking and inventory control
// // Integrates with RLS-based security for automatic tenant isolation

// import { Hono } from "hono";
// import { zValidator } from "@hono/zod-validator";
// import { z } from "zod";
// import { Prisma, prisma } from "@/lib/db/client";
// import { 
//   organizationSecurityMiddleware, 
//   getOrganizationContext,
//   requirePermission 
// } from "@/lib/security/tenant";

// // Book schemas
// const BookSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   author: z.string().optional().nullable(),
//   isbn: z.string().optional().nullable(),
//   publisher: z.string().optional().nullable(),
//   publishYear: z.number().int().optional().nullable(),
//   category: z.string().optional().nullable(),
//   description: z.string().optional().nullable(),
//   copies: z.number().int().min(1, "Must have at least 1 copy").default(1),
//   available: z.number().int().min(0).optional(),
//   price: z.number().optional().nullable(),
//   libraryId: z.string(),
// });

// const BookLoanSchema = z.object({
//   bookId: z.string(),
//   studentId: z.string(),
//   dueDate: z.string(),
//   notes: z.string().optional().nullable(),
// });

// const books = new Hono()
//   // Apply organization security middleware to all routes
//   .use("*", organizationSecurityMiddleware)

//   // GET /api/books - Get all books with filtering
//   .get(
//     "/",
//     zValidator(
//       "query",
//       z.object({
//         take: z.string().optional(),
//         skip: z.string().optional(),
//         searchQuery: z.string().optional(),
//         category: z.string().optional(),
//         author: z.string().optional(),
//         libraryId: z.string().optional(),
//         isActive: z.string().optional(),
//         availableOnly: z.string().optional(),
//         includeLoans: z.string().optional(),
//         sortBy: z.enum(["title", "author", "category", "publishYear", "available"]).optional(),
//         sortOrder: z.enum(["asc", "desc"]).optional(),
//       })
//     ),
//     requirePermission("read:library"),
//     async (c) => {
//       try {
//         const { 
//           take = "20", 
//           skip = "0", 
//           searchQuery, 
//           category,
//           author,
//           libraryId,
//           isActive = "true",
//           availableOnly = "false",
//           includeLoans = "false",
//           sortBy = "title",
//           sortOrder = "asc"
//         } = c.req.valid("query");

//         const takeNumber = parseInt(take);
//         const skipNumber = parseInt(skip);
//         const activeFilter = isActive === "true";
//         const availableFilter = availableOnly === "true";

//         // Build where clause
//         const where: any = {
//           isActive: activeFilter,
//         };

//         if (libraryId) where.libraryId = libraryId;
//         if (category) where.category = { contains: category, mode: "insensitive" };
//         if (author) where.author = { contains: author, mode: "insensitive" };
//         if (availableFilter) where.available = { gt: 0 };

//         if (searchQuery) {
//           where.OR = [
//             { title: { contains: searchQuery, mode: "insensitive" } },
//             { author: { contains: searchQuery, mode: "insensitive" } },
//             { isbn: { contains: searchQuery, mode: "insensitive" } },
//             { description: { contains: searchQuery, mode: "insensitive" } },
//           ];
//         }

//         // Build include clause
//         const include: any = {
//           library: {
//             select: { id: true, name: true }
//           }
//         };

//         if (includeLoans === "true") {
//           include.loans = {
//             where: { status: "ACTIVE" },
//             include: {
//               student: {
//                 select: { id: true, name: true, phone: true, email: true }
//               }
//             },
//             orderBy: { dueDate: "asc" }
//           };
//         }

//         // Build order by clause
//         const orderBy: any = {};
//         if (sortBy === "available") {
//           orderBy.available = sortOrder;
//         } else if (sortBy === "publishYear") {
//           orderBy.publishYear = sortOrder;
//         } else {
//           orderBy[sortBy] = sortOrder;
//         }

//         const [books, totalCount, activeCount, inactiveCount, availableCount, loanedCount] = await Promise.all([
//           prisma.book.findMany({
//             where,
//             take: takeNumber,
//             skip: skipNumber,
//             orderBy,
//             include
//           }),
//           prisma.book.count({ where }),
//           prisma.book.count({ where: { isActive: true } }),
//           prisma.book.count({ where: { isActive: false } }),
//           prisma.book.count({ where: { isActive: true, available: { gt: 0 } } }),
//           prisma.book.count({ where: { isActive: true, available: { lt: prisma.book.fields.total } } })
//         ]);

//         // Get category and author statistics
//         const [categoryStats, authorStats] = await Promise.all([
//           prisma.book.groupBy({
//             by: ['category'],
//             _count: true,
//             where: { isActive: true, category: { not: null } }
//           }),
//           prisma.book.groupBy({
//             by: ['author'],
//             _count: true,
//             where: { isActive: true, author: { not: null } }
//           })
//         ]);

//         // Get overdue books count
//         const overdueCount = await prisma.bookLoan.count({
//           where: {
//             status: "ACTIVE",
//             dueDate: { lt: new Date() }
//           }
//         });

//         // Get inventory statistics
//         const inventoryStats = await prisma.book.aggregate({
//           where: { isActive: true },
//           _sum: {
//             copies: true,
//             available: true
//           }
//         });

//         // Get popular books (most loaned)
//         const popularBooks = await prisma.book.findMany({
//           where: { isActive: true },
//           include: {
//             loans: {
//               where: { status: "RETURNED" }
//             }
//           },
//           take: 5
//         });

//         // Get recently added books
//         const recentlyAdded = await prisma.book.findMany({
//           where: { isActive: true },
//           orderBy: { createdAt: "desc" },
//           take: 5,
//           select: {
//             id: true,
//             title: true,
//             author: true,
//             createdAt: true
//           }
//         });

//         return c.json({
//           data: books,
//           totalItems: totalCount,
//           active: activeCount,
//           inactive: inactiveCount,
//           available: availableCount,
//           loaned: loanedCount,
//           overdue: overdueCount,
//           categoryStats: categoryStats.reduce((acc: any, stat: any) => {
//             if (stat.category) {
//               acc[stat.category] = stat._count;
//             }
//             return acc;
//           }, {} as Record<string, number>),
//           authorStats: authorStats.reduce((acc: any, stat: any) => {
//             if (stat.author) {
//               acc[stat.author] = stat._count;
//             }
//             return acc;
//           }, {} as Record<string, number>),
//           inventoryStats: {
//             totalCopies: inventoryStats?._sum?.total || 0,
//             availableCopies: inventoryStats?._sum?.available || 0,
//             loanedCopies: (inventoryStats?._sum?.total || 0) - (inventoryStats?._sum?.available || 0),
//             overdueCopies: overdueCount,
//             lostCopies: 0 // Would need separate tracking
//           },
//           popularBooks: popularBooks.map(book => ({
//             ...book,
//             loanCount: book.loans.length
//           })),
//           recentlyAdded
//         });

//       } catch (error) {
//         console.error("Get books error:", error);
//         return c.json({ error: "Failed to fetch books" }, 500);
//       }
//     }
//   )

//   // POST /api/books - Create new book
//   .post(
//     "/",
//     zValidator("json", BookSchema),
//     requirePermission("write:library"),
//     async (c) => {
//       try {
//         const orgContext = getOrganizationContext(c);
//         const bookData = c.req.valid("json");

//         // Check for existing ISBN
//         if (bookData.isbn) {
//           const existingBook = await prisma.book.findFirst({
//             where: { 
//               isbn: bookData.isbn,
//               isActive: true 
//             }
//           });

//           if (existingBook) {
//             return c.json({ error: "Book with this ISBN already exists", code: "ISBN_ALREADY_EXISTS" }, 409);
//           }
//         }

//         // Validate library exists
//         const library = await prisma.library.findUnique({
//           where: { id: bookData.libraryId }
//         });

//         if (!library) {
//           return c.json({ error: "Library not found", code: "LIBRARY_NOT_FOUND" }, 400);
//         }

//         const book = await prisma.book.create({
//           data: {
//             ...bookData,
//             available: bookData.available || bookData.copies,
//             price: bookData.price ? new Prisma.Decimal(bookData.price) : null,
//             orgId: orgContext.organizationId,
//           },
//           include: {
//             library: {
//               select: { id: true, name: true }
//             }
//           }
//         });

//         return c.json(book, 201);

//       } catch (error) {
//         console.error("Create book error:", error);
//         return c.json({ error: "Failed to create book" }, 500);
//       }
//     }
//   )

//   // GET /api/books/:id - Get specific book
//   .get(
//     "/:id",
//     zValidator("param", z.object({ id: z.string() })),
//     requirePermission("read:library"),
//     async (c) => {
//       try {
//         const { id } = c.req.valid("param");

//         const book = await prisma.book.findUnique({
//           where: { id },
//           include: {
//             library: {
//               select: { id: true, name: true, location: true }
//             },
//             loans: {
//               where: { status: "ACTIVE" },
//               include: {
//                 student: {
//                   select: { 
//                     id: true, 
//                     name: true, 
//                     phone: true, 
//                     email: true,
//                     rollNumber: true
//                   }
//                 }
//               },
//               orderBy: { dueDate: "asc" }
//             }
//           }
//         });

//         if (!book) {
//           return c.json({ error: "Book not found", code: "BOOK_NOT_FOUND" }, 404);
//         }

//         // Get loan history (last 10 loans)
//         const loanHistory = await prisma.bookLoan.findMany({
//           where: { 
//             bookId: id,
//             status: "RETURNED"
//           },
//           include: {
//             student: {
//               select: { id: true, name: true }
//             }
//           },
//           orderBy: { returnDate: "desc" },
//           take: 10
//         });

//         return c.json({
//           ...book,
//           loanHistory
//         });

//       } catch (error) {
//         console.error("Get book error:", error);
//         return c.json({ error: "Failed to fetch book" }, 500);
//       }
//     }
//   )

//   // PATCH /api/books/:id - Update book
//   .patch(
//     "/:id",
//     zValidator("param", z.object({ id: z.string() })),
//     zValidator("json", BookSchema.partial()),
//     requirePermission("write:library"),
//     async (c) => {
//       try {
//         const { id } = c.req.valid("param");
//         const updateData = c.req.valid("json");

//         const book = await prisma.book.findUnique({
//           where: { id }
//         });

//         if (!book) {
//           return c.json({ error: "Book not found", code: "BOOK_NOT_FOUND" }, 404);
//         }

//         // Check ISBN uniqueness if being updated
//         if (updateData.isbn && updateData.isbn !== book.isbn) {
//           const existingISBN = await prisma.book.findFirst({
//             where: { 
//               isbn: updateData.isbn, 
//               id: { not: id },
//               isActive: true 
//             }
//           });
//           if (existingISBN) {
//             return c.json({ error: "ISBN already exists", code: "ISBN_ALREADY_EXISTS" }, 409);
//           }
//         }

//         const updatedBook = await prisma.book.update({
//           where: { id },
//           data: {
//             ...updateData,
//             price: updateData.price ? new Prisma.Decimal(updateData.price) : undefined,
//           },
//           include: {
//             library: {
//               select: { id: true, name: true }
//             }
//           }
//         });

//         return c.json(updatedBook);

//       } catch (error) {
//         console.error("Update book error:", error);
//         return c.json({ error: "Failed to update book" }, 500);
//       }
//     }
//   )

//   // DELETE /api/books/:id - Delete book
//   .delete(
//     "/:id",
//     zValidator("param", z.object({ id: z.string() })),
//     requirePermission("delete:library"),
//     async (c) => {
//       try {
//         const { id } = c.req.valid("param");

//         const book = await prisma.book.findUnique({
//           where: { id },
//           include: {
//             loans: {
//               where: { status: "ACTIVE" }
//             }
//           }
//         });

//         if (!book) {
//           return c.json({ error: "Book not found", code: "BOOK_NOT_FOUND" }, 404);
//         }

//         // Check if book has active loans
//         if (book.loans && book.loans.length > 0) {
//           return c.json({ 
//             error: "Cannot delete book with active loans", 
//             code: "HAS_ACTIVE_LOANS" 
//           }, 400);
//         }

//         // Soft delete
//         await prisma.book.update({
//           where: { id },
//           data: { isActive: false }
//         });

//         return c.json({ message: "Book deleted successfully" });

//       } catch (error) {
//         console.error("Delete book error:", error);
//         return c.json({ error: "Failed to delete book" }, 500);
//       }
//     }
//   )

//   // POST /api/books/:id/loans - Create book loan
//   .post(
//     "/:id/loans",
//     zValidator("param", z.object({ id: z.string() })),
//     zValidator("json", BookLoanSchema.omit({ bookId: true })),
//     requirePermission("write:library"),
//     async (c) => {
//       try {
//         const { id: bookId } = c.req.valid("param");
//         const { studentId, dueDate, notes } = c.req.valid("json");
//         const orgContext = getOrganizationContext(c);

//         // Check book availability
//         const book = await prisma.book.findUnique({
//           where: { id: bookId }
//         });

//         if (!book) {
//           return c.json({ error: "Book not found", code: "BOOK_NOT_FOUND" }, 404);
//         }

//         if (!book.isActive) {
//           return c.json({ error: "Book is not active", code: "BOOK_NOT_ACTIVE" }, 400);
//         }

//         if (book.available <= 0) {
//           return c.json({ error: "Book not available for loan", code: "BOOK_NOT_AVAILABLE" }, 400);
//         }

//         // Check if student already has this book on loan
//         const existingLoan = await prisma.bookLoan.findFirst({
//           where: {
//             bookId,
//             studentId,
//             status: "ACTIVE"
//           }
//         });

//         if (existingLoan) {
//           return c.json({ 
//             error: "Student already has this book on loan", 
//             code: "ALREADY_ON_LOAN" 
//           }, 409);
//         }

//         // Create loan and update book availability
//         const [loan] = await prisma.$transaction([
//           prisma.bookLoan.create({
//             data: {
//               bookId,
//               memberId:studentId,
//               dueDate: new Date(dueDate),
//               notes,
//               orgId: orgContext.organizationId,
//             },
//             include: {
//               book: {
//                 select: { id: true, title: true, author: true }
//               },
//               student: {
//                 select: { id: true, name: true, phone: true, email: true }
//               }
//             }
//           }),
//           prisma.book.update({
//             where: { id: bookId },
//             data: { available: { decrement: 1 } }
//           })
//         ]);

//         return c.json(loan, 201);

//       } catch (error) {
//         console.error("Create loan error:", error);
//         return c.json({ error: "Failed to create loan" }, 500);
//       }
//     }
//   )

//   // PATCH /api/books/loans/:loanId/return - Return book
//   .patch(
//     "/loans/:loanId/return",
//     zValidator("param", z.object({ loanId: z.string() })),
//     zValidator("json", z.object({
//       notes: z.string().optional().nullable(),
//       condition: z.enum(["GOOD", "DAMAGED", "LOST"]).optional()
//     })),
//     requirePermission("write:library"),
//     async (c) => {
//       try {
//         const { loanId } = c.req.valid("param");
//         const { notes, condition = "GOOD" } = c.req.valid("json");

//         const loan = await prisma.bookLoan.findUnique({
//           where: { id: loanId },
//           include: {
//             book: true
//           }
//         });

//         if (!loan) {
//           return c.json({ error: "Loan not found", code: "LOAN_NOT_FOUND" }, 404);
//         }

//         if (loan.status !== "ACTIVE") {
//           return c.json({ error: "Loan is not active", code: "LOAN_NOT_ACTIVE" }, 400);
//         }

//         // Update loan status and return book to inventory
//         const [updatedLoan] = await prisma.$transaction([
//           prisma.bookLoan.update({
//             where: { id: loanId },
//             data: {
//               status: condition === "LOST" ? "LOST" : "RETURNED",
//               returnDate: new Date(),
//               notes: notes || loan.notes
//             },
//             include: {
//               book: {
//                 select: { id: true, title: true, author: true }
//               },
//               student: {
//                 select: { id: true, name: true }
//               }
//             }
//           }),
//           // Only increment available count if book is returned in good condition
//           ...(condition !== "LOST" ? [
//             prisma.book.update({
//               where: { id: loan.bookId },
//               data: { available: { increment: 1 } }
//             })
//           ] : [])
//         ]);

//         return c.json(updatedLoan);

//       } catch (error) {
//         console.error("Return book error:", error);
//         return c.json({ error: "Failed to return book" }, 500);
//       }
//     }
//   )

//   // GET /api/books/loans/overdue - Get overdue loans
//   .get(
//     "/loans/overdue",
//     requirePermission("read:library"),
//     async (c) => {
//       try {
//         const overdueLoans = await prisma.bookLoan.findMany({
//           where: {
//             status: "ACTIVE",
//             dueDate: { lt: new Date() }
//           },
//           include: {
//             book: {
//               select: { id: true, title: true, author: true }
//             },
//             student: {
//               select: { 
//                 id: true, 
//                 name: true, 
//                 phone: true, 
//                 email: true,
//                 rollNumber: true
//               }
//             }
//           },
//           orderBy: { dueDate: "asc" }
//         });

//         return c.json({
//           data: overdueLoans,
//           totalOverdue: overdueLoans.length
//         });

//       } catch (error) {
//         console.error("Get overdue loans error:", error);
//         return c.json({ error: "Failed to fetch overdue loans" }, 500);
//       }
//     }
//   );

// export default books;
