import z from "zod";

// Purchase
export const purchaseSchema = z.object({
  id: z.string().cuid().optional(),
  studentId: z.string(),
  courseId: z.string().optional(),
  type: z.enum(["MONTHLY_FEE", "LESSON_BOOK", "OTHER"]).default("MONTHLY_FEE"),
  amount: z.number(),
  description: z.string().optional(),
  paidAt: z.union([z.string().datetime(), z.date()]).optional(), // This makes the field optional (it can be undefined)

  forMonth: z.date().optional(),
  method: z.enum(["CASH", "BANK", "ONLINE", "TRANSFER"]).default("CASH"),
  invoiceId: z.string().optional(),
  orgId: z.string(),
});
export type PurchaseForm = z.infer<typeof purchaseSchema>;
