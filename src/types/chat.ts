export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead?: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage?: Message;
  unreadCount?: number;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: string[];
  createdAt: Date;
  createdBy: string;
}
