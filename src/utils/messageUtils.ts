import type { User, Message } from "../types/chat";
import { currentUser, employees } from "../data/mockData";

/**
 * Utility functions for message-related operations
 */

/**
 * Find the sender user for a message
 * @param message - The message to find the sender for
 * @param sender - Optional pre-provided sender user
 * @returns The sender user object
 */
export const getMessageSender = (message: Message, sender?: User): User | undefined => {
  const isFromCurrentUser = message.senderId === currentUser.id;
  
  if (sender) {
    return sender;
  }
  
  if (isFromCurrentUser) {
    return currentUser;
  }
  
  return employees.find((e) => e.id === message.senderId);
};

