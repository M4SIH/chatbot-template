/**
 * Utility functions for date and time formatting
 */

/**
 * Format a date to display time (HH:MM format)
 * @param date - The date to format
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

/**
 * Format the last message time relative to now
 * @param timestamp - The timestamp to format (optional)
 * @returns Formatted relative time string (e.g., "5m ago", "2h ago", "3d ago")
 */
export const formatLastMessageTime = (timestamp?: Date): string => {
  if (!timestamp) return "";
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(timestamp);
};

