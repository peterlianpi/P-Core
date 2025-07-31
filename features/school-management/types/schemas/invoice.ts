import z from "zod";

// Invoice
export const invoiceSchema = z.object({
  id: z.string().cuid().optional(),
  number: z.string(),
  studentId: z.string(),
  orgId: z.string(),
});
export type InvoiceForm = z.infer<typeof invoiceSchema>;
