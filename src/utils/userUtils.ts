/**
 * Utility functions for user-related operations
 */

/**
 * Get initials from a user's name
 * @param name - The user's full name
 * @returns The first letter of each word, uppercase, max 2 characters
 */
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

