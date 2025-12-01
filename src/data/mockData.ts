import type { User, Message, Conversation } from "../types/chat";

// Current user (you)
export const currentUser: User = {
  id: "current-user",
  name: "John Doe",
  email: "john.doe@company.com",
  avatar: undefined,
  isOnline: true,
};

// Mock employees
export const employees: User[] = [
  {
    id: "user-1",
    name: "Alice Johnson",
    avatar: undefined,
    isOnline: true,
  },
  {
    id: "user-2",
    name: "Bob Smith",
    avatar: undefined,
    isOnline: false,
  },
  {
    id: "user-3",
    name: "Charlie Brown",
    avatar: undefined,
    isOnline: true,
  },
  {
    id: "user-4",
    name: "Diana Prince",
    avatar: undefined,
    isOnline: true,
  },
  {
    id: "user-5",
    name: "Eve Wilson",
    avatar: undefined,
    isOnline: false,
  },
  {
    id: "user-6",
    name: "Frank Miller",
    avatar: undefined,
    isOnline: true,
  },
];

// Generate initial messages for conversations
const generateMessages = (userId: string): Message[] => {
  const now = new Date();
  const messages: Message[] = [];

  // Generate some historical messages
  for (let i = 5; i >= 0; i--) {
    const timestamp = new Date(
      now.getTime() - i * 60000 * (Math.random() * 60 + 10)
    );
    const isFromCurrentUser = Math.random() > 0.5;

    messages.push({
      id: `msg-${userId}-${i}`,
      senderId: isFromCurrentUser ? currentUser.id : userId,
      receiverId: isFromCurrentUser ? userId : currentUser.id,
      content: isFromCurrentUser
        ? `Hello! This is a message from me. Message ${i + 1}`
        : `Hi there! This is a message from ${
            employees.find((e) => e.id === userId)?.name || "User"
          }. Message ${i + 1}`,
      timestamp,
      isRead: Math.random() > 0.3,
    });
  }

  return messages;
};

// Create conversations with initial messages
export const initialConversations: Conversation[] = employees.map(
  (employee) => {
    const messages = generateMessages(employee.id);
    return {
      id: `conv-${employee.id}`,
      participant: employee,
      lastMessage: messages[messages.length - 1],
      unreadCount: Math.floor(Math.random() * 5),
    };
  }
);

// Store messages by conversation ID
export const messagesByConversation: Record<string, Message[]> = {};
employees.forEach((employee) => {
  messagesByConversation[`conv-${employee.id}`] = generateMessages(employee.id);
});
