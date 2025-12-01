/**
 * Utility functions for text manipulation
 */

/**
 * Truncate a message to a maximum length
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation (default: 40)
 * @returns Truncated text with "..." appended if needed
 */
export const truncateMessage = (text: string, maxLength: number = 40): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

