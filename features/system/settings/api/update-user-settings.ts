// features/system/settings/api/update-user-settings.ts
// Utility for updating user settings securely via API
// Uses fetch for demonstration; replace with your preferred HTTP client if needed

import { UserSettingsFormData } from "../components/settings-profile-form";

/**
 * Sends a PATCH request to update user settings.
 * Only validated data should be passed in.
 * @param data - User settings form data
 * @returns Promise resolving to the API response
 */
export async function updateUserSettings(data: Partial<UserSettingsFormData>) {
  // Adjust the endpoint as needed for your backend
  const response = await fetch("/api/user/settings", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // Optionally, parse error details from the response
    throw new Error("Failed to update user settings");
  }

  return response.json();
}
