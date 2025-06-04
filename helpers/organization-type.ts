type Updated = {
  name: string;
};

type OrganizationResult = { success: Updated } | { error: string };

// ✅ Type guard to narrow the result type
export function isError(
  result: OrganizationResult
): result is { error: string } {
  return "error" in result;
}
